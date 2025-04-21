import React from 'react';
import { useState, useEffect } from "react";
import "../VendorPage.css";
import Header from './Header';
import Footer from './Footer';
import CreateListingForm from './CreateListingForm';

const VendorPage = () => {

    const [showForm, setShowForm] = useState(false);

    // const [onShift, setOnShift] = React.useState(false);
    // const toggleOnOffShift = () => {
    //     setOnShift(prev => !prev);
    //   };

    return (
        <div className="vendorPage">
        <Header />
        {/* Create Listing */}
        <div className="center">
            <button className="create-button" onClick={() => setShowForm(true)}>Create Listing <span className="plus">+</span></button>

            {showForm && (<CreateListingForm onClose={() => setShowForm(false)} />
      )}
        </div>
        {/* Overview */}
        <section className="section">
            <div className="section-inner">
                <h2 className="section-title overview-title">Overview</h2>
                <div className="card-grid">
                    <Card title="Messages" icon="/icons/message.svg" />
                    <Card title="Active Listings" icon="/icons/box.svg" />
                    <Card title="Ready for delivery" icon="/icons/delivery.svg" />
                </div>
            </div>
        </section>
        {/* Stats */}
        <section className="section">
            <div className="section-inner">
                <h2 className="section-title stats-title">Stats</h2>
                <div className="stat-grid">
                    <StatCard label="Sold Items" value="5" />
                    <StatCard label="Rating" value="5/5" />
                </div>
            </div>
        </section>

        
        <Footer />
        </div>
    );
};

    const Card = ({ title, icon }) => (
        <div className="card">
          <span className="card-title">{title}</span>
          <img src={icon} alt={title} className="card-icon" />
        </div>
    );
      
    const StatCard = ({ label, value }) => (
        <div className="stat-card">
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
        </div>
    );




export default VendorPage;