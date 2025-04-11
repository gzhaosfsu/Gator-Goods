import React from "react"
import { useState, useEffect } from "react"
import "../App.css" // CSS file for styling
import { dummyData } from "../dummyData";

const Categories = ({ setSelectedCategory, setSelectedCategoryName}) => {

    // Type of categories user can choose 
    const categoryList = ["Food", "Furniture", "Clothing", "Stationary", "Books", "Electronics", "Other"];
  
    // tracks the selected category from dropdown
    const [selected, setSelected] = useState("");

    const submitCategory = (selectedCategory) => {
      // has to reset the selected category 
      setSelectedCategory("");

     
      if (!selectedCategory) return; // prevents an empty selection

      //This stores a string of what the user selected from the categoryList
      setSelectedCategoryName(selectedCategory);
      setSelectedCategory(selectedCategory);


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