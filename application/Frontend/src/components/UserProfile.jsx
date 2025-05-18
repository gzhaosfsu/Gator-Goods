import image from "./images/imageNA.png";
import { Link, useNavigate } from 'react-router-dom';
import '../UserProfile.css';
import { UserContext } from '../UserContext';
import { useContext, useEffect } from "react";

const UserProfile = ({ isCourier, handleBecomeCourier }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    console.log("are they a courier in userprofile: ", isCourier);

    return (
        <>
            <div className='user-profile-container'>
                <div className='left-section'>
                    <div className='profile-title'>
                        <img src={image} width={80} height={80} />
                        <h2>{user?.username || "Username"}</h2>
                    </div>

                    <div className='user-info-container'>
                        <h2>About</h2>
                        <div className='info-name-update'>
                            <input type="text" value={user?.first_name || "First Name"} readOnly />
                            <input type="text" value={user?.last_name || "Last Name"} readOnly />
                        </div>
                        <div className='user-email-update'>
                            <input type="text" value={user?.sfsu_email || "email"} readOnly />
                        </div>
                    </div>
                </div>

                <div className='right-section'>
                    <div className='button-container'>
                        <button
                            className="order-status-btn"
                            onClick={() => navigate('/OrderStatus')}>
                            Order Status
                        </button>
                        {!isCourier  && (
                            <button className="become-courier-btn" onClick={handleBecomeCourier}>
                                Become a Courier
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;