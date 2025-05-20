import image from "./images/imageNA.png"
import React, { useContext, useEffect, useState} from 'react';
import {UserContext} from "../UserContext";
import "../CreateReviewForm.css"

const CreateDeliveryRequest = ({ onClose, vendorId, title, listingId, setHasRequested }) => {

    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({
        buyer_id: 0, 
        vendor_id: 0, 
        status: "Pending",
        dropoff: "", 
        listing_id:0,
        buyer_special_request: "", 
        delivery_status : "Unassigned"


    }); 


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/delivery_request", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                buyer_id: user.user_id, 
                vendor_id: vendorId, 
                status: "Pending",
                dropoff: formData.dropoff, 
                buyer_special_request: formData.buyer_special_request,
                listing_id: listingId,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
                onClose(); 

            })
            .catch((err) => {
              console.error("Error:", err);
            });

        
        setHasRequested(true); 
    }


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
        ...formData,
        [name]: files ? files[0] : value,
        });
    };

    return(
        <>
       
        <div className="form-overlay" >
            <div className="form-container" >
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <div className="header-color" >
                    <div className="request-form-heading">
                        <img src={image} alt="item-image" />
                        <div>
                            <p>Item requesting to be delivered: </p>
                            <h4>{title}</h4>
                        </div>  
                    </div>
                </div>
                <form onSubmit={handleSubmit} >
                    <label>Dropoff Location</label>
                    <select
                    name="dropoff" 
                    value={formData.dropoff}
                    onChange={handleChange}
                    required
                     >
                        <option value="">Select a location</option>
                        <option value="Cesar Chavez">Cesar Chavez</option>
                        <option value="Student Services">Student Services</option>
                        <option value="Library">Library</option>
                        <option value="Hensill Hall">Hensill Hall</option>
                        <option value="The Village at Centennial Square">The Village at Centennial Square</option>
                        <option value="Annex 1">Annex 1</option>

                    </select>
                    <label>Special Request for Courier</label>
                    <textarea 
                    name="buyer_special_request"
                    onChange={handleChange}
                    value={formData.buyer_special_request}
                    rows="7"
                    
                    />

                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                
            </div>
        </div>
        
        </>
    )

}

export default CreateDeliveryRequest;