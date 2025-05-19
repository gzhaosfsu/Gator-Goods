
import '../footer.css'
import {Link } from 'react-router-dom'
const Footer = ({}) => {
  

    return (
        <>
            <div className="footer-container">
                <div className="footer-text"> ©2025 Gator Goods | All right reserved | </div>
                <div>
                    <Link to="/aboutTeam"> About Us</Link>
                </div>
            </div> 
        </>
    )
}

export default Footer