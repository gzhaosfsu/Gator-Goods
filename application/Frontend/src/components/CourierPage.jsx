import React, {useContext, useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import '../courierPage.css';
import MessageBubble from './MessageBubble';
import { useNavigate } from 'react-router-dom';
import dummyDeliveryRequests from '../dummyDeliveryRequests'; // moved dummyData to .js

const CourierPage = () => {
  const navigate = useNavigate();

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

  const [courierId, setCourierId] = useState(123);

  // This function toggles the onShift state when the button is clicked
  const toggleOnOffShift = () => {
    setOnShift(prev => !prev);
  };

  //UNCOMMENT TO USE BACKEND DATA
  // This useEffect fetches the delivery requests from the backend when the component mounts or when the onShift state changes
  // It formats the data to match the expected structure and sets it to the deliveryRequests state
  // It also handles the case when the onShift state is false, in which case it clears the delivery requests
  useEffect(() => {
    if (onShift) {
      fetch("/api/delivery_instruction/")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch delivery instructions");
          return res.json();
        })
        .then(data => {
          const formatted = data.map(item => ({
            title: `Delivery Request #${item.delivery_id}`,
            pickupAddress: item.pickup,
            dropoffAddress: item.dropoff,
            imageUrl: item.image_url || "https://via.placeholder.com/150",
            sellerNote: item.seller_special_request || "N/A",
            buyerNote: item.buyer_special_request || "N/A",
            delivery_id: item.delivery_id,
            buyer_id: item.buyer_id,
            vendor_id: item.vendor_id,
            courier_id: item.courier_id,
            product_id: item.product_id,
            quantity: item.quantity,
            status: item.delivery_status,
            timestamp: item.timestamp,
          }));
          setDeliveryRequests(formatted);
        })
        .catch(err => console.error("Error fetching delivery instructions:", err));
    } else {
      setDeliveryRequests([]);
    }
  }, [onShift]);
  

  const handleAcceptDelivery = async (deliveryReq) => {
    console.log("Delivery accepted:", deliveryReq);
    try {
      // Update backend to mark as assigned
      const res = await fetch(`/api/delivery_instruction/${deliveryReq.delivery_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courier_id: courierId, // TODO: Replace with real logged-in courier ID
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
      body: JSON.stringify({ delivery_status: "Picked Up" }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to start delivery");

        setRemovingId(selectedDelivery.delivery_id);
        setSelectedDelivery(null);
        setTimeout(() => {
          setDeliveryRequests(prev => prev.filter(d => d.delivery_id !== selectedDelivery.delivery.id));
          setRemovingId(null);
        }, 500);
      })
      .catch(err => console.error("Error starting delivery:", err));
  };


  //THIS NEEDS TROUBLESHOOTING
  const handleSendMessage = (id, messageText) => {
    fetch(`/api/delivery_requests/${id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to send message");
        return res.json();
      })
      .then(() => {
        setMessageStates(prev => ({ ...prev, [id]: true }));
      })
      .catch(err => console.error("Error sending message:", err));
      console.log(`Message sent to ${id}: ${messageText}`);
  };

  return (
    <div className="courier-page">
      <Header />
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
        {/* Replace dummyDeliveryRequests with deliveryRequests when ready */}
        {!onShift && <p>Click button to start shift.</p>}
        {onShift && (deliveryRequests.length > 0 ? (deliveryRequests.map((deliveryReq) => (


          // This is how the delivery requests get "whooshed out" when accepted
        <div
        className={`delivery-request ${removingId === deliveryReq.delivery_id ? "whoosh-out" : ""}`}
        key={deliveryReq.id}
        >

        <h3 className="delivery-title">{deliveryReq.title}</h3>
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

            {/* Used to debug Notes and backend info-- as of rn? WORKS */}
            {/* <p><strong>Note from Seller: </strong> {deliveryReq.sellerNote}</p>
            <p><strong>Note from Buyer: </strong> {deliveryReq.buyerNote}</p> */}

            {/* This is where the delivery buttons are-- WIP for Message Buyer */}
            <div className="delivery-buttons">
              {/* Replace setSelectedDelivery with with handleAcceptDelivery(deliveryReq.id) when ready */}
              <button className="accept-btn" onClick={() => handleAcceptDelivery(deliveryReq.delivery_id)}>ACCEPT</button>
              <MessageBubble id={deliveryReq.id} 
                // for backend implementation, uncomment the line below
                handleSendMessage={handleSendMessage} 
                messageStates={messageStates}
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
              </div>
              <button className="start-btn" onClick={() => handleStartDelivery(selectedDelivery.delivery_id)}>Start Delivery</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};
export default CourierPage;