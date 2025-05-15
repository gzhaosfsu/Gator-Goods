import React from "react"
import SearchBar from "./SearchBar"
import Categories from "./Categories"
import logo from "./images/LogoGG.png"
import {Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { dummyData } from "../dummyData";
import Filters from "./Filters"
import UserDash from "./UserDash";
import {UserContext} from "../UserContext";
import {useContext} from "react";

const Header = ({ setSelectedCategoryName, setDataReturned, setIsSearching, isSearching, filters, setFilters}) => {

    const [searchResults, setSearchResults] = useState (""); // holds the search bar text 
    const [selectedCategory, setSelectedCategory] = useState("");// holds the selected category
    const {user} = useContext(UserContext);


    
    // When user clicks on logo it resets the entire values of search bar and categories
    const featuredItems = ()=> {
        setSearchResults(""); 
        setSelectedCategory("");
        setSelectedCategoryName("");
        setDataReturned([]); 
        setIsSearching(false);
        setFilters({ condition: "", priceSort: "", datePosted: "", minDiscount: "", minRating: "" });
    }  
    console.log("🔍 Filters import is:", Filters)
  
    return (
       <>
           <div className="header-container">
               <div className="header">
                   <div className="inner-header">
                       <div className="logo">
                           <Link onClick={featuredItems} to="/">
                               <img src={logo} alt="Gator Goods logo" style={{width: "100%", height: "100%"}}/>
                           </Link>
                       </div>
                       <div className="header-box">
                           <div className="filter-container">
                               <Categories setSelectedCategory={setSelectedCategory}
                                           setSelectedCategoryName={setSelectedCategoryName}/>
                               <SearchBar setSearchResults={setSearchResults} selectedCategory={selectedCategory}
                                          setDataReturned={setDataReturned} setIsSearching={setIsSearching}
                                          setSelectedCategoryName={setSelectedCategoryName}/>
                           </div>
                    </div>
                </div>
            </div>
            <div className="logIn-container">
                {user ? (
                    <UserDash username={user.username}/>
                ) : (
                    <Link to="/login">
                        <button className="btn-logIn">Login</button>
                    </Link>
                )}
            </div>
        </div>
           {isSearching && (
               <div className="filters-row">
                   <Filters
                       filters={filters}
                       setFilters={newFilters => {
                           setFilters(newFilters)
                           setIsSearching(true)    // keep us in “search mode”
                       }}
                   />
               </div>
                    )}    
       </>
    )
}

export default Header