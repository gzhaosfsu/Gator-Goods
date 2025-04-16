// Content.jsx
import React from "react";
import homePageImg from "./images/homePage.png";
import FeaturedProducts from "./FeaturedProducts"; // Adjust path if needed

const Content = ({dataReturned,selectedCategoryName, isSearching}) => {
 
  // This shows when it toggles on displaying data or not 
  console.log("is Searching: " + isSearching); 
   

  // will only diplay if the we are clicking Search Icon
  if(isSearching === true ) {
    // we check if we found any items
      if (dataReturned.length > 0) {
        return (
          <div className="content-container">
            <h2> 
              {/* JACE: This is were I were you display number of resuls and amazon display search bar result and not category*/}
              {dataReturned.length} result{dataReturned.length !== 1 && "s"} for item{dataReturned.length !== 1 && "s"} in "{selectedCategoryName}"
            </h2>
            <div className="products-list">
              {dataReturned.map((product) => (
                <div key={product.product_id} className="product-card">
                  {product.thumbnail ? (
                  <img
                    src={product.thumbnail} // Assumes each product has an "image" property
                    alt={product.title}
                    className="product-image"
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
