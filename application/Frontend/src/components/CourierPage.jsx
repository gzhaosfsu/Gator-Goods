import {React, useContext, useEffect, useState } from "react";
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

  // This function toggles the onShift state when the button is clicked
  const toggleOnOffShift = () => {
    setOnShift(prev => !prev);
    setSelectedDelivery(null);
  };

  //UNCOMMENT TO USE BACKEND DATA
  // This useEffect fetches the delivery requests from the backend when the component mounts or when the onShift state changes
  // It formats the data to match the expected structure and sets it to the deliveryRequests state
  // It also handles the case when the onShift state is false, in which case it clears the delivery requests
  useEffect(() => {
    if (onShift) {
      fetch("http://localhost:3001/api/delivery_request")
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch delivery requests");
          return response.json();
        })
        .then((data) => {
          const formattedData = data.map((item) => ({
            id: item.delivery_request_id,
            title: `Delivery Request #${item.delivery_request_id}`,
            dropoffAddress: item.dropoff,
            pickupAddress: item.pickup,
            imageUrl: "https://via.placeholder.com/150",
            sellerNote: item.vendor_special_request,
            buyerNote: item.buyer_special_request,
            vendor_id: item.vendor_id,
            buyer_id: item.buyer_id,
            listing_id: item.listing_id,
            status: item.status,
          }));
          setDeliveryRequests(formattedData);
        })
        .catch((err) => console.error("Fetch error:", err));
    } else {
      setDeliveryRequests([]);
    }
  }, [onShift]);
  
  // This function is called when a delivery request is clicked
  // It fetches the combined delivery request data from the backend and sets it to the selectedDelivery state
  // It also fetches the pickup address details and adds them to the selected delivery data
  const handleSelectDelivery = (deliveryId) => {
    fetch(`http://localhost:3001/api/delivery_request/combined/${deliveryId}?delivery_request_id=${deliveryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Combined data:", data);
        fetch(`http://localhost:3001/api/delivery_instruction/address/pickup?pickup=${data.pickup}`)
          .then((pickupRes) => pickupRes.json())
          .then((pickupData) => {
            setSelectedDelivery({
              id: deliveryId,
              title: `Delivery Request #${deliveryId}`,
              // imageUrl: "https://via.placeholder.com/150",
              pickupAddress: pickupData.address || data.pickup, // Fallback if address is missing
              dropoffAddress: data.dropoff,
              sellerNote: data.vendor_special_request,
              buyerNote: data.buyer_special_request,
            });
          })
          .catch((err) => console.error("Error fetching pickup address:", err));
      })
      .catch((err) => console.error("Error fetching combined info:", err));
  };


    //DUMMY DATA VERSION OF ABOVE FUNCTION
  // const handleStartDelivery = () => {
  //   setRemovingId(selectedDelivery.id);
  //   setSelectedDelivery(null);
  //   setTimeout(() => {
  //     setDeliveryRequests(prev =>
  //       prev.filter(req => req.id !== selectedDelivery.id)
  //     );
  //     setRemovingId(null);
  //   }, 500); // 500 used to match animation duration
  // }


  // This function is called when the "Start Delivery" button is clicked
  // It sends a PUT request to the backend to update the delivery request status to "accepted"
  // It also sets the removingId state to trigger the animation and removes the delivery request from the list after a delay
  const handleAcceptDelivery = (deliveryId) => {
    const selected = deliveryRequests.find((d) => d.id === deliveryId);
    if (!selected) return;

    fetch(`http://localhost:3001/api/delivery_request/${deliveryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Approved",
        buyer_id: selected.buyer_id,
        vendor_id: selected.vendor_id,
        listing_id: selected.listing_id,
        dropoff: selected.dropoffAddress,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update delivery request");
        setRemovingId(selectedDelivery.id);
        setSelectedDelivery(null);
        setTimeout(() => {
          setDeliveryRequests((prev) => prev.filter((d) => d.id !== deliveryId));
          setRemovingId(null);
        }, 500);
      })
      .catch((err) => console.error("Accept error:", err));
  };

  // This function is called when the "Send" button is clicked in the message bubble
  // It sends the message to the backend and updates the message state to show that it has been sent
  // It also clears the message input field after sending the message
  const handleSendMessage = (deliveryId, messageText) => {
    fetch(`http://localhost:3001/api/delivery_requests/${deliveryId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }), // Send message content
    })
      .then((response) => response.json())
      .then((data) => { //NOTE (delete later): YOU ARE THE REASON. YOU AR ETHE CAUSE OF MY PAIN WITH THE SEE CONVERSATION BUTTON.
        setMessageStates((prev) => ({ ...prev, [deliveryId]: true })); // Mark as sent
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // This function is a placeholder for the backend implementation of sending a message
  // It currently just shows an alert with the delivery ID
  // const handleSendMessage = (deliveryId) => {
  //   alert(`Message sent to buyer for delivery #${deliveryId}`);
  // };

  // DUMMY DATA VERSION OF ABOVE FUNCTION
  // const handleSendMessage = (id) => {
  //   setMessageStates((prev) => ({ ...prev, [id]: true }));
  // };

  return (
    <div className="courier-page">
      <Header />
      <div className="courier-body">
      <button className={"dashboard-btn"} onClick={() => navigate('/userProfile')}>BACK TO PROFILE DASHBOARD</button>
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
        {onShift && (dummyDeliveryRequests.length > 0 ? (dummyDeliveryRequests.map((deliveryReq) => (

          // This is how the delivery requests get "whooshed out" when accepted
        <div
        className={`delivery-request ${removingId === deliveryReq.id ? "whoosh-out" : ""}`}
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
            <p>Pickup at: {deliveryReq.pickupAddress}</p>
            <p>Dropoff at: {deliveryReq.dropoffAddress}</p>

            {/* This is where the delivery buttons are-- WIP for Message Buyer */}
            <div className="delivery-buttons">
              {/* Replace setSelectedDelivery with with handleAcceptDelivery(deliveryReq.id) when ready */}
              <button className="accept-btn" onClick={() => handleSelectDelivery(deliveryReq.id)}>ACCEPT</button>
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
              <h3>{selectedDelivery.title || `Delivery Request #${selectedDelivery.id}`}</h3>
                <img 
                src={selectedDelivery.imageUrl}
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
              <button className="start-btn" onClick={handleAcceptDelivery(selectedDelivery.id)}>Start Delivery</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};
export default CourierPage;