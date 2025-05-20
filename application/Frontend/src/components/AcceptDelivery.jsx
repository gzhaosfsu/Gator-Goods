import React, { useState } from 'react';
import '../AcceptDelivery.css';

const AcceptDeliveryForm = ({ request, onClose, onSubmit }) => {
  const [pickup, setPickup] = useState('');
  const [vendorNote, setVendorNote] = useState('');

  const [formData, setFormData] = useState({
    pickup: '',
    vendor_special_request: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(request.delivery_request_id, {
      pickup: formData.pickup,
      vendor_special_request: formData.vendor_special_request
    });
  };

  return (
    <div className="accept-modal-overlay">
      <div className="accept-modal-form">
        <button className="close-button" onClick={onClose}>&times;</button>

        <div className="thumbnail-header">
          <img src={request.thumbnail} alt="Item Thumbnail" />
          <h2>{request.title}</h2>
        </div>

        <form onSubmit={handleSubmit}>
        <label>Pickup Location</label>
          <select
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            required
          >
            <option value="">Select a pickup location</option>
            <option value="SFSU Bookstore">SFSU Bookstore</option>
            <option value="Quickly">Quickly</option>
            <option value="Halal Shop">Halal Shop</option>
            <option value="Cafe 101">Cafe 101</option>
            <option value="Nizario's Pizza">Nizario's Pizza</option>
            <option value="Cesar Chavez">Cesar Chavez</option>
            <option value="Student Services">Student Services</option>
            <option value="Library">Library</option>
            <option value="Hensill Hall">Hensill Hall</option>
            <option value="The Village at Centennial Square">The Village at Centennial Square</option>
            <option value="Annex 1">Annex 1</option>
          </select>


        <label>Vendor Special Request</label>
        <textarea
            name="vendor_special_request"
            value={formData.vendor_special_request}
            onChange={handleChange}
            rows="3"
        />

            <button type="submit">Confirm Delivery</button>
        </form>
      </div>
    </div>
  );
};

export default AcceptDeliveryForm;
