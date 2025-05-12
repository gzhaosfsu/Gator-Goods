import React, {useContext, useEffect, useState} from 'react';
import UserProfile from "./UserProfile.jsx";
import VendorPage from "./VendorPage.jsx";
import "../RealUserProfile.css";
import Header from './Header';
import Footer from './Footer';
import {UserContext} from '../UserContext';
import {useNavigate} from "react-router-dom";

const RealUserProfile = () => {

    const {user} = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [isCourier, setIsCourier] = useState(user?.is_courier ?? false);
    
    const navigate = useNavigate();

    useEffect(() => {
      if (user && typeof user.is_courier !== 'undefined' && typeof isCourier === 'undefined') {
        setIsCourier(user.is_courier);
      }
    }, [user]);

      useEffect(() => {
        const fetchUser = async () => {
          if (!user?.user_id) return;
      
          try {
            const response = await fetch(`/api/user/${user.user_id}`);
            
            if (!response.ok) {
              console.error("Fetch failed with status:", response.status);
              return;
            }
      
            const data = await response.json();
      
            // Only update if the field exists
            if (typeof data.is_courier !== 'undefined') {
              setIsCourier(data.is_courier);
            } else {
              console.warn("is_courier field missing in fetched data", data);
            }
      
          } catch (err) {
            console.error("Failed to fetch user courier status:", err);
          }
        };
      
        fetchUser();
      }, [user?.user_id]);
      

    const handleBecomeCourier = async () => {
        try {
          const response = await fetch(`/api/user/${user.user_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isCourier: true
            })
          });

          console.log('Heres the user id: ', user.user_id);
      
          if (response.ok) {
            setIsCourier(true); // Update frontend state
          } else {
            const text = await response.text();
            console.error('Failed to update user. Response:', text);
          }
        } catch (error) {
          console.error('Error in PUT request:', error);
        }
      };

      console.log('User:', user);
      console.log('isCourier:', isCourier);

    return (
        <div className="user-dash">
        <Header />

        {/* Top Section (Profile Info) */}
        <div className="profile-section">
            <UserProfile isCourier={isCourier} handleBecomeCourier={handleBecomeCourier}/>
            {/* Order Status and Become a Courier buttons */}
            <div className="button-row">
                {/* <button className="order-status-btn">Order Status</button> */}
                {/* Conditionally render this */}

                    {/* // <button className="courier-dashboard-btn">
                    // Courier Dashboard
                    // </button>
            } */}
                {/* <button className="become-courier-btn">Become a Courier</button> */}
            </div>
        </div>

        <hr className="divider" />

        {/* Create Listing Button */}
        {/* <div className="center">
            <button className="create-listing-btn" onClick={() => setShowForm(true)}>
            Create Listing <span className="plus">+</span>
            </button>

            {showForm && <CreateListingForm onClose={() => setShowForm(false)} />}
        </div> */}

        {/* Bottom Section (Overview, Stats) */}
        <VendorPage isCourier={isCourier} handleBecomeCourier={handleBecomeCourier}/>

        <Footer />
        </div>
    );
};

export default RealUserProfile;