import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import "../UserDash.css"

const UserDash = ({ username }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    return (
        <>
          <div className="user-dropdown-container">
            <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
              {username} ▼
            </div>
            {open && (
              <div className="dropdown-menu">
                <Link to="/UserProfile" onClick={() => setOpen(false)}>Profile</Link>
                <Link to="/Chats" onClick={() => setOpen(false)}>Message</Link>
                <Link to="/VendorPage" onClick={() => setOpen(false)}>Vendor</Link>
                <Link to="/CourierPage" onClick={() => setOpen(false)}>Courier</Link>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        </>
    );
};


export default UserDash;
