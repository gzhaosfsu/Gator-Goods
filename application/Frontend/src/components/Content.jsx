import React from "react"
import {Link } from 'react-router-dom'
import homePageImg from "./images/homePage.png"


const Content = ({searchResults}) => {
  

    return (
        <>
        <img className="homepage-img" src={homePageImg} />
        {
            (searchResults.length === 0 ? "Old products" : " We have products")
        }
        
        </>
    )

}
export default Content