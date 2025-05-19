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
        <input
        type="text"
        name="pickup"
        value={formData.pickup}
        onChange={handleChange}
        required
        />


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
