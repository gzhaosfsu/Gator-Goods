import Header from './Header';
import image from "./images/imageNA.png"
import {Link } from 'react-router-dom'
import '../UserProfile.css'

const UserProfile = ({ isCourier, handleBecomeCourier }) => {


    return (
        <>
            {/* <Header /> */}
            <div className='user-profile-container'> 
    <div className='left-section'>
        <div className='profile-title'>
            <img src={image} width={80} height={80}/>
            <h2>Username</h2>
        </div>
        <div className='user-info-container'>
            <h2>About</h2>
            <div className='info-name-update'>
                <input type="text" value="First Name"/>
                <input type="text" value="Last Name" />
            </div>
            <div className='user-email-update'>
                <input type="text" value="username12@sfsu.edu"/>
            </div>
        </div>
    </div>

    <div className='button-container'>
        <button className='order-status-btn'>Order Status</button>
        {!isCourier && (
            <button className="become-courier-btn" onClick={handleBecomeCourier}>
                Become a Courier
            </button>
                )}
        {/* <button className='courier-btn'>Become a Courier</button> */}
    </div>
</div>
            
        </>
    )
}


export default UserProfile