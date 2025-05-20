import React, { useEffect, useState, useContext } from 'react';
import '../UserListings.css';
import Footer from './Footer';
import AcceptDeliveryForm from './AcceptDelivery';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const VendorDeliveryRequest = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const navigate = useNavigate();

  const handleAcceptClick = (request) => {
    setSelectedRequest(request);
    setShowAcceptModal(true);
  };

  const handleAcceptSubmit = async (requestId, payload) => {
    try {
      const res = await fetch(`/api/delivery_instruction/request/accept/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Delivery accepted!");

        setRequests(prev => prev.filter(req => req.delivery_request_id !== requestId));
        setShowAcceptModal(false);
      }
    } catch (err) {
      console.error("Error submitting delivery instruction:", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    console.log("Fetching delivery requests for vendor ID:", user.user_id);

    fetch(`/api/delivery_request/vendor/${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        const cleanedData = data.map(item => ({
            delivery_request_id: item.delivery_request_id,
            buyer_id: item.buyer_id,
            vendor_id: item.vendor_id,
            status: item.status,
            dropoff: item.dropoff,
            buyer_special_request: item.buyer_special_request,
            listing_id: item.listing_id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            username: item.username
        }));
        console.log("Rendering item:", cleanedData);
        setRequests(cleanedData);
    })
      .catch(err => console.error("Failed to fetch requests:", err));
  }, [user, navigate]);

  console.log("heres the requests: ", requests);


  const handleAccept = async (requestId, payload) => {
    try {
      const res = await fetch(`/api/delivery_instruction/request/accept/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Delivery accepted!");
        setShowAcceptModal(false);
      }
    } catch (err) {
      console.error("Error submitting delivery instruction:", err);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const res = await fetch(`/api/delivery_request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Denied'})
      })
      if (res.ok) {
        setRequests(prev => prev.filter(req => req.delivery_request_id !== requestId));
      }
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <div className="listings-page">
      <button
        className="os-back-btn"
        onClick={() => navigate('/RealUserProfile')}
      >
        ← Back to Profile
      </button>

      <div className="listing-formatting">
        <h1 className="title">Delivery Requests</h1>
        <div className="listings-container">
        {requests.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#888", textAlign: "center", marginTop: "2rem" }}>
            No more delivery requests at this time. Please check again later.
          </p>
        ) : (
          requests.map((item, index) => (
            <div className="listing-card" key={index}>
              <img src={item.thumbnail} width="300" height="200" alt="Thumbnail" />
              <div className="listing-info">
                &emsp;
                <strong>{item.title || "No Title"}</strong>
                <br /> <br />
                <p className="delivery-info">
                  ${item.price} &emsp; &emsp;
                  Buyer: {item.username}
                </p>
                <br />
                <div className="buttons">
                  &emsp;
                  <button className="accept-btn" onClick={() => handleAcceptClick(item)}>Accept</button>
                  <button className="decline-btn" onClick={() => handleDecline(item.delivery_request_id)}>Decline</button>
                </div>
              </div>
            </div>
          ))
        )}

        </div>
      </div>
      {showAcceptModal && selectedRequest && (
      <AcceptDeliveryForm
        request={selectedRequest}
        onClose={() => setShowAcceptModal(false)}
        onSubmit={handleAcceptSubmit}
      />
    )}
      <Footer />
    </div>
  );
};


export default VendorDeliveryRequest