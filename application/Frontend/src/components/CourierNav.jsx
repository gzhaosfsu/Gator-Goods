import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UserContext } from "../UserContext";
import mascot from "./images/LogoGG.png";
import courierMascot from "./images/GG_Delivery_Gator.PNG";
import "../DeliveryLayout.css";
import ReturnHome from "./ReturnHome";

const SFSU_COORDS = { lat: 37.7219, lng: -122.4782 };
const PICK_UP_COORDS = {
    "SFSU Bookstore":                   { lat: 37.7224, lng: -122.4784 },
    "Quickly":                          { lat: 37.7226, lng: -122.4788 },
    "Halal Shop":                       { lat: 37.7226, lng: -122.4786 },
    "Cafe 101":                         { lat: 37.7223, lng: -122.4785 },
    "Nizario's Pizza":                  { lat: 37.7225, lng: -122.4783 },
    "Station Cafe":                     { lat: 37.7223, lng: -122.4784 },
    "Cesar Chavez":                     { lat: 37.7225, lng: -122.4786 },
    "Student Services":                 { lat: 37.7234, lng: -122.4808 },
    "Library":                          { lat: 37.7214, lng: -122.4778 },
    "Hensill Hall":                     { lat: 37.7235, lng: -122.4755 },
    "The Village at Centennial Square": { lat: 37.7233, lng: -122.4820 },
    "Annex 1":                          { lat: 37.7268, lng: -122.4821 },
};
const DROP_OFF_COORDS = {
    "Cesar Chavez":                     { lat: 37.7225, lng: -122.4786 },
    "Student Services":                 { lat: 37.7234, lng: -122.4808 },
    "Library":                          { lat: 37.7214, lng: -122.4778 },
    "Hensill Hall":                     { lat: 37.7235, lng: -122.4755 },
    "The Village at Centennial Square": { lat: 37.7233, lng: -122.4820 },
    "Annex 1":                          { lat: 37.7268, lng: -122.4821 },
};

export default function CourierNav() {
    const { deliveryId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const courierId = user.user_id;
    const [pickupCoords, setPickupCoords]   = useState(SFSU_COORDS);
    const [dropoffCoords, setDropoffCoords] = useState(SFSU_COORDS);
    const [deliveryData, setDeliveryData] = useState(null);
    const [listing, setListing] = useState(null);
    const [status, setStatus] = useState("Assigned");
    const [courierCoords, setCourierCoords] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBR4Mm33pFrku02bflPHV_KSL79imyUOg4",
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!user) navigate("/login");
    },[user, navigate]);

    useEffect(() => {
        if (isLoaded && deliveryData && listing !== null) {
            const delay = 3000;
            const timer = setTimeout(() => setLoading(false), delay);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, deliveryData, listing]);

    useEffect(() => {
        if (!deliveryId) return;
        (async () => {
            try {
                const res  = await fetch(`/api/delivery_instruction/${deliveryId}`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();

                if (data.courier_id !== courierId) {
                    navigate("/courierPage");
                    return;
                }

                setDeliveryData(data);
                setStatus(data.delivery_status || "Assigned");
                setPickupCoords(PICK_UP_COORDS[data.pickup] || SFSU_COORDS);
                setDropoffCoords(DROP_OFF_COORDS[data.dropoff] || SFSU_COORDS);
            } catch (err) {
                console.error("Fetch error:", err);
                navigate("/courierPage");
            }
        })();
    }, [deliveryId, courierId, navigate]);

    useEffect(() => {
        if (!deliveryData?.listing_id) return;

        (async () => {
            try {
                const res   = await fetch(`/api/listing/${deliveryData.listing_id}`);
                if (!res.ok) throw new Error("Listing not found");
                const item  = await res.json();
                setListing(item);
            } catch (err) {
                console.error("Listing fetch error:", err);
            }
        })();
    }, [deliveryData]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setCourierCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error("Geolocation error:", error),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);


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
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    const handleUnableToDeliver = async () => {
        if (!window.confirm("Are you sure you can't deliver this item?")) return;

        try {
            const res = await fetch(`/api/delivery_instruction/${deliveryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    delivery_status: "Unassigned",
                    courier_id: null,
                }),
            });

            if (!res.ok) throw new Error(res.statusText);

            alert("Delivery marked as unassigned.");
            navigate("/courierPage");
        } catch (err) {
            console.error("Failed to unassign delivery:", err);
            alert("Could not update delivery.");
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
        <>
            {loading && (
                <div className="full-page-loading">
                    <img src={courierMascot} alt="Loading Mascot" className="mascot-loader-full" />
                    <p>Loading your delivery...</p>
                </div>
            )}

        <div className="delivery-layout" style={{ visibility: loading ? 'hidden' : 'visible' }}>
            <div className="map-panel">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={centerCoords}
                            zoom = {18}
                    >
                        {courierCoords && (
                            <Marker
                                position={courierCoords}
                                icon="https://maps.google.com/mapfiles/ms/micons/blue-dot.png"
                            />
                        )}
                        <Marker position={pickupCoords}
                                icon={"https://maps.google.com/mapfiles/ms/micons/shopping.png"}
                        />
                        <Marker position={dropoffCoords}
                                icon={"https://maps.google.com/mapfiles/ms/micons/red-dot.png"}
                        />
                    </GoogleMap>
                ) : (
                    <div className="map-placeholder">Loading map…</div>
                )}
            </div>

            <div className="info-panel">
                <div className="logo-header">
                    <img src={mascot} alt="Logo" />
                </div>

                <div className="info-content">
                    <button onClick={() => navigate('/courierPage')} >Back to Courier Dashboard</button>
                    <br/>
                    <ReturnHome onClickto="/courierPage"/>

                    {listing && (
                        <div className="product-card">
                            {listing.thumbnail
                                ? <img src={listing.thumbnail} alt={listing.title} className="product-image"/>
                                : <div className="no-image">No Image</div>
                            }
                            <h3>{listing.title}</h3>
                        </div>
                    )}

                    {deliveryData && (
                        <>
                            <div className="field-group">
                                <p><strong>Pick Up Address:</strong></p>
                                <p>{deliveryData.pickup}</p>
                            </div>

                            <div className="field-group">
                                <p><strong>Dropoff Address:</strong></p>
                                <p>{deliveryData.dropoff}</p>
                            </div>

                            <div className="progress-bar">
                                <span className={status === "Assigned" ? "active" : ""}>Assigned</span>
                                <span className={status === "Picked Up" ? "active" : ""}>Picked Up</span>
                                <span className={status === "Delivered" ? "active" : ""}>Delivered</span>
                            </div>
                            <div className="button-block">
                            {nextStage && (
                                <button
                                    className={status === "Assigned" ? "btn-primary" : "btn-success"}
                                    onClick={() => updateStatus(nextStage)}
                                >
                                    {nextStage === "Picked Up" ? "PICKED UP" : "FINISH DROP OFF"}
                                </button>
                            )}
                            {status === "Assigned" && (
                                <button
                                    className="btn-danger"
                                    onClick={handleUnableToDeliver}
                                >
                                    UNABLE TO DELIVER
                                </button>
                            )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}