import React, { useContext, useEffect, useState } from 'react';
import '../CreateListingForm.css';
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const CreateListingForm = ({ onClose, onListingCreated }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    condition: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Provided file is not a Blob/File"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      console.log("Reading file...");
      const result = await readFileAsDataURL(imageFile);
      const base64Data = result.split(',')[1];
      const mimetype = imageFile.type;

      const payload = {
        thumbnail: base64Data,
        mimetype,
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        conditions: formData.condition,  
        vendor_id: user.user_id,
      };

      console.log("Heres the payload: ", payload);

      const res = await fetch('/api/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create listing');
      const responseData = await res.json();
      // Update the page with the new listing

      console.log('Listing created:', responseData);
      if (onListingCreated) {
        onListingCreated({
          listing_id: responseData.listing_id,
          title: payload.title,
          price: payload.price,
          listing_date: new Date(),
          thumbnail: `data:${payload.mimetype};base64,${payload.thumbnail}`
        });
      }
      alert("Listing created!");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error creating listing: ${error.message || 'Unknown error'}`);
    }
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
