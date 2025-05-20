import React, {useContext} from 'react';
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../VendorPage.css";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MessageIcon from '@mui/icons-material/Message';
import {UserContext} from "../UserContext";
import TwoStepListingModal from './TwoStepListingModal';
import { useLocation } from 'react-router-dom';

const VendorPage = ({ isCourier, handleBecomeCourier }) => {

    const [showForm, setShowForm] = useState(false);
    const {user} = useContext(UserContext);
    const [rating, setRating] = useState(null); 
    const [soldCount, setSoldCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!user) return;
      

        fetch(`/api/user/${user.user_id}`)
          .then(res => res.json())
          .then(data => {
            setRating(parseFloat(data[0]?.rating) || 1);
          })
          .catch(err => console.error('Failed to load rating:', err));
      }, [user]);

      useEffect(() => {
        if (!user) return;
      
        fetch(`/api/listing/vendor/sold/${user.user_id}`)
        .then(res => res.json())
        .then(data => {
          setSoldCount(data.count ?? 0);
        })
          .catch(err => {
            console.error("Failed to fetch sold items:", err);
            setSoldCount(0);
          });
      }, [user, location]);

    return (
        <div className="vendorPage">
          <div className="vendor-formatting">
            {/* Create Listing */}
            <div className="center">
                <button className="create-button" onClick={() => setShowForm(true)}>Create Listing <span className="plus">+</span></button>

                {showForm && (<TwoStepListingModal onClose={() => setShowForm(false)} />)}
            </div>
            {/* Overview */}
            <section className="section">
                <div className="section-inner">
                    <h2 className="section-title overview-title">Overview</h2>
                    <div className="card-grid">
                        <Card title="Messages" icon={<MessageIcon style={{ fontSize: 80, color: 'gray' }} />} link="/chats"/>
                        <Card title="Active Listings" icon={<ChecklistIcon style={{ fontSize: 80, color: 'gray' }}/>} link="/userListings" />
                        <Card title="Delivery Requests" icon={<LocalShippingIcon style={{ fontSize: 80, color: 'gray' }}/>} link="/vendorDeliveryRequest"/>
                        {user?.is_courier === true && (
                            <Card
                                title="Courier Dashboard"
                                link="/courierPage"
                                className="courier-card"
                            />
                        )}
                    </div>
                </div>
            </section>
            {/* Stats */}
            <section className="section">
                <div className="section-inner">
                    <h2 className="section-title stats-title">Stats</h2>
                    <div className="stat-grid">
                        <StatCard label="Sold Items" value={soldCount} />
                        <StatCard label="Rating" value={rating !== null ? rating.toFixed(1) : "Loading..." | 500} />

                    </div>
                </div>
            </section>
        </div>
        </div>
    );
};

const Card = ({ title, icon, link, className = "" }) => (
    <Link to={link || "#"} className="card-link">
      <div className={`card ${className}`}>
        <span className="card-title">{title}</span>
        {icon}
      </div>
    </Link>
  );

const StatCard = ({ label, value }) => (
    <div className="stat-card">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
    </div>
);




export default VendorPage;