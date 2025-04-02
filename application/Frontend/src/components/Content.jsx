// Content.jsx
import React from "react";
import homePageImg from "./images/homePage.png";
import FeaturedProducts from "../FeaturedProducts"; // Adjust path if needed

const Content = () => {
  return (
    <div className="content-container">
      {/* Software Engineering Banner Image */}
      <img
        className="homepage-img"
        src={homePageImg}
        alt="Software Engineering Class SFSU"
      />

      {/* Render the Featured Products section below the banner */}
      <FeaturedProducts />
    </div>
  );
};

export default Content;
