import React from "react"
import {Link } from 'react-router-dom'
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import homePageImg from "./images/homepageImg.png"


const AboutTeam= ({}) => {
  

    return (
        <>
            <div className='App'>
                <img className="homepage-img" src={homePageImg} />
                <div className='body-container'>
                    <div className='team-heading-container'>
                        <div className='team-heading'>MEET THE TEAM</div>
                        <div className='highlight'></div>
                    </div>
                    <div className="about-card-container">
                        <div className="about-card">
                            <Link to="/aboutMartha" className="about-text">Martha Martin</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutAnthony" className="about-text">Anthony Mingus</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutGarvin" className="about-text">Garvin Zhao</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutJace" className="about-text">Jaideen-Jace Bondoc</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutVansh" className="about-text">Vansh Virani</Link>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>  
        </>
    )

}    
export default AboutTeam