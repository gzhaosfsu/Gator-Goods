import React, {useContext, useEffect, useState} from 'react';
import '../UserListings.css';
import Header from './Header';
import Footer from './Footer';
import CreateListingForm from './CreateListingForm'
import {UserContext} from './UserContext';


const UserListings = () => {
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([]);
  const {user} = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

  useEffect(() => {
    fetch('api/listings/:id?id=1')
      .then(res => res.json())
      .then(data => {
        const cleanedData = data.map(item => ({
          title: item.title,
          price: parseFloat(item.price),
          listing_date: new Date(item.listing_date),
          thumbnail: item.thumbnail
        }));
        setListings(cleanedData);
    })
      .catch(err => console.error('Failed to load listings:', err));
  }, []);

  return (
    <div className="listings-page">
      <Header />
      <div className="listing-formatting">
        <h1 className="title">Active Listings</h1>
        {/* <div className="button-wrapper"> */}
          <div className="create-button button-wrapper" onClick={() => setShowForm(true)}>Create Listing <span className="plus">+</span></div>

          {showForm && (<CreateListingForm onClose={() => setShowForm(false)} />
          )}
        {/* </div> */}
        <br /> <br /> <br /> <br />
        <div className="listings-container">
          {listings.map((item, index) => (
            <div className="listing-card" key={index}>
              {/* <div className="listing-img" /> */}
              <img src={item.thumbnail} width="300" height="200" alt="Thumbnail" />
              <div className="listing-info">
                <strong>{item.title || "No Title"}</strong>
                <br /> <br /> <br />
                <font color="#828282">
                  <div>${parseFloat(item.price.toFixed(2))} &emsp;&emsp;&emsp;&emsp; Listed on: {new Date(item.listing_date).toLocaleDateString()}</div>
                </font>
                <div className="buttons">
                  <button className="delete-btn">Delete</button>
                  <button className="sold-btn">Mark as Sold</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserListings;