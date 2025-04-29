import React from 'react';
import { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import '../courierPage.css';
import MessageBubble from './MessageBubble';
import dummyDeliveryRequests from './dummyDeliveryRequests'; // moved dummyData to .js

const CourierPage = () => {

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
  // This useEffect fetches the delivery requests from the backend when the component mounts and when the onShift state changes
  // It sets the delivery requests in the state and handles the case when onShift is false by clearing the requests
  useEffect(() => {
    if (onShift) {
      fetch("http://localhost:3001/api/delivery_requests")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch delivery requests");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched delivery requests:", data); // Debugging line
          setDeliveryRequests(data);
        })
        .catch((error) => console.error("Error fetching deliveries:", error));
    } else {
      setDeliveryRequests([]);
    }
  }, [onShift]);
 

  

  // IGNORE THIS COMMENTED OUT CODE THIS WAS A TEST RUN ATTEMPT TO FETCH DATA FROM BACKEND
  // useEffect(() => {
  //   if (onShift) {
  //     fetch("http://localhost:3001/api/delivery_requests")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const formattedData = data.map((item) => ({
  //           id: item.delivery_request_id,
  //           title: `Delivery Request #${item.delivery_request_id}`, // fake title for now
  //           pickupAddress: "Pickup Address Placeholder", // placeholder
  //           dropoffAddress: item.dropoff, 
  //           imageUrl: "https://via.placeholder.com/150", // placeholder image
  //           sellerNote: "Seller Note Placeholder", // you can fetch this later properly
  //           buyerNote: "Buyer Note Placeholder",
  //           status: item.status
  //         }));
  //         setDeliveryRequests(formattedData);
  //       })
  //       .catch((error) => console.error("Error fetching deliveries:", error));
  //   } else {
  //     setDeliveryRequests([]);
  //   }
  // }, [onShift]);
  
  
 
  
  // This function is called when the "Start Delivery" button is clicked
  // It updates the delivery request status in the backend, closes the popup,
  // removes the delivery request from the list,
  // and triggers the animation for the delivery request being accepted
  const handleStartDelivery = () => {
    if (!selectedDelivery) return; // Safety check
  
    fetch(`http://localhost:3001/api/delivery_requests/${selectedDelivery.id}`, {
      //PUT request to update the delivery request
      method: "PUT",
      headers: { // headers used to specify the content type of the request
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accepted" }), // Mark as accepted
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to accept delivery");
        }
        setRemovingId(selectedDelivery.id); // Trigger the "whoosh-out" animation
        setSelectedDelivery(null); // Close popup
        setTimeout(() => {
          setDeliveryRequests((prevRequests) => // Remove the accepted delivery request from the list
            prevRequests.filter((delivery) => delivery.id !== selectedDelivery.id) // filter out the accepted delivery request
          );
          setRemovingId(null); // Reset removingId after the animation
        }, 500); // Wait for animation
      })
      .catch((error) => {
        console.error("Error starting delivery:", error);
      });
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


  // COMMENT OUT THIS FUNCTION WHEN TESTING WITH BACKEND DATA
  // This function is called when the "Accept" button is clicked on a delivery request
  // It updates the delivery request status in the backend and triggers the animation for the delivery request being accepted
  // It also sets the selected delivery request to show the popup with details
  const handleAcceptDelivery = (deliveryId) => {
    // Find the selected delivery in the current state to update it
    const selectedDelivery = deliveryRequests.find((delivery) => delivery.id === deliveryId);
    if (!selectedDelivery) return; // Safety check

    // Send the full data for update
    fetch(`http://localhost:3001/api/delivery_requests/${deliveryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyer_id: selectedDelivery.buyer_id, // Make sure the full data is included
        vendor_id: selectedDelivery.vendor_id, // Make sure the full data is included
        status: "accepted", // Update the status to "accepted"
        dropoff: selectedDelivery.dropoffAddress, // Use the dropoff address from UI
        listing_id: selectedDelivery.listing_id // CHECK-IN: If needed
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to accept delivery');
        }
        setRemovingId(deliveryId); // Trigger the "whoosh-out" animation
        setTimeout(() => {
          setDeliveryRequests((prevRequests) =>
            prevRequests.filter((delivery) => delivery.id !== deliveryId)
          );
          setRemovingId(null); // Reset removingId after the animation
        }, 500);
      })
      .catch((error) => {
        console.error("Error accepting delivery:", error);
      });
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


  // DUMMY DATA VERSION OF ABOVE FUNCTION
  // const handleSendMessage = (id) => {
  //   setMessageStates((prev) => ({ ...prev, [id]: true }));
  // };


  return (
    <div className="courier-page">
      <Header />
      <div className="courier-body">
      <button className={"dashboard-btn"}>BACK TO PROFILE DASHBOARD</button>
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
              {/* <button className="accept-btn" onClick={() => setSelectedDelivery(deliveryReq)}>ACCEPT</button> */}
              <button className="accept-btn" onClick={() => handleAcceptDelivery(deliveryReq.id)}>ACCEPT</button>
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
            {/* <button className="close-btn" onClick={() => setSelectedDelivery(null)}>X</button> */}
              <h3>{selectedDelivery.title}</h3>
                <img 
                src={selectedDelivery.imageUrl}
                alt="Delivery" 
                className="delivery-image" 
                />
              <p><strong>Note from Seller:</strong></p>
              <p>{selectedDelivery.sellerNote}</p>
              <p><strong>Note from Buyer:</strong></p>
              <p>{selectedDelivery.buyerNote}</p>
              <div className="popup-details">
                <p><strong>Pickup Address: </strong> {selectedDelivery.pickupAddress}</p>
              </div>
              <button className="start-btn" onClick={handleStartDelivery}>Start Delivery</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};
export default CourierPage;
