// CourierNav.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UserContext } from "../UserContext";
import mascot from "./images/LogoGG.png";
import "../DeliveryLayout.css";
import ReturnHome from "./ReturnHome";

const SFSU_COORDS = { lat: 37.7219, lng: -122.4782 };
const PICK_UP_COORDS = {
    "SFSU Bookstore":      { lat: 37.7213, lng: -122.4780 },
    "Quickly":             { lat: 37.7211, lng: -122.4767 },
    "Halal Shop":          { lat: 37.7217, lng: -122.4774 },
    "Cafe 101":            { lat: 37.7218, lng: -122.4783 },
    "Nizario's Pizza":     { lat: 37.7208, lng: -122.4766 },
};
const DROP_OFF_COORDS = {
    "Cesar Chavez":                     { lat: 37.7214, lng: -122.4780 },
    "Student Services":                 { lat: 37.7221, lng: -122.4769 },
    "Library":                          { lat: 37.7229, lng: -122.4810 },
    "Hensill Hall":                     { lat: 37.7237, lng: -122.4787 },
    "The Village at Centennial Square": { lat: 37.7212, lng: -122.4753 },
    "Annex 1":                          { lat: 37.7208, lng: -122.4770 },
};

export default function CourierNav() {
    const { deliveryId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const courierId = user?.user_id;
    const [pickupCoords, setPickupCoords]   = useState(SFSU_COORDS);
    const [dropoffCoords, setDropoffCoords] = useState(SFSU_COORDS);
    const [deliveryData, setDeliveryData] = useState(null);
    const [status, setStatus] = useState("Assigned");

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4",
    });

    // // Redirect if not logged in
    // useEffect(() => {
    //     if (!user) navigate("/login");
    // },[user, navigate]);

    useEffect(() => {
        if (!user || !deliveryId) return;
        (async () => {
            try {
                const res = await fetch(`/api/delivery_instruction/${deliveryId}`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                if (data.courier_id !== courierId) {
                    navigate("/CourierPage");
                }
                else {
                    setDeliveryData(data);
                    setStatus(data.delivery_status || "Assigned");
                    setPickupCoords(PICK_UP_COORDS[data.pickup] || SFSU_COORDS);
                    setDropoffCoords(DROP_OFF_COORDS[data.dropoff] || SFSU_COORDS);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        })();
    }, [deliveryId, user, courierId]);


    // Send status updates
    const updateStatus = async (newStatus) => {
        try {
            const res = await fetch(
                `/api/delivery_instruction/${deliveryId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ delivery_status: newStatus }),
                }
            );
            if (!res.ok) throw new Error(res.statusText);
            setStatus(newStatus);
            if (newStatus === "Delivered") {
                navigate("/CourierPage");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };
    // Determine which marker & center to show
    const centerCoords = status === "Assigned"
        ? pickupCoords
        : dropoffCoords;

    // Label for the “next stage” button
    const nextStage = status === "Assigned"
        ? "Picked Up"
        : status === "Picked Up"
            ? "Delivered"
            : null;

    return (
        <div className="delivery-layout">
            <div className="map-panel">
                {isLoaded ? (
                    <GoogleMap
                        center={centerCoords}
                        zoom={17}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                        <Marker position={centerCoords} />
                    </GoogleMap>
                ) : (
                    <div className="map-placeholder">Loading map...</div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Logo" />
                </div>
                <ReturnHome/>
                {deliveryData && (
                    <>
                        <p><strong>Pickup:</strong> {deliveryData.pickup}</p>
                        <p><strong>Dropoff:</strong> {deliveryData.dropoff}</p>
                        <p>
                            <strong>Status:</strong> {status}
                        </p>
                        <div className="courier-button-block">
                            {nextStage && (
                                <button onClick={() => updateStatus(nextStage)}>
                                    {nextStage}
                                </button>
                            )}
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
