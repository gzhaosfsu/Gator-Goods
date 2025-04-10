import React from "react"
import { useState, useEffect } from "react"
import "../App.css" // CSS file for styling
import { dummyData } from "../dummyData";

const Categories = ({ setSelectedCategory, setSearchResults, setIsSearching, setSelectedCategoryName}) => {
    // // stores fetched categories
    // const [categories, setCategories] = useState([]); 

    const categoryList = ["Food", "Furniture", "Clothing", "Stationary", "Books", "Electronics", "Other"];
  
    // tracks the selected category from dropdown
    const [selected, setSelected] = useState("");

    const submitCategory = (selectedCategory) => {
      // console.log(selectedCategory);
      // console.log("This is the target value" + selectedCategory);
      if (!selectedCategory) return; // prevents an empty selection
      setSearchResults([]); 
      setIsSearching("selectedCategory"); // sets the search state to selectedCategory
      setSelectedCategoryName(selectedCategory); // sets the selected category name for display
      
      // filters results from dummydata but currently not needed
      // const filteredResults = dummyData.filter(
      //   (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      // );
    
      setSelectedCategory(selectedCategory); // sets the selected category for further processing

    // THIS FETCH CALLS THE BACKEND TO GET CATEGORIES  
    // fetch(`http://localhost:5000/api/category?category=${selectedCategory}`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data.length);
    //     setSelectedCategory(data); 
    // })

      // setSelectedCategory(dummyData); 
      // setSelectedCategory(selectedCategory);
      // console.log("Searching for:", selectedCategory);

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