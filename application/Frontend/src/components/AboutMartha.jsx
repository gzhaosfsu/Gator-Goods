import React from "react"
import Footer from "./Footer"
import portrait from "./images/marthaPortrait.jpeg"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"


const AboutMartha = ({}) => {
  

    return (
        <>
            <div className="App"> 
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>MARTHA MARTIN</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p> <em> Vanilla Javascript | React | HTML | CSS | Java  </em></p>
                            <p>
                                From a young age, I have always been passionate about technology, constantly exploring and learning
                                on my own. As a self-taught learner, I developed a strong foundation in tech, which ultimately led me
                                to pursue a degree in Computer Science at San Francisco State University. My goal is to deepen my knowledge, 
                                refine my skills and use technology to create meaningful solutions. I aspire to find a career that aligns with
                                my values, allowing me to make a positive impact in my community through innovation and problem-solving. 
                            </p>
                        </div>
                        <div className="social-media"> 
                            <a href="https://www.linkedin.com/in/martha-martin-pablo/" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/mmartin440" target="_blank"><img src={github} alt="" /></a>
                            
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
    
export default AboutMartha