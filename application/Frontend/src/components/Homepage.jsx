import React, { useState, useEffect } from "react"
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from "./Header"
import FeaturedProducts from "./FeaturedProducts";
import Content from "./Content"
import Footer from "./Footer"
import homePageImg from "./images/homePage.png"
//import { dummyData } from "../dummyData";




const Homepage = ({}) => {

    // I dont want homepage dealing with alot of logic
  
    const [isSearching, setIsSearching] = useState(false); // deals with toggeling the display body if we using Category or Search bar or Both or none 
    const [dataReturned, setDataReturned] = useState([]); // This is returns an array of data from fetch request that Header.jsx deals with

     

    //adding for Number Display 4/9/25
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    //adding for SearchBar usage 4/9/25
    const [searchWord, setSearchWord] = useState(""); 

    const [filters, setFilters] = useState({
        condition: "",
        priceSort: "",
        datePosted: "",
        minDiscount: "",
        minRating: "",
    })
    return (
        <>
            <div className='App'>
                <Header  setSelectedCategoryName={setSelectedCategoryName} setDataReturned={setDataReturned} setIsSearching={setIsSearching} isSearching={isSearching} filters={filters} setFilters={setFilters}/>
                <Content dataReturned={dataReturned} selectedCategoryName={selectedCategoryName} isSearching={isSearching} filters={filters}/>
                <Footer />
            </div>  
        </>
    )
}
   
export default Homepage