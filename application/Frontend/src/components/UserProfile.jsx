import Header from './Header';
import image from "./images/imageNA.png"
import {Link } from 'react-router-dom'
import '../UserProfile.css'

const UserProfile = () => {


    return (
        <>
            <Header />
            <div className='user-profile-container'> 
                <div className='profile-title' >
                    <img src={image} width={80} height={80}/>
                    <h2>Username</h2>
                </div>
                <div className='user-info-container' >
                    <h1>About</h1>
                    <div className='info-name-update' >
                        <input type="text"  value="First Name"/>
                        <input type="text" value="Last Name" />
                    </div>
                    <div className='user-email-update' >
                        <input type="text"  value="username12@sfsu.edu"/>
                    </div>
                    
                </div>
                <div className='extension-container' >
                    <div className='deleiver-extension'>
                        <h4>Items Being Delivered</h4>
                    </div>
                    <div className='chat-extension' >
                        <Link to="/chats" > <h4>Message/Chats</h4> </Link>
                        
                    </div>
                </div>
            </div>
            
        </>
    )
}


export default UserProfile