import React from "react"
import { useState, useEffect } from "react"
import "../App.css" // CSS file for styling

const Categories = ({ setSelectedCategory }) => {
    // stores fetched categories
    const [categories, setCategories] = useState([]); 
  
    // tracks the selected category from dropdown
    const [selected, setSelected] = useState("");

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/categories") // GET request to the backend
    //       .then((response) => response.json())
    //       .then((data) => setCategories(data))
    //       .catch((error) => console.error("Error fetching categories:", error)); // used to handle errors
    //   }, []);

      const submitCategory = () => {
        setSelectedCategory(selected); // passes the selected category back to parent
        console.log("Searching for:", selected); // debugging output
      };


      return (
        <div className="categories-container">
          <h2 className="categories-title">Categories</h2>
    
          {/* <label htmlFor="category-dropdown" className="categories-label">
            Select a Category:
          </label> */}
    
          <select
            id="category-dropdown"
            value={selected}
            onChange={(e) => setSelected(e.target.value)} // updates the selected state when the dropdown value changes
            className="categories-dropdown"
          >
            <option value=""> Select One </option>
            {categories.map((category, index) => ( // maps over the categories array to display each category in the dropdown
              <option key={index} value={category}>  {/* option elements for each category */}
                {category}
              </option>
            ))}
          </select>
    
          <button onClick={submitCategory} className="categories-button"> {/* submits the selected category */}
            Search
          </button>
        </div>
      );
}

export default Categories