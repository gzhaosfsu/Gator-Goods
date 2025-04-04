// Content.jsx
import React from "react";
import homePageImg from "./images/homePage.png";
import FeaturedProducts from "./FeaturedProducts"; // Adjust path if needed

const Content = ({ searchResults, selectedCategory, isSearching}) => {
  // Filter the products based on search term and category
  // let filteredProducts = searchResults;





  // if (searchTerm && searchTerm.trim() !== "") {
  //   filteredProducts = filteredProducts.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  // if (selectedCategory && selectedCategory.trim() !== "") {
  //   filteredProducts = filteredProducts.filter(
  //     (product) => product.category === selectedCategory
  //   );
  // }

  // Determine if we are in a "search state"
  // const isSearching =
  //   (searchTerm && searchTerm.trim() !== "") ||
  //   (selectedCategory && selectedCategory.trim() !== "");

  if (isSearching == "selectedCategory") {
    if (selectedCategory.length > 0) {
      return (
        <div className="content-container">
          <h2>
            Jaces data is chaning this area
            {/* {selectedCategory && `in ${selectedCategory}`} */}
          </h2>
          <div className="products-list">
            {selectedCategory.map((product) => (
              <div key={product.product_id} className="product-card">
                <img
                  src={product.image} // Assumes each product has an "image" property
                  alt={product.title}
                  className="product-image"
                />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
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
    }
  } 
  if (isSearching === "SerachBarResult") {
  
    if (searchResults.length > 0) {
      return (
        <div className="content-container">
          <h2>
            Martha is searhc is happening 
            {/* {selectedCategory && `in ${selectedCategory}`} */}
          </h2>
          <div className="products-list">
            {searchResults.map((product) => (
              <div key={product.product_id} className="product-card">
                <img
                  src={product.image} // Assumes each product has an "image" property
                  alt={product.title}
                  className="product-image"
                />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
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
  }
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
  // Default homepage view: banner image + featured products
 
}};

export default Content;
