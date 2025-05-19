import React, { useState, useEffect } from "react"
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from "./Header"
import FeaturedProducts from "./FeaturedProducts";
import Content from "./Content"
import Footer from "./Footer"





const Homepage = ({dataReturned, isSearching, selectedCategoryName, filters }) => {



    return (
        <>
            <div className='App'>
                <Content dataReturned={dataReturned} selectedCategoryName={selectedCategoryName} isSearching={isSearching} filters={filters}/>
                <Footer />
            </div>  
        </>
    )
}
   
export default Homepage