import React from "react"
import { useState, useEffect } from "react"
import "../App.css" // CSS file for styling

const Categories = ({ setSelectedCategory }) => {
    // stores fetched categories
    const [categories, setCategories] = useState([]); 
  
    // tracks the selected category from dropdown
    const [selected, setSelected] = useState("");

    //THIS FETCH CALLS THE BACKEND TO GET CATEGORIES FROM DATABASE
    // useEffect(() => {
    //     fetch("http://localhost:5000/api/categories") // GET request to the backend
    //       .then((response) => response.json())
    //       .then((data) => setCategories(data))
    //       .catch((error) => console.error("Error fetching categories:", error)); // used to handle errors
    //   }, []);

    const submitCategory = (selectedCategory) => {
      if (!selectedCategory) return; // prevents an empty selection
  
      setSelectedCategory(selectedCategory);
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
            {categories.map((category, index) => ( // maps over the categories array to display each category in the dropdown
              <option key={index} value={category}>  {/* option elements for each category */}
                {category}
              </option>
            ))}
          </select>
        </div>
      );
}

export default Categories