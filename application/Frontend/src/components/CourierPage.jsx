import React from 'react';
import { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const CourierPage = () => {

  const [onShift, setOnShift] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const toggleOnOffShift = () => {
    setOnShift(prev => !prev);
    setSelectedDelivery(null);
  };

  const dummyDeliveryRequest = [

    {
      id: 1,
      title: "Delivery Request 1",
      pickupAddress: "VENDOR #1'S ADDRESS",
      dropoffAddress: "BUYER #1'S ADDRESS",
      imageUrl: "https://via.placeholder.com/100",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    },
    {
      id: 2,
      title: "Delivery Request 2",
      pickupAddress: "VENDOR #2'S ADDRESS",
      dropoffAddress: "BUYER #2'S ADDRESS",
      imageUrl: "https://via.placeholder.com/100",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    },
    {
      id: 3,
      title: "Delivery Request 3",
      pickupAddress: "VENDOR #3'S ADDRESS",
      dropoffAddress: "BUYER #3'S ADDRESS",
      imageUrl: "https://via.placeholder.com/100",
      sellerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas. Pellentesque erat ante, accumsan et efficitur at, gravida vitae ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque rutrum massa, non pulvinar orci molestie et. Quisque risus orci, placerat quis eros quis, sagittis tincidunt ante. Nam porta imperdiet massa in fringilla. Aenean pretium enim vitae porta rhoncus. Curabitur faucibus at nulla consectetur ornare. Pellentesque congue eros sit amet accumsan venenatis. Proin eget vulputate nulla, sed iaculis diam. Pellentesque ut ex rhoncus, facilisis arcu ac, convallis quam.",
      buyerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pulvinar lacus. Donec et augue placerat, sodales urna at, fermentum lectus. Vestibulum venenatis diam nec ex sollicitudin, et venenatis ipsum congue. Mauris imperdiet nisl ac tortor dictum, ac aliquet arcu mollis. Curabitur vehicula sed sem nec facilisis. Suspendisse vitae dolor non risus luctus egestas.",
    }
  ];

  // COMMENTED-OUT FETCH REQUEST FOR LATER IMPLEMENTATION OF BACKEND
  // THE CONST BELOW WILL REPLACE THE DUMMY DATA ABOVE ONCE THE BACKEND IS READY
  // const [deliveryRequests, setDeliveryRequests] = useState([]);

  // useEffect(() => {
  //   if (onShift) {
  //     fetch("http://localhost:3001/api/deliveries") //THIS IS A TEMP URL, CHANGE LATER
  //       .then((response) => response.json())
  //       .then((data) => setDeliveryRequests(data))
  //       .catch((error) => console.error("Error fetching deliveries:", error));
  //   } else {
  //     setDeliveryRequests([]); // Clear requests when off shift
  //   }
  // }, [onShift]);


  return (
    <div className="courier-page">
      <Header />

      <div className="courier-body">
        <button 
            className={onShift ? "end-shift-btn" : "available-btn"} 
            onClick={toggleOnOffShift}
          >
            {onShift ? "END SHIFT" : "Available for Work"}
          </button>

        <h2>Delivery Requests</h2>
        <div className="yellow-divider"></div>
        {/* Replace dummyDeliveryRequest with deliveryRequests when ready */}
        {onShift && dummyDeliveryRequest.map((deliveryReq) => (
        <div className="delivery-request" key={deliveryReq.id}>
        <h3 className="delivery-title">{deliveryReq.title}</h3>
        <div className="delivery-content">
          <img 
            src={deliveryReq.imageUrl}
            alt="Delivery" 
            className="delivery-image" 
          />
          <div className="delivery-details">
            <p>Pickup at: {deliveryReq.pickupAddress}</p>
            <p>Dropoff at: {deliveryReq.dropoffAddress}</p>
            <div className="delivery-buttons">
              <button className="accept-btn" onClick={() => setSelectedDelivery(deliveryReq)}>ACCEPT</button>
              <button className="message-btn">MESSAGE BUYER</button>
            </div>
            </div>
          </div>
        </div>
        ))}
        
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
                <p><strong>Pickup Address:</strong></p>
                <p>{selectedDelivery.pickupAddress}</p>
                <button className="details-btn">Details</button>
              </div>
              <button className="start-btn" onClick={() => setSelectedDelivery(null)}>Start Delivery</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default CourierPage;
