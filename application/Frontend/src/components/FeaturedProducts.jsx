// FeaturedProducts.jsx
import React, { useState, useEffect } from "react";
import { dummyData } from "../dummyData";
import "../FeaturedProducts.css";

export const FeaturedProducts = () => {
 const [featuredItems, setFeaturedItems] = useState([]);
 const DISPLAY_COUNT = 8;

 const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
 };
  useEffect(() => {
    fetch('/api/all')
    
    
    .then((response) => response.json())
      .then((data) => {
        const featuredOnly = data.filter((p) => p.product_id);
        shuffleArray(featuredOnly);

        setFeaturedItems(featuredOnly.slice(0, DISPLAY_COUNT));
      })
      .catch((error) => {
        console.error("Error fetching featured items:", error);
      });
  }, []); 



// dummy data for now 
// const featuredItems = dummyData.filter(product => product.isFeatured);

  return (
    <div className="featured-container">
      <h2>Shop Our Most Popular Products</h2>
      <div className="featured-products-list">
        {featuredItems.map((item) => (
          <div key={item.product_id} className="featured-product-card">
            {item.thumbnail ? (
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="featured-product-image" 
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            {item.discount && item.discount > 0 && (
              <p>
                Discount:{" "}
                {item.discount > 1 
                  ? `${item.discount}% off` 
                  : `${(item.discount * 100).toFixed(0)}% off`}
              </p>
            )}
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;