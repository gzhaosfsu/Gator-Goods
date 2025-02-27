import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import portrait from "./images/jaceportrait.png"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"

const AboutJace= ({}) => {
  

    return (
        <>
        <div className="App"> 
                <Header/>
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>JAIDEEN-JACE BONDOC</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p>
                                Jaideen-Jace is a student of SFSU who is currently studying for a degree in Computer Science. 
                                Jaideen-Jace has been learning computer science for the past four years, brushing up on her knowledge of Java, Python, and C++. Originally an
                                English major, she sought out this education with a spark of interest that gradually grew every year. Aside from Computer Science, she also has
                                a minor degree in-the-works for Video Game Studies. She is looking forward to the excitement of learning and working with her teammates on a 
                                new project together. For this project, Jaideen-Jace had been tasked with being one of the two front-end leads.</p>
                        </div>
                        <div className="social-media"> 
                            <a href="https://www.linkedin.com/in/martha-martin-pablo/" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/JaceB10" target="_blank"><img src={github} alt="" /></a>
                            
                        </div>
                    </div>
                    <div className="about-img" > 
                        <img src={portrait} alt="" style={{width:"100%", height: "95%"}}/>
                    </div>
                    
                </div>
                <Footer/>
            </div>
        </>
    )
}
    
export default AboutJace