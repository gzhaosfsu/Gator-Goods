// Content.jsx
import React from "react";
import homePageImg from "./images/homepageImg.png";
import {Link } from 'react-router-dom'
import FeaturedProducts from "./FeaturedProducts"; // Adjust path if needed

const Content = ({dataReturned,selectedCategoryName, isSearching, filters = {condition: "", priceSort: ""}}) => {
 
  // This shows when it toggles on displaying data or not 
  console.log("is Searching: " + isSearching); 
  
   

  // will only diplay if the we are clicking Search Icon
  if(isSearching === true ) {
    // we check if we found any items
    console.log("Data returnd from header length: " + dataReturned.length);  
    let filteredData = Array.isArray(dataReturned)
    ? [...dataReturned]
    : []
    
    // condition filter
    if (filters.condition) {
      filteredData = filteredData.filter(
        (p) => p.conditions === filters.condition
      )
    }

    // price sort
    if (filters.priceSort === "high-to-low") {
      filteredData.sort((a, b) => b.price - a.price)
    } else if (filters.priceSort === "low-to-high") {
      filteredData.sort((a, b) => a.price - b.price)
    }

    // date posted filter
    if (filters.datePosted) {
      const now = Date.now()
      filteredData = filteredData.filter(item => {
        const posted = new Date(item.listing_date).getTime()
        const ageMs  = now - posted
        switch (filters.datePosted) {
          case "24h": return ageMs <= 24 * 60 * 60 * 1000
          case "7d":  return ageMs <= 7  * 24 * 60 * 60 * 1000
          case "30d": return ageMs <= 30 * 24 * 60 * 60 * 1000
          default:    return true
        }
      })
    }

    // discount threshold filter
    if (filters.minDiscount) {
      const minDisc = Number(filters.minDiscount)
      filteredData = filteredData.filter(item =>{
        // (item.discount * 100 || 0) >= minDisc
        const discValue = item.discount > 1
          ? item.discount
          : (item.discount * 100)
        return discValue >= minDisc
      })
    }

    // minimum rating filter
    if (filters.minRating) {
      const minR = Number(filters.minRating)
      filteredData = filteredData.filter(item =>
        (item.rating || 0) >= minR
      )
    }

    if (filteredData.length > 0) {
        return (
          <div className="content-container">
            <h2> 
              {/* JACE: This is were I were you display number of resuls and amazon display search bar result and not category*/}
              {filteredData.length} result{dataReturned.length !== 1 && "s"} for item{dataReturned.length !== 1 && "s"} in "{selectedCategoryName}"
            </h2>
            <div className="products-list">
              {filteredData.map((product) => (
                 <Link className="link-prod" to={`/productListing/${product.listing_id}`} >
                <div key={product.product_id} className="product-card-content">
                  {product.thumbnail ? (
                  <img
                    src={product.thumbnail} // Assumes each product has an "image" property
                    alt={product.title}
                    className="product-image-content"
                  />
                  ) : ( 
                    <div className="no-image">No Image</div>
                  )}   
                  <h3>{product.title}</h3>
                  <p>Price: ${product.price}</p>
                  {product.discount > 0 && (
                    <p>Discount: {product.discount}% off</p>
                )}
                  <p>{product.description}</p>
                </div>
                </Link>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="content-container">
            <div>No item Found</div>
          </div>
        )
    }
    
  }
  

  // Default content displayed 
  return (
    <div className="content-container">
      <img
        className="homepage-img"
        src={homePageImg}
        alt="Software Engineering Class SFSU"
      />
      <FeaturedProducts />
    </div>
  );

 
};

export default Content;
