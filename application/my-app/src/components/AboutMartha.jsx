import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import portrait from "./images/portrait.png"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"


const AboutMartha = ({}) => {
  

    return (
        <>
            <div className="App"> 
                <Header/>
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>MARTHA MARTIN</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className="social-media"> 
                            <a href="https://www.linkedin.com/in/martha-martin-pablo/" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/mmartin440" target="_blank"><img src={github} alt="" /></a>
                            
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
    
export default AboutMartha