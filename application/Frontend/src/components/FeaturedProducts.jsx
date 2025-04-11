// FeaturedProducts.jsx
import React, { useState, useEffect } from "react";
import { dummyData } from "../dummyData"; // Adjust path if necessary
import "../FeaturedProducts.css";

export const FeaturedProducts = () => {
  // Filter for featured items
  // const featuredItems = dummyData.filter(product => product.isFeatured);
  //const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  //useEffect(() => {
   // const fetchFeaturedProducts = async () => {
    //  try {
        // Using the /search.all endpoint to get all listings.
     //   const response = await fetch('http://localhost:3001/search.all');
     //   if (!response.ok) {
     //     throw new Error('Network response was not ok');
     //   }
     //   const data = await response.json();
     //   setProducts(data);
   //   } catch (err) {
   //     setError(err.message);
   //   } finally {
   //     setLoading(false);
   //   }
  //  };

  //  fetchFeaturedProducts();
//  }, []);

//  if (loading) {
//    return <div>Loading featured products...</div>;
//  }

//  if (error) {
//    return <div>Error: {error}</div>;
//  }


const [featuredItems, setFeaturedItems] = useState([]);

useEffect(() => {
  fetch('http://localhost:3001/api/all')
    .then((response) => response.json())
    .then((data) => {
      setFeaturedItems(data); // Set state once data is fetched
    })
    .catch((error) => {
      console.error("Error fetching featured items:", error);
    });
}, []); 

// fetch('http://localhost:3001/api/all')
//     .then((response) => response.json())
//     .then((data) => {
        
//         setFeaturedItems(data); 
//         console.log(featuredItems.length);
//     })
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
