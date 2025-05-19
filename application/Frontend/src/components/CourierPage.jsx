import React, {useContext, useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import '../courierPage.css';
import MessageBubble from './MessageBubble';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import dummyDeliveryRequests from '../dummyDeliveryRequests'; // moved dummyData to .js

const CourierPage = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [onShift, setOnShift] = React.useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    const [deliveryRequests, setDeliveryRequests] = useState([]); //uncomment when using backend data
    // const [deliveryRequests, setDeliveryRequests] = useState(dummyDeliveryRequests); //dummyData, comment out when using backend data

    // this is the ID of the delivery request that is being removed
    // which is used to trigger the animation when a delivery request is accepted
    const [removingId, setRemovingId] = useState(null);

    // this is the state that tracks the message bubble for each delivery request
    // it is used to show whether the message has been sent or not
    const [messageStates, setMessageStates] = useState({});
    const [myRequests, setMyRequests] = useState([]);

    // This function toggles the onShift state when the button is clicked
    const toggleOnOffShift = () => {
        setOnShift(prev => !prev);
    };

    useEffect(() => {
        if (!user) navigate("/login");
    },[user, navigate]);

    //UNCOMMENT TO USE BACKEND DATA
    // This useEffect fetches the delivery requests from the backend when the component mounts or when the onShift state changes
    // It formats the data to match the expected structure and sets it to the deliveryRequests state
    // It also handles the case when the onShift state is false, in which case it clears the delivery requests
    useEffect(() => {
        if (onShift) {
            const fetchAvailable = fetch("/api/delivery_instruction/courier/unassigned")
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch delivery instructions");
                    console.log(res);
                    return res.json();
                });

            const fetchMine = fetch(`/api/delivery_instruction/courier/${user.user_id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch your deliveries");
                    return res.json();
                });
            Promise.all([fetchAvailable, fetchMine])
                .then(([availableData, myData]) => {
                    const transform = (arr) => arr.map(({
                                                            delivery_id,
                                                            pickup,
                                                            dropoff,
                                                            seller_special_request,
                                                            buyer_special_request,
                                                            buyer_id,
                                                            vendor_id,
                                                            courier_id,
                                                            product_id,
                                                            quantity,
                                                            delivery_status,
                                                            timestamp
                                                        }) => ({
                        delivery_id,
                        pickupAddress: pickup,
                        dropoffAddress: dropoff,
                        sellerNote: seller_special_request || "N/A",
                        buyerNote: buyer_special_request || "N/A",
                        buyer_id,
                        vendor_id,
                        courier_id,
                        product_id,
                        quantity,
                        status: delivery_status,
                        timestamp,
                    }));
                    setDeliveryRequests(transform(availableData));
                    setMyRequests(transform(myData));
                })
                .catch(err => console.error("Error fetching delivery instructions:", err));
        } else {
            setDeliveryRequests([]);
            setMyRequests([]);
        }
    }, [onShift, user.user_id]);

    const handleAcceptDelivery = async (deliveryReq) => {
        console.log("Delivery accepted:", deliveryReq);
        try {
            // Update backend to mark as assigned
            const res = await fetch(`/api/delivery_instruction/${deliveryReq.delivery_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courier_id: user.user_id,
                    delivery_status: "Assigned"
                }),
            });
            if (!res.ok) throw new Error("Failed to assign delivery");
            navigate(
                `/courierNav/${deliveryReq.delivery_id}`,
                {state: {deliveryReq}}
            );
        } catch (err) {
            console.error("Error accepting delivery:", err);
        }
    };


    const handleStartDelivery = (selectedDelivery) => {
        if (!selectedDelivery) return;

        console.log("Starting delivery for:", selectedDelivery);

        fetch(`/api/delivery_instruction/${selectedDelivery.delivery_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({delivery_status: "Assigned"}),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to start delivery");

                setRemovingId(selectedDelivery.delivery_id);
                setSelectedDelivery(null);
                setTimeout(() => {
                    setDeliveryRequests(prev => prev.filter(d => d.delivery_id !== selectedDelivery.delivery_id));
                    setRemovingId(null);
                }, 500);
            })
            .catch(err => console.error("Error starting delivery:", err));
    };


    //THIS NEEDS TROUBLESHOOTING, NEEDS A LOGIN USER ID???
    const handleSendMessage = async (receiver_id, messageText, listing_id) => {
        console.log("handleSendMessage called with:", {receiver_id, messageText, listing_id});

        try {
            const response = await fetch("/api/direct_message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sender_id: user.user_id,
                    receiver_id,
                    listing_id,
                    content: messageText
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API error:", errorText); // Show server-side error
                throw new Error("Failed to send message");
            }

            console.log("Message sent successfully");

            // Move this into a new try block
            try {
                setMessageStates((prev) => {
                    const updated = {...prev, [receiver_id]: true};
                    console.log("Updated messageStates:", updated);
                    return updated;
                });
            } catch (stateErr) {
                console.error("Error updating messageStates:", stateErr);
            }

        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const inProgress = myRequests.filter(r => r.status === 'Assigned' || r.status === 'Picked Up');
    const delivered = myRequests.filter(r => r.status === 'Delivered');

    const renderReq = deliveryReq => (
        <div
            key={deliveryReq.delivery_id}
            className={`delivery-request ${removingId === deliveryReq.delivery_id ? "whoosh-out" : ""}`}
        >
            <h3 className="delivery-title">
                Delivery Request #{deliveryReq.delivery_id}
            </h3>
            <div className="delivery-content">
                {/* // This is the image of the delivery request */}
                <img
                    src={deliveryReq.imageUrl}
                    alt="Product Image"
                    className="product-image"
                />
                {/* This is where the delivery buttons are-- WIP for Message Buyer */}
                <div className="delivery-buttons">
                    <button className="accept-btn" onClick={() => handleAcceptDelivery(deliveryReq)}>ACCEPT</button>
                    <MessageBubble
                        id={deliveryReq.delivery_id}
                        buyerId={deliveryReq.buyer_id} // assuming buyer_id is part of the deliveryReq
                        courierId={deliveryReq.courier_id}
                        handleSendMessage={handleSendMessage}
                        messageStates={messageStates}
                        setMessageStates={setMessageStates}
                    />
                </div>
            </div>
            <div className="delivery-details">
                <p><strong>Delivery Status:</strong>{deliveryReq.status}</p>
                <p><strong>Pickup at: </strong>{deliveryReq.pickupAddress}</p>
                <p><strong>Dropoff at: </strong>{deliveryReq.dropoffAddress}</p>

                {/* Used to debug Notes and backend info-- as of rn? WORKS */}
                {/* <p><strong>Note from Seller: </strong> {deliveryReq.sellerNote}</p>
            <p><strong>Note from Buyer: </strong> {deliveryReq.buyerNote}</p> */}
            </div>
        </div>
    );

    return (
        <div className="courier-page">
            <Header/>
            <div className="courier-body">
                <button className={"dashboard-btn"} onClick={() => navigate('/realUserProfile')}>BACK TO PROFILE
                    DASHBOARD
                </button>
                <div className="courier-header">
                    <h2>List of Open Assignments</h2>
                    <button
                        className={onShift ? "end-shift-btn" : "available-btn"}
                        onClick={toggleOnOffShift}
                    >
                        {onShift ? "END SHIFT" : "Available for Work"}
                    </button>
                </div>
                <div className="yellow-divider"></div>
                {!onShift && <p>Click button to start shift.</p>}
                {onShift ? (
                    <>
                        <h3>Available</h3>
                        {deliveryRequests.length > 0
                            ? deliveryRequests.map(renderReq)
                            : <p>No available deliveries.</p>
                        }
                        <h3>In Progress</h3>
                        {inProgress.length > 0
                            ? inProgress.map(renderReq)
                            : <p>No in-progress deliveries.</p>
                        }
                        <h3>Delivered</h3>
                        {delivered.length > 0
                            ? delivered.map(renderReq)
                            : <p>No completed deliveries.</p>
                        }
                    </>
                ) : (
                    <p>No more delivery requests at this time. Please check again later.</p>
                )}
                {selectedDelivery && (
                    <div className="delivery-popup">
                        <div className="popup-content">
                            <button className="close-btn" onClick={() => setSelectedDelivery(null)}>X</button>
                            <h3>{selectedDelivery.title}</h3>
                            <img
                                src={selectedDelivery.image_url}
                                alt="Delivery"
                                className="delivery-image"
                            />
                            <p><strong>Note from Seller: </strong></p>
                            <p>{selectedDelivery.sellerNote}</p>
                            <p><strong>Note from Buyer: </strong></p>
                            <p>{selectedDelivery.buyerNote}</p>
                            <div className="popup-details">
                                <p><strong>Pickup Address: </strong> {selectedDelivery.pickupAddress}</p>
                                <p><strong>Dropoff Address</strong> {selectedDelivery.dropoffAddress}</p>
                            </div>
                            <button className="start-btn" onClick={() => handleStartDelivery(selectedDelivery)}>Start
                                Delivery
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default CourierPage;