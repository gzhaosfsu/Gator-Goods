import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UserContext } from "../UserContext";
import mascot from "./images/LogoGG.png";
import "../DeliveryLayout.css";
import ReturnHome from "./ReturnHome";

const socket = io("http://100.26.194.201:3000");
const SFSU_COORDS = { lat: 37.7219, lng: -122.4782 };

// Dropoff preset mapping
const DROP_OFF_COORDS = {
    "Cesar Chavez": { lat: 37.7214, lng: -122.4780 },
    "Student Services": { lat: 37.7221, lng: -122.4769 },
    "Library": { lat: 37.7229, lng: -122.4810 },
    "Hensill Hall": { lat: 37.7237, lng: -122.4787 },
    "The Village at Centennial Square": { lat: 37.7212, lng: -122.4753 },
    "Annex 1": { lat: 37.7208, lng: -122.4770 }
};

const CourierNav = ({ courierId, deliveryId }) => {
    const { user } = useContext(UserContext);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [deliveryData, setDeliveryData] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(SFSU_COORDS);
    const [message, setMessage] = useState("");
    const [unauthorized, setUnauthorized] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4"
    });

    useEffect(() => {
        const fetchDeliveryData = async () => {
            try {
                const res = await fetch(`http://100.26.194.201:3001/api/deliveryInstructions/${deliveryId}`);
                if (!res.ok) throw new Error("Failed to fetch delivery instruction");
                const data = await res.json();

                if (user?.user_id !== data.courier_id) {
                    console.warn("Unauthorized: You are not the assigned courier.");
                    setUnauthorized(true);
                } else {
                    setDeliveryData(data);
                    const coords = DROP_OFF_COORDS[data.dropoff] || SFSU_COORDS;
                    setDropoffCoords(coords);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        if (deliveryId && user) fetchDeliveryData();
    }, [deliveryId, user]);

    useEffect(() => {
        if (!unauthorized) {
            const watchId = navigator.geolocation.watchPosition(
                position => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCurrentLocation(coords);
                    socket.emit("courier-location", { courierId, ...coords });
                },
                error => console.error("Location error:", error),
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [courierId, unauthorized]);

    const finishDelivery = async () => {
        try {
            const res = await fetch(`http://100.26.194.201:3001/api/deliveryInstructions/${deliveryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ delivery_status: "Delivered" })
            });
            if (!res.ok) throw new Error("Failed to update delivery status");
            socket.emit("delivery-status", { courierId, status: "delivered" });
        } catch (err) {
            console.error("Delivery update error:", err);
        }
    };

    const cancelDelivery = async () => {
        try {
            const res = await fetch(`http://100.26.194.201:3001/api/deliveryInstructions/${deliveryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ delivery_status: "Cancelled" })
            });
            if (!res.ok) throw new Error("Failed to cancel delivery");
            socket.emit("delivery-status", { courierId, status: "cancelled" });
        } catch (err) {
            console.error("Cancel update error:", err);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            console.log("Sending message:", message);
            setMessage("");
        }
    };

    if (unauthorized) {
        return (
            <div className="delivery-layout">
                <div className="info-panel">
                    <div className="logo-header">
                        <img src={mascot} alt="Gator Goods" />
                    </div>
                    <ReturnHome />
                    <div className="delivery-details">
                        <p>You are not authorized to access this delivery.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="delivery-layout">
            <div className="map-panel">
                {isLoaded ? (
                    <GoogleMap
                        center={dropoffCoords}
                        zoom={17}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                        <Marker position={dropoffCoords} />
                        {currentLocation && (
                            <Marker
                                position={currentLocation}
                                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <div className="map-placeholder">Loading map or location unavailable...</div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Gator Goods" />
                </div>
                <ReturnHome />

                {deliveryData && (
                    <div className="delivery-details">
                        <div style={{ marginBottom: "1.5rem" }}>
                            <p><strong>Address:</strong></p>
                            <p>[ {deliveryData.dropoff} ]</p>
                        </div>

                        <div className="eta">
                            <strong>E.T.A :</strong> [ {deliveryData.timestamp} ]
                        </div>

                        <div className="chat-box">
                            <label>Notify Buyer</label>
                            <div className="chat-row">
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message..."
                                />
                                <button onClick={sendMessage}>send</button>
                            </div>
                        </div>

                        <div className="courier-button-block">
                            <button className="complete" onClick={finishDelivery}>FINISH DROP OFF</button>
                            <button className="cancel" onClick={cancelDelivery}>UNABLE TO DELIVER</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierNav;
