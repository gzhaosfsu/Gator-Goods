import React from "react"
import { useState, useEffect } from "react"
import "../App.css" // CSS file for styling
import { dummyData } from "../dummyData";

const Categories = ({ setSelectedCategory, setSearchResults, setIsSearching}) => {
    // // stores fetched categories
    // const [categories, setCategories] = useState([]); 

    const categoryList = ["Food", "Furniture", "Clothing", "Stationary", "Books", "Electronics", "other"];
  
    // tracks the selected category from dropdown
    const [selected, setSelected] = useState("");

    const submitCategory = (selectedCategory) => {
      if (!selectedCategory) return; // prevents an empty selection
      setSearchResults([]); 
      setIsSearching("selectedCategory"); 
  
    fetch('http://localhost:3306/api/category?=${selectedCategory}')
    .then((response) => response.json())
    .then((data) => {
        setSearchResults(data); 
    })
      // setSelectedCategory(dummyData); 
      // setSelectedCategory(selectedCategory);
      console.log("Searching for:", selectedCategory);
      
      // THIS FETCH CALLS THE BACKEND TO GET PRODUCTS BASED ON SELECTED CATEGORY
      // fetch(`http://localhost:5000/api/category/${selectedCategory}`)
      //   .then((response) => response.json())
      //   .then((data) => console.log("Products:", data))
      //   .catch((error) => console.error("Error fetching products:", error));
    };

      return (
        <div className="categories-container">
    
          <select
            id="category-dropdown"
            value={selected}
            onChange={(e) => {setSelected(e.target.value); // updates the selected state when the dropdown value changes
              submitCategory(e.target.value); // triggers search on selection
            }} 
            className="categories-dropdown"
          >
            <option value=""> -- Categories -- </option>
            {categoryList.map((category, index) => ( // maps over the categories array to display each category in the dropdown
              <option key={index} value={category}>  {/* option elements for each category */}
                {category}
              </option>
            ))}
          </select>
        </div>
      );
}

export default Categories