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

    try {
      let base64Data = '';
      let mimetype = '';
      let imageName = '';
  
      // If a file image, convert to base 64
      if (formData.image) {
        const reader = new FileReader();
  
        reader.onloadend = async () => {
          base64Data = reader.result.split(',')[1];
          mimetype = formData.image.type;
          imageName = formData.image.name;
  
          const payload = {
            image: {
              name: imageName,
              mimetype: mimetype,
              data: base64Data,
            },
            title: formData.title,
            price: formData.price,
            description: formData.description,
            category: formData.category,
            condition: formData.condition,
          };
  
          const res = await fetch('/create-listing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
  
          if (!res.ok) throw new Error('Failed to create listing');
          const result = await res.json();
          console.log('Listing created:', result);
  
          onClose(); // Close modal on success
        };
  
        reader.readAsDataURL(formData.image);
      } else {
        alert('Please upload an image.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating listing. Please try again.');
    }
  };

  /*     listing_status ENUM('Active', 'Sold', 'Delisted'),
    product_id INT,
    vendor_id INT,
    availability ENUM('In Stock', 'Out of Stock'),
    price DECIMAL(10,2),
    discount DECIMAL(5,2),
    approval_status ENUM('Pending', 'Approved', 'Denied'),
    conditions ENUM('New', 'Used - Like New', 'Used - Good', 'Used - Fair'), */

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