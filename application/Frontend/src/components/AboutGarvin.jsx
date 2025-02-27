import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import portrait from "./images/portrait.png"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"

const AboutGarvin= ({}) => {
  

    return (
        <>
        <div className="App"> 
                <Header/>
                <h1>Hola</h1>
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>Garvin Zhao</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p>
                                Hi everyone my name is Garvin Zhao and I will be your Database Manager as well as all associated roles
                                with our server side operations for the most part. I'm a senior in Computer Science. I hope you all enjoy our services and that it
                                made your life as a student/member in SFSU a bit more convenient.
                            </p>
                        </div>
                        <div className="social-media"> 
                            <a href="https://www.linkedin.com/in/garvin-zhao-2a4106305" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/gzhaosfsu" target="_blank"><img src={github} alt="" /></a>
                            
                        </div>
                    </div>
                    <div className="about-img" > 
                        <img src={portrait} alt="" />
                    </div>
                    
                </div>
                <Footer/>
            </div>
        </>
    )
}
    
export default AboutGarvin