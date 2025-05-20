import React, {useContext, useEffect, useState} from 'react';
import UserProfile from "./UserProfile.jsx";
import VendorPage from "./VendorPage.jsx";
import "../RealUserProfile.css";
import Footer from './Footer';
import {UserContext} from '../UserContext';
import {useNavigate} from "react-router-dom";

const RealUserProfile = () => {

  const { user, setUser } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [isCourier, setIsCourier] = useState(false);
    const navigate = useNavigate();

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
              const userData = data[0];
              if (userData?.is_courier !== undefined) {
                  setIsCourier(userData.is_courier);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_courier: true })
          });
      
          if (response.ok) {
            // Directly update the user object
            setUser({ ...user, is_courier: 1 });
          }
        } catch (err) {
          console.error('Failed to promote to courier:', err);
        }
      };

    return (
        <div className="user-dash">

        {/* Top Section (Profile Info) */}
        <div className="profile-section">
            <UserProfile isCourier={isCourier} handleBecomeCourier={handleBecomeCourier}/>
            {/* Order Status and Become a Courier buttons */}
            <div className="button-row">
            </div>
        </div>

        <hr className="divider" />

        {/* Bottom Section (Overview, Stats) */}
        <VendorPage isCourier={isCourier} handleBecomeCourier={handleBecomeCourier}/>

        <Footer />
        </div>
    );
};

export default RealUserProfile;