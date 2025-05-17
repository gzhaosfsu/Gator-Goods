import React, {useContext, useEffect, useState } from "react";
import Footer from './Footer';
import '../courierPage.css';
import MessageBubble from './MessageBubble';
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../UserContext"
import { Link } from 'react-router-dom';


const CourierPage = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const [onShift, setOnShift] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  const [messageStates, setMessageStates] = useState({});
  // useEffect(() => {
  //   console.log("Current messageStates after render:", JSON.stringify(messageStates, null, 2));
  // }, [messageStates]);

  const toggleOnOffShift = () => {
    setOnShift(prev => !prev);
  };

//   useEffect(() => {
//   console.log("User from context:", user);
// }, [user]);


useEffect(() => {
  if (onShift) {
    fetch("/api/delivery_instruction/courier/unassigned")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch delivery instructions");
        return res.json();
      })
      .then(data => setDeliveryRequests(
        data.map(({
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
          pickupAddress: pickup,
          dropoffAddress: dropoff,
          sellerNote: seller_special_request || "N/A",
          buyerNote: buyer_special_request || "N/A",
          delivery_id,
          buyer_id,
          vendor_id,
          courier_id,
          product_id,
          quantity,
          status: delivery_status,
          timestamp,
        }))
      ))
      .catch(err => console.error("Error fetching delivery instructions:", err));
  } else {
    setDeliveryRequests([]);
  }
}, [onShift]);


useEffect(() => {
  if (user && deliveryRequests.length > 0) {
    const fetchMessageStates = async () => {
      const newMessageStates = {};

      for (const delivery of deliveryRequests) {
        try {
          const res = await fetch(`/api/direct_message/listing-sender/get?id=${user.user_id}&listing=${delivery.listing_id}`);
          const data = await res.json();
          newMessageStates[delivery.buyer_id] = Array.isArray(data) && data.length > 0;
        } catch (err) {
          console.error("Error checking message state for buyer:", delivery.buyer_id, err);
        }
      }
      setMessageStates(newMessageStates);
    };
    fetchMessageStates();
  }
}, [user, deliveryRequests]);


  const handleAcceptDelivery = async (deliveryReq) => {

    console.log("Delivery accepted:", deliveryReq);
    try {
      const res = await fetch(`/api/delivery_instruction/${deliveryReq.delivery_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courier_id: user.user_id, 
          delivery_status: "Assigned"
        }),
      });
      if (!res.ok) throw new Error("Failed to assign delivery");
      setSelectedDelivery(deliveryReq);
    } catch (err) {
    console.error("Error accepting delivery:", err);
  }
};

  const handleStartDelivery = (selectedDelivery) => {
    if (!selectedDelivery) return;

    console.log("Starting delivery for:", selectedDelivery);

    fetch(`/api/delivery_instruction/${selectedDelivery.delivery_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delivery_status: "Assigned" }),
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


  console.log("Current courier user ID:", user.user_id);

const handleSendMessage = async (receiver_id, messageText, listing_id) => {  

  console.log("Sending payload to API:", {
  sender_id: user.user_id,
  receiver_id,
  listing_id,
  content: messageText
});

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
        const updated = { ...prev, [receiver_id]: true };
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


  return (
    <div className="courier-page">
      <div className="courier-body">
      <button className={"dashboard-btn"} onClick={() => navigate('/realUserProfile')}>BACK TO PROFILE DASHBOARD</button>
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
        {onShift && (deliveryRequests.length > 0 ? (deliveryRequests.map((deliveryReq) => (


          // This is how the delivery requests get "whooshed out" when accepted
        <div
        className={`delivery-request ${removingId === deliveryReq.delivery_id ? "whoosh-out" : ""}`}
        key={deliveryReq.id}
        >

        <h3 className="delivery-title">{`Delivery Request #${deliveryReq.delivery_id}`}</h3>
        <div className="delivery-content">

          {/* // This is the image of the delivery request */}
          <img 
            src={deliveryReq.imageUrl}
            alt="Delivery" 
            className="delivery-image" 
          />

          <div className="delivery-details">
            <p><strong>Pickup at: </strong>{deliveryReq.pickupAddress}</p>
            <p><strong>Dropoff at: </strong>{deliveryReq.dropoffAddress}</p>


            {/* This is where the delivery buttons are-- WIP for Message Buyer */}
            <div className="delivery-buttons">
              <button className="accept-btn" onClick={() => handleAcceptDelivery(deliveryReq)}>ACCEPT</button>
              <MessageBubble
                id={deliveryReq.listing_id}
                buyerId={deliveryReq.buyer_id}
                handleSendMessage={handleSendMessage}
                messageStates={messageStates}
                setMessageStates={setMessageStates}
              />
            </div>
            </div>
          </div>
        </div>
        ))) : (
        <p>No more delivery requests at this time. Please check again later.</p>
      )
    )}
        
        {selectedDelivery && (
          <div className="delivery-popup">
            <div className="popup-content">
            {/* <button className="close-btn" onClick={() => setSelectedDelivery(null)}>X</button> */}
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
              </div>
              <Link to ="/CourierNav" className="start-btn" onClick={() => handleStartDelivery(selectedDelivery)}>Start Delivery</Link>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};
export default CourierPage;