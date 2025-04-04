import React from "react"

import { useState, useEffect } from "react"
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from "./Header"
import FeaturedProducts from "./FeaturedProducts";
import Content from "./Content"
import Footer from "./Footer"
import homePageImg from "./images/homePage.png"
import { dummyData } from "../dummyData";




const Homepage = ({}) => {
  
    // const [filteredData, setFilteredData] = useState([]); 
    const [searchResults, setSearchResults] = useState ([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isSearching, setIsSearching] = useState(""); 

    // console.log("Jace clicked option "  + selectedCategory); 
    const productsTitle  = searchResults.map(i => i.title); 
    console.log("MARTHA return array : " + productsTitle); 

    

    // useEffect(() => {
    //     console.log(isSearching); 
    //     setIsSearching("SearchBarResult"); 

    // },[searchResults]); 

    // useEffect(() => {
    //     console.log(isSearching); 
    //     setIsSearching("selectedCategory"); 

    // },[selectedCategory]); 


    // const featuredProducts = dummyData.filter(product => product.isFeatured);
    // console.log("Featured Products:", featuredProducts);

    return (
        <>
            <div className='App'>
                <Header setSearchResults={setSearchResults} setSelectedCategory={setSelectedCategory} setIsSearching={setIsSearching}/>
                <Content searchResults={searchResults} selectedCategory={selectedCategory} isSearching={isSearching} setIsSearching={setIsSearching}/>
                <Footer />
            </div>  
        </>
    )
}
   
export default Homepage