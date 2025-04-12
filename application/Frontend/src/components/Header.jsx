import React from "react"
import SearchBar from "./SearchBar"
import Categories from "./Categories"
import logo from "./images/LogoGG.png"
import {Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { dummyData } from "../dummyData";


const Header = ({ setDataReturned, setSelectedCategoryName, setIsSearching}) => {

    const [searchResults, setSearchResults] = useState (""); // holds the search bar text 
    const [selectedCategory, setSelectedCategory] = useState("");// holds the selected category


    
    // When user clicks on logo it resets the entire values of search bar and categories
    const featuredItems = ()=> {
        setSearchResults(""); 
        setSelectedCategory("");
        setSelectedCategoryName("");
        setDataReturned([]); 
        setIsSearching(false);
    }    
    return (
       <>
        <div className="header-container">
            <div className="header">
                <div className="inner-header" > 
                    <div className="logo">
                        <Link onClick={featuredItems} to="/" >
                            <img src={logo} alt="Gator Goods logo" style={{width:"100%", height:"100%"}} />
                        </Link>
                    </div>
                    <div className="header-box">
                        <div className="filter-container">
                            <Categories setSelectedCategory={setSelectedCategory} setSelectedCategoryName={setSelectedCategoryName} />
                            <SearchBar setSearchResults={setSearchResults} selectedCategory={selectedCategory} setDataReturned={setDataReturned} setIsSearching={setIsSearching} setSelectedCategoryName={setSelectedCategoryName}/>
                        </div>
                        <div className="logIn-container">
                            <button className="btn-logIn">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
    )
}

export default Header