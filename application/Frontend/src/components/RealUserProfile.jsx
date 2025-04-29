import React, { useState } from 'react';
import UserProfile from "./UserProfile.jsx";
import VendorPage from "./VendorPage.jsx";
import "../RealUserProfile.css";
import Header from './Header';
import Footer from './Footer';

const RealUserProfile = () => {
    const [showForm, setShowForm] = useState(false);
    const [isCourier, setIsCourier] = useState(false);

    const handleBecomeCourier = () => {
        // later you can call API to update backend too
        setIsCourier(true);
      };

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