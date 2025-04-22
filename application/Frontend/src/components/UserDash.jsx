import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDropdown = ({ username }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Or whatever auth you're using
        navigate('/');
    };

    return (
        <>
            <style>
                {`
          .user-dropdown-container {
            position: relative;
            color: white;
            font-weight: 600;
            cursor: pointer;
            user-select: none;
          }

          .dropdown-toggle {
            padding: 0.5rem 1rem;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            color: black;
            border-radius: 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            min-width: 150px;
            padding: 0.5rem 0;
            z-index: 1000;
          }

          .dropdown-menu a,
          .dropdown-menu button {
            padding: 0.5rem 1rem;
            text-align: left;
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            color: black;
            font-size: 14px;
          }

          .dropdown-menu a:hover,
          .dropdown-menu button:hover {
            background: #f0f0f0;
          }
        `}
            </style>

            <div className="user-dropdown-container">
                <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
                    {username} ▼
                </div>
                {open && (
                    <div className="dropdown-menu">
                        <Link to="/">Profile</Link>
                        <Link to="/chats">Message</Link>
                        <Link to="/">Vendor</Link>
                        <Link to="/">Courier</Link>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDropdown;
