import React, {useContext} from 'react';
import { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import '../courierPage.css';
import {UserContext} from "../UserContext";

const CourierPage = () => {
  const {user} = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [onShift, setOnShift] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const toggleOnOffShift = () => {
    setOnShift(prev => !prev);
    setSelectedDelivery(null);
  };

  const [dummyDeliveryRequests, setDummyRequests] = useState ([

    {
      id: 1,
      title: "Delivery Request 1",
      pickupAddress: "VENDOR #1'S ADDRESS",
      dropoffAddress: "BUYER #1'S ADDRESS",
      imageUrl: "https://file.garden/Zn8NIHsVuBTAwgXF/GRAYSQUARE",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    },
    {
      id: 2,
      title: "Delivery Request 2",
      pickupAddress: "VENDOR #2'S ADDRESS",
      dropoffAddress: "BUYER #2'S ADDRESS",
      imageUrl: "https://file.garden/Zn8NIHsVuBTAwgXF/GRAYSQUARE",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    },
    {
      id: 3,
      title: "Delivery Request 3",
      pickupAddress: "VENDOR #3'S ADDRESS",
      dropoffAddress: "BUYER #3'S ADDRESS",
      imageUrl: "https://file.garden/Zn8NIHsVuBTAwgXF/GRAYSQUARE",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    }
  ]);


  // this is the ID of the delivery request that is being removed
  // which is used to trigger the animation when a delivery request is accepted
  const [removingId, setRemovingId] = useState(null);
  
  // function is called when the "Start Delivery" button is clicked
  // it sets the removingId to the ID of the selected delivery request
  // and then sets the selectedDelivery to null to close the popup
  const handleStartDelivery = () => {
    setRemovingId(selectedDelivery.id);
    setSelectedDelivery(null);
    setTimeout(() => {
      setDummyRequests(prev =>
        prev.filter(req => req.id !== selectedDelivery.id)
      );
      setRemovingId(null);
    }, 500); // 500 used to match animation duration
  }

  
  const [messageStates, setMessageStates] = useState({}); // To track which requests sent a message

  // for backend implementation, comment out the lines below
  // lines 71 to 74, which are the dummy data for the delivery requests
  const handleSendMessage = (id) => {
    setMessageStates((prev) => ({ ...prev, [id]: true }));
  };


// MessageBubble component is used to send a message to the buyer
const MessageBubble = ({ id, 
  // handleSendMessage, // for backend implementation, uncomment the line
  // messageStates // for backend implementation, uncomment the line
}) => {
    const [messageText, setMessageText] = useState('');
  
    const handleSendClick = () => {
      if (messageText.trim() !== '') {
        handleSendMessage(id);
        // for backend implementation, uncomment the lines below
        // handleSendMessage(id, messageText); // pass the actual text to the function
        // setMessageText(''); // Optionally clear the input after sending
      }
    };

    return (
      <div className="message-section">
        <div className="message-bubble">
          <p className="message-label">Send buyer a message</p>
          {!messageStates[id] ? (
            <div className="message-input-row">
              <input
                type="text"
                className="message-input"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="I will deliver the item and need payment"
              />
              <button className="send-btn" onClick={handleSendClick}>SEND</button>
            </div>
          ) : (
            <button className="see-convo-btn">See Conversation</button>
          )}
        </div>
      </div>
    );
  };


  // COMMENTED-OUT FETCH REQUEST FOR LATER IMPLEMENTATION OF BACKEND
  // THE CONST BELOW WILL REPLACE THE DUMMY DATA ABOVE ONCE THE BACKEND IS READY
  // const [deliveryRequests, setDeliveryRequests] = useState([]);

  // useEffect(() => {
  //   if (onShift) {
  //     fetch("http://localhost:3001/api/delivery_requests") //THIS IS A TEMP URL, CHANGE LATER
  //       .then((response) => response.json())
  //       .then((data) => setDeliveryRequests(data))
  //       .catch((error) => console.error("Error fetching deliveries:", error));
  //   } else {
  //     setDeliveryRequests([]); // Clear requests when off shift
  //   }
  // }, [onShift]);

  // COMMENTED-OUT FETCH REQUEST FOR LATER IMPLEMENTATION OF BACKEND
  // THE CONST BELOW WILL MAKE IT SO THAT THE MESSAGE IN THE MESSAGE BOX SENDS TO THE BACKEND
  // const handleSendMessage = (id, messageText) => {
  //   fetch(`http://localhost:3001/api/deliveries/${id}/message`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: messageText }), // send the actual text
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMessageStates((prev) => ({ ...prev, [id]: true }));
  //     })
  //     .catch((error) => {
  //       console.error("Error sending message:", error);
  //     });
  // };


  // COMMENTED-OUT FETCH REQUEST FOR LATER IMPLEMENTATION OF BACKEND
  // THE CONST BELOW WILL MAKE IT SO THAT THE DELIVERY REQUEST GETS ACCEPTED IN THE BACKEND
//   const handleAcceptDelivery = (deliveryId) => {
//     fetch(`http://localhost:3001/api/delivery_requests/${deliveryId}`, {
//       method: "PUT", // PUT method to update the delivery request
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: deliveryId, 
//         status: "accepted", // Update the status to "accepted" or whatever is appropriate
//       }),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to accept delivery');
//       }
//       // After successful backend update, trigger your animation
//       setRemovingId(deliveryId);
//       setTimeout(() => {
//         setDeliveryRequests((prevRequests) =>
//           prevRequests.filter((delivery) => delivery.id !== deliveryId)
//         );
//         setRemovingId(null);
//       }, 500);
//     })
//     .catch((error) => {
//       console.error("Error accepting delivery:", error);
//     });
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
              <button className="accept-btn" onClick={() => setSelectedDelivery(deliveryReq)}>ACCEPT</button>
              <MessageBubble id={deliveryReq.id} 
                // for backend implementation, uncomment the line below
                // handleSendMessage={handleSendMessage} 
                // messageStates={messageStates}
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
