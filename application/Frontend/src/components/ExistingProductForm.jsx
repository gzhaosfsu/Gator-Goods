import React, { useContext, useEffect, useState } from 'react';
import '../CreateListingForm.css';
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const ExistingProductForm = ({ onClose }) => {
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
    console.log("Submitting...");

    try {

      const payload = {
        product_id: parseInt(formData.product),
        price: parseFloat(formData.price),
        conditions: formData.condition,  
        vendor_id: user.user_id,
      };

      console.log("Heres the payload: ", payload);

      const res = await fetch('/api/listing/existing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create listing');
      const responseData = await res.json();
      console.log('Listing created:', responseData);
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
            type="text"
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
