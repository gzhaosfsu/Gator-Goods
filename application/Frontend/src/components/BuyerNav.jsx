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

export default function BuyerNav() {
    const { deliveryId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [deliveryData, setDeliveryData] = useState(null);
    const [courierLocation, setCourierLocation] = useState(null);
    const [status, setStatus] = useState("pending");
    const [unauthorized, setUnauthorized] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4",
    });

    // Redirect if not logged in
    // useEffect(() => {
    //     if (!user) navigate("/login");
    // }, [user, navigate]);

    // Fetch delivery details
    useEffect(() => {
        if (!user || !deliveryId) return;
        (async () => {
            try {
                const res = await fetch(
                    `/api/delivery_instruction/${deliveryId}`
                );
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                if (data.buyer_id !== user.user_id) {
                    setUnauthorized(true);
                } else {
                    setDeliveryData(data);
                    setStatus(data.delivery_status.toLowerCase());
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [deliveryId, user]);

    // Listen for courier updates
    useEffect(() => {
        socket.on("courier-location", (d) => {
            if (deliveryData && d.courierId === deliveryData.courier_id) {
                setCourierLocation({ lat: d.lat, lng: d.lng });
                if (status === "assigned") setStatus("picked up");
            }
        });
        socket.on("delivery-status", (d) => {
            if (deliveryData && d.courierId === deliveryData.courier_id) {
                setStatus(d.status === "delivered" ? "delivered" : "cancelled");
            }
        });
        return () => {
            socket.off("courier-location");
            socket.off("delivery-status");
        };
    }, [deliveryData, status]);

    if (unauthorized) {
        return <div className="delivery-layout">
            <p>Not authorized to view this order.</p>
            <button onClick={() => navigate("/realUserProfile")}>Back</button>
        </div>;
    }

    return (
        <div className="delivery-layout">
            <div className="map-panel">
                {isLoaded ? (
                    <GoogleMap
                        center={courierLocation || SFSU_COORDS}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                        {courierLocation && <Marker position={courierLocation} />}
                    </GoogleMap>
                ) : (
                    <div className="map-placeholder">Loading map...</div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Logo" />
                </div>
                <ReturnHome onClick={() => navigate("/realUserProfile")} />

                {deliveryData && (
                    <>
                        <p><strong>Product:</strong> {deliveryData.product_name}</p>
                        <p><strong>Status:</strong> {status.toUpperCase()}</p>
                        <div className="chat-box">
                            <label>Message Courier</label>
                            <div className="chat-row">
                                <input placeholder="Message..." />
                                <button>Send</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
