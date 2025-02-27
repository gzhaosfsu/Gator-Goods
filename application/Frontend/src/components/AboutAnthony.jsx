import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import portrait from "./images/silhoutte.png"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"

const AboutAnthony= ({}) => {
  

    return (
        <>
        <div className="App"> 
                <Header/>
                <h1></h1>
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>ANTHONY MINGUS</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p>
                            Software Engineering Student | Experienced in C++, SQL, and Java <br></br><br></br>

                            I am a passionate software developer with extensive experience in C++ and SQL, as well as Java, and have been programming since 2018. Over the years, I have developed a strong foundation in database design, algorithms, and system architecture, allowing me to build efficient and scalable applications.
                            Currently, I am expanding my knowledge in software engineering principles, aiming to enhance my ability to design, develop, and maintain high-quality software systems. <br></br>

                            I am always eager to tackle complex problems, optimize performance, and explore new technologies. Looking forward to collaborating with peers and applying my skills to real-world projects.</p>
                        </div>
                        <div className="social-media"> 
                            <a href="https://www.linkedin.com/in/martha-martin-pablo/" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/AnthonyMingus" target="_blank"><img src={github} alt="" /></a>
                            
                        </div>
                    </div>
                    <div className="about-img" > 
                        <img src={portrait} alt="" style={{ width: "800px", height: "800px" }}/>
                    </div>
                    
                </div>
                <Footer/>
            </div>
        </>
    )
}
    
export default AboutAnthony