import React, { useContext, useEffect, useState } from 'react';
import '../CreateListingForm.css';
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const ExistingProductForm = ({ onClose, onListingCreated }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product/vendor/${user.user_id}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
  
    fetchProducts();
  }, [user, navigate]);
  

  const [formData, setFormData] = useState({
    product:'',
    price: '',
    condition: '',
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(formData.price) || formData.price.trim() === '') {
      alert("Please enter a valid numeric value for the price.");
      return;
    }

    try {

      const payload = {
        product_id: parseInt(formData.product),
        price: parseFloat(formData.price),
        conditions: formData.condition,  
        vendor_id: user.user_id,
      };

      const res = await fetch('/api/listing/existing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create listing');
      const responseData = await res.json();

      if (onListingCreated) {
        onListingCreated({
          listing_id: responseData.listing_id,
          title: products.find(p => p.product_id === payload.product_id)?.title || "Untitled",
          price: payload.price,
          listing_date: new Date(),
          thumbnail: `data:image/png;base64,${responseData.thumbnail}`
        });
      }
      onClose();
      
      alert("Listing created!");
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

        <label>Select a Product</label>
            <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            >
            <option value="">Select a product</option>
            {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                {product.title}
                </option>
            ))}
            </select>


          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

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

export default ExistingProductForm;
