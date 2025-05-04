import React, {useContext, useEffect, useState} from 'react';
import '../UserListings.css';
import Header from './Header';
import Footer from './Footer';
import CreateListingForm from './CreateListingForm'
import {UserContext} from '../UserContext';
import {useNavigate} from "react-router-dom";

import ReturnProfile from "./ReturnProfile";


const UserListings = () => {

  const {user} = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return; // Wait for user to load
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {

    if (!user) return;

    fetch(`/api/listing/active/${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        const cleanedData = data.map(item => ({
          listing_id: item.listing_id,
          title: item.title,
          price: parseFloat(item.price),
          listing_date: new Date(item.listing_date),
          thumbnail: item.thumbnail
        }));
        console.log('Heres the user id: ', user.user_id);
        console.log("Rendering item:", cleanedData);
        setListings(cleanedData);
    })
      .catch(err => console.error('Failed to load listings:', err));
  }, [user]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  // Delete button 
  const handleDelete = async (listing_id) => {
    try {
      console.log("Attempting to delete listing with ID:", listing_id);
      const response = await fetch(`/api/listing/${listing_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setListings(prev => prev.filter(item => item.listing_id !== Number(listing_id)));
      } else {
        console.error("Delete failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  // Update button
  const handleSold = (listing_id) => {
    console.log("Attempting to mark listing as sold:", listing_id);
    fetch(`/api/listing/${listing_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ availability: 'Out of Stock', listing_status: 'Delisted' })
    })
    .then(res => {
      if (res.ok) {
        setListings(prev =>
          prev.filter(item => item.listing_id !== listing_id)
        );
      } else {
        console.error("Failed to mark listing as sold.");
      }
    })
    .catch(err => console.error("Sold error:", err));
  };

  return (
    
    <div className="listings-page">
      <Header />
      <ReturnProfile />
      <div className="listing-formatting">
        <h1 className="title">Active Listings</h1>
        {/* <div className="button-wrapper"> */}
          <div className="create-button button-wrapper" onClick={() => setShowForm(true)}>Create Listing <span className="plus">+</span></div>

          {showForm && (<CreateListingForm onClose={() => setShowForm(false)} />
          )}
        {/* </div> */}
        <br /> <br /> <br /> <br />
        <div className="listings-container">
          {listings.map((item, index) => (
            <div className="listing-card" key={index}>
              {/* <div className="listing-img" /> */}
              <img src={item.thumbnail} width="300" height="200" alt="Thumbnail" />
              <div className="listing-info">
                <strong>{item.title || "No Title"}</strong>
                <br /> <br /> <br />
                <font color="#828282">
                  <div>${parseFloat(item.price.toFixed(2))} &emsp;&emsp;&emsp;&emsp; Listed on: {new Date(item.listing_date).toLocaleDateString()}</div>
                </font>
                <div className="buttons">
                  <button className="delete-btn" onClick={() => handleDelete(item.listing_id)}>Delete</button>
                  <button className="sold-btn" onClick={() => handleSold(item.listing_id)}>Mark as Sold</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserListings;