// FeaturedProducts.jsx
import React, { useState, useEffect } from "react";
import { dummyData } from "../dummyData"; // Adjust path if necessary
import "../FeaturedProducts.css";

export const FeaturedProducts = () => {
 


// const [featuredItems, setFeaturedItems] = useState([]);

// useEffect(() => {
//   fetch('http://localhost:5000/api/all')
//     .then((response) => response.json())
//     .then((data) => {
//       setFeaturedItems(data); // Set state once data is fetched
//     })
//     .catch((error) => {
//       console.error("Error fetching featured items:", error);
//     });
// }, []); 



// dummy data for now 
const featuredItems = dummyData.filter(product => product.isFeatured);

  return (
    <div className="featured-container">
      <h2>Shop Our Most Popular Products</h2>
      <div className="featured-products-list">
        {featuredItems.map((item) => (
          <div key={item.product_id} className="featured-product-card">
            <img 
              src={item.image} 
              alt={item.title} 
              className="featured-product-image" 
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
