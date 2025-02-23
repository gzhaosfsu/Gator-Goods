import React from "react"

import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import homePageImg from "./images/homePage.png"


const Homepage = ({}) => {
  

    return (
        <>
            <div className='App'>
                <Header/>
                <Navbar/>
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
                            <Link to="/aboutAnthony" className="about-text">Anthony</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutGarvin" className="about-text">Garvin</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutJace" className="about-text">Jace</Link>
                        </div>
                        <div className="about-card">
                            <Link to="/aboutVansh" className="about-text">Vansh</Link>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>  
        </>
    )
}
   
export default Homepage