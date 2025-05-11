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
      [name]: files && files.length > 0 ? files[0] : value,
    });
  };

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("onloadend fired");
        console.log("reader.result:", reader.result);
      };
      reader.onerror = () => {
        console.error("FileReader error");
      };
      reader.readAsDataURL(formData.image);
    }
  }, [formData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
  
    if (!formData.image) {
      alert('Please upload an image.');
      return;
    }
  
    try {
      
      const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            console.log("onload fired, result should be valid");
            resolve(reader.result);
          };
      
          reader.onerror = (err) => {
            console.error("FileReader error:", err);
            reject(err);
          };
      
          reader.readAsDataURL(file);
        });
      };
      

      
  
      console.log("About to read file:", formData.image);
      const result = await readFileAsDataURL(formData.image);
      console.log("Base64 result length:", result.length);
      console.log("Heres my formData: ");
      const base64Data = result.split(',')[1];
      const mimetype = formData.image.type;

      
  
      const payload = {
        thumbnail: base64Data,
        mimetype: mimetype,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
      };

      
  
      const res = await fetch('/api/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error('Failed to create listing');
      const responseData = await res.json();
      console.log('Listing created:', responseData);
      onClose();
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
            <option value="New">New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
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