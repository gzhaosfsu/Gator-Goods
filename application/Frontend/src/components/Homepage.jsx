import React from "react"

import { useState, useEffect } from "react"
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import homePageImg from "./images/homePage.png"



const Homepage = ({}) => {
  
    // const [filteredData, setFilteredData] = useState([]); 
    const [searchResults, setSearchResults] = useState ([]); 
    

    return (
        <>
            <div className='App'>
                <Header setSearchResults={setSearchResults}/>
                <Content searchResults={searchResults}/>
                <Footer/>
            </div>  
        </>
    )
}
   
export default Homepage