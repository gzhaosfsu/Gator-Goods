import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import portrait from "./images/VanshPortrait.png"
import linkedin from "./images/linkedin1.png"
import github from "./images/github1.png"

const AboutVansh= ({}) => {
  

    return (
        <>
        <div className="App"> 
                <Header/>
                <div className="about-container">
                    <div className="about-info">
                        <div className='team-heading-container'>
                            <div className='team-heading'>VANSH VIRANI</div>
                            <div className='highlight-2'></div>
                        </div>
                        <div className="about-description">
                            <p>
                            Hey there!
                            Myself Vansh Virani, I am a Senior in Computer Science.
                            I’m a big fan of cars—everything from classic muscle cars to modern sports cars. 
                            I love the feeling of being behind the wheel and listening to the engine roar. 
                            Most days, you’ll find me checking out new car models, talking shop with friends, and learning all I can about what makes each car unique. 
                            When I’m not driving or dreaming about my next ride, I’m usually hanging out with fellow car enthusiasts, sharing tips and swapping stories. 
                            Life is better when it’s spent in the fast lane.</p>
                        </div>
                        <div className="social-media"> 
                            <a href="www.linkedin.com/in/vansh-virani-10551a22a" target="_blank"><img src={linkedin} alt="" /></a>
                            <a href="https://github.com/vvirani1908" target="_blank"><img src={github} alt="" /></a>
                            
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
    
export default AboutVansh