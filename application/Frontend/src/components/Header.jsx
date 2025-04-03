import React from "react"
import SearchBar from "./SearchBar"
import Categories from "./Categories"
import logo from "./images/LogoGG.png"
import {Link } from 'react-router-dom'



const Header = ({setSearchResults, setSelectedCategory}) => {
    
    return (
       <>
        <div className="header-container">
            <div className="header">
                <div className="inner-header" > 
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Gator Goods logo" style={{width:"100%", height:"100%"}} />
                        </Link>
                    </div>
                    <div className="header-box">
                        <div className="filter-container">
                            <Categories setSelectedCategory={setSelectedCategory} />
                            <SearchBar setSearchResults={setSearchResults} selectedCategory={selectedCategory} />
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