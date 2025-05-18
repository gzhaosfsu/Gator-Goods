import React, {useContext} from 'react';
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../VendorPage.css";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MessageIcon from '@mui/icons-material/Message';
import {UserContext} from "../UserContext";
import TwoStepListingModal from './TwoStepListingModal';

const VendorPage = ({ isCourier, handleBecomeCourier }) => {

    const [showForm, setShowForm] = useState(false);
    const {user} = useContext(UserContext);
    const [rating, setRating] = useState(null); // placeholder until rating is passed by context
    const navigate = useNavigate();
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
            console.log("Fetched user data:", data);
            setRating(parseFloat(data[0]?.rating) || 1);
          })
          .catch(err => console.error('Failed to load rating:', err));
      }, [user]);

      

      

    // const [onShift, setOnShift] = React.useState(false);
    // const toggleOnOffShift = () => {
    //     setOnShift(prev => !prev);
    //   };

    console.log("are they a courier: ", isCourier);

    return (
        <div className="vendorPage">
          {/* <Header /> */}
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
                        <Card title="Ready for delivery" icon={<LocalShippingIcon style={{ fontSize: 80, color: 'gray' }}/>} link="/vendorDeliveryRequest"/>
                        {isCourier === true && (
                            <Card title="Courier Dashboard" style={{ backgroundColor: "#3A8659", color: 'white' }} link="/courierPage"/>
                        )}
                    </div>
                </div>
            </section>
            {/* Stats */}
            <section className="section">
                <div className="section-inner">
                    <h2 className="section-title stats-title">Stats</h2>
                    <div className="stat-grid">
                        <StatCard label="Sold Items" value="5" />
                        <StatCard label="Rating" value={rating !== null ? rating.toFixed(1) : "Loading..." | 500} />

                    </div>
                </div>
            </section>
        </div>
        
        {/* <Footer /> */}
        </div>
    );
};

const Card = ({ title, icon, link, className = "", style = {} }) => (
    <Link to={link || "#"} className="card">
      <div className={`card ${className}`} style={style}>
        <span className="card-title">{title}</span>
        {icon}
      </div>
    </Link>
  );

    // const Card = ({ title, icon }) => (
    //     <div className="card">
    //       <span className="card-title">{title}</span>
    //       <div className="card-icon">{icon}</div>
    //     </div>
    // );
    
const StatCard = ({ label, value }) => (
    <div className="stat-card">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
    </div>
);




export default VendorPage;