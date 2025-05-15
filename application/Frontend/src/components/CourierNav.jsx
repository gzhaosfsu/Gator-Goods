// CourierNav.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UserContext } from "../UserContext";
import mascot from "./images/LogoGG.png";
import "../DeliveryLayout.css";
import ReturnHome from "./ReturnHome";

const socket = io("http://100.26.194.201:3000");
const SFSU_COORDS = { lat: 37.7219, lng: -122.4782 };
const DROP_OFF_COORDS = {
    "Cesar Chavez": { lat: 37.7214, lng: -122.4780 },
    "Student Services": { lat: 37.7221, lng: -122.4769 },
    "Library": { lat: 37.7229, lng: -122.4810 },
    "Hensill Hall": { lat: 37.7237, lng: -122.4787 },
    "The Village at Centennial Square": { lat: 37.7212, lng: -122.4753 },
    "Annex 1": { lat: 37.7208, lng: -122.4770 },
};

export default function CourierNav() {
    const { deliveryId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const courierId = user?.user_id;

    const [deliveryData, setDeliveryData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(SFSU_COORDS);
    const [unauthorized, setUnauthorized] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4",
    });

    // Redirect if not logged in
    /*
    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);
    */

    // Fetch the instruction
    useEffect(() => {
        if (!user || !deliveryId) return;
        (async () => {
            try {
                const res = await fetch(
                    `/api/delivery_instruction/${deliveryId}`
                );
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                if (data.courier_id !== courierId) {
                    setUnauthorized(true);
                } else {
                    setDeliveryData(data);
                    setDropoffCoords(DROP_OFF_COORDS[data.dropoff] || SFSU_COORDS);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        })();
    }, [deliveryId, user, courierId]);

    // Track and emit Geo location
    useEffect(() => {
        if (unauthorized || !courierId) return;
        const watchId = navigator.geolocation.watchPosition(
            ({ coords }) => {
                const pos = { lat: coords.latitude, lng: coords.longitude };
                setCurrentLocation(pos);
                socket.emit("courier-location", { courierId, ...pos });
            },
            console.error,
            { enableHighAccuracy: true }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, [courierId, unauthorized]);

    // Status updates
    const updateStatus = async (status) => {
        try {
            const res = await fetch(
                `/api/delivery_instruction/${deliveryId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ delivery_status: status }),
                }
            );
            if (!res.ok) throw new Error(res.statusText);
            socket.emit("delivery-status", { courierId, status: status.toLowerCase() });
            if (status === "Delivered") navigate("/realUserProfile");
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    if (unauthorized) {
        return (
            <div className="delivery-layout">
                <div className="info-panel">
                    <img src={mascot} alt="Logo" />
                    <ReturnHome onClick={() => navigate("/courierPage")} />
                    <p>You are not authorized for this delivery.</p>
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
                        {currentLocation && <Marker position={currentLocation} />}
                    </GoogleMap>
                ) : (
                    <div className="map-placeholder">
                        Loading map...
                    </div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Logo" />
                </div>
                <ReturnHome onClick={() => navigate("/courierPage")} />

                {deliveryData && (
                    <>
                        <p><strong>Dropoff:</strong> {deliveryData.dropoff}</p>
                        <p><strong>ETA:</strong> {deliveryData.timestamp}</p>
                        <div className="courier-button-block">
                            <button onClick={() => updateStatus("Delivered")}>
                                FINISH DROP OFF
                            </button>
                            <button onClick={() => updateStatus("Cancelled")}>
                                UNABLE TO DELIVER
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
