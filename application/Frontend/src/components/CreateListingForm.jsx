import React, {useContext, useEffect, useState} from 'react';
import '../CreateListingForm.css';
import {UserContext} from "../UserContext";
import {useNavigate} from "react-router-dom";


const CreateListingForm = ({ onClose }) => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    price: '',
    description: '',
    category: '',
    condition: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // post request here
    console.log(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Create Listing</h2>
        <form onSubmit={handleSubmit}>
          

          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="stationary">Stationary</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>

          <label>Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select condition</option>
            <option value="new">New</option>
            <option value="used-like-new">Used - Like New</option>
            <option value="used-good">Used - Good</option>
            <option value="used-fair">Used - Fair</option>
          </select>

          <div className="form-buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingForm;