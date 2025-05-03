import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UserContext } from "../UserContext";
import mascot from "./images/LogoGG.png";
import "../DeliveryLayout.css";
import ReturnHome from "./ReturnHome";
import DummyDelivery from "../DummyDelivery";

const socket = io("http://100.26.194.201:3000");
const SFSU_COORDS = { lat: 37.7219, lng: -122.4782 };


const BuyerNav = ({ courierId, deliveryId }) => {
    const { user } = useContext(UserContext);
    const [courierLocation, setCourierLocation] = useState(null);
    const [status, setStatus] = useState("pending");
    const [deliveryData, setDeliveryData] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4"
    });

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const res = await fetch(`http://100.26.194.201:3001/api/deliveryInstructions/${deliveryId}`);
                if (!res.ok) throw new Error("Failed to fetch delivery data");
                const data = await res.json();
                setDeliveryData(data);
                setStatus(data.delivery_status || "pending");

                if (user?.user_id !== data.buyer_id) {
                    setUnauthorized(true);
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (deliveryId && user) fetchDelivery();
    }, [deliveryId, user]);

    useEffect(() => {
        socket.on("courier-location-update", data => {
            if (data.courierId === courierId) {
                setCourierLocation({ lat: data.lat, lng: data.lng });
                setStatus("Picked Up");
            }
        });

        socket.on("delivery-status-update", data => {
            if (data.courierId === courierId) {
                setStatus(data.status === "delivered" ? "Delivered" : "Canceled");
            }
        });

        return () => {
            socket.off("courier-location-update");
            socket.off("delivery-status-update");
        };
    }, [courierId]);

    if (unauthorized) {
        return <div className="delivery-layout">You are not authorized to view this delivery.</div>;
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
                    <div className="map-placeholder">Loading map or location unavailable...</div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Gator Goods" />
                </div>
                <ReturnHome/>

                {deliveryData && (
                    <div className="delivery-details">
                        <div className="product-box">
                            <div className="product-image" style={{ backgroundColor: "#ccc", width: 80, height: 80 }}></div>
                            <div className="product-title">{deliveryData.product_name}</div>
                        </div>

                        <div className="eta">
                            <strong>E.T.A :</strong> [ {status} ]
                        </div>

                        <div className="chat-box">
                            <label>Message the Courier</label>
                            <div className="chat-row" style={{ backgroundColor: "#d5d1e1", borderRadius: 8, padding: 8 }}>
                                <input placeholder="Message..." style={{ flex: 1, padding: 6, borderRadius: 4, border: 'none' }} />
                                <button style={{ backgroundColor: "#2a176f", color: "white", fontWeight: "bold", border: "none", padding: "0 16px", marginLeft: 8, borderRadius: 4 }}>send</button>
                            </div>
                        </div>
                    </div>
                )}

                <button className="return-button" style={{ backgroundColor: "#2a176f", color: "white", fontWeight: "bold", padding: 14, border: "none", borderRadius: 6, fontSize: 16 }}>Return to Orders</button>
            </div>
        </div>
    );
};

export default BuyerNav;
