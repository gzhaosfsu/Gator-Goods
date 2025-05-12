import image from "./images/imageNA.png"
import React, { useContext, useEffect, useState} from 'react';
import {UserContext} from "../UserContext";
import "../CreateReviewForm.css"

const CreateDeliveryRequest = ({ onClose, vendorId, title, listingId }) => {

    const {user} = useContext(UserContext);
    const [] = useState({
        buyer_id: 0, 
        vendor_id: 0, 
        status: "Pending",
        dropoff: "", 
        listing_id:0,
        buyer_special_request: "", 
        delivery_status : "Unassigned"


    }); 

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
                            <p>Item requesting to deliver: </p>
                            <h4>{title}</h4>
                        </div>  
                    </div>
                </div>
                <form >
                    <label>Dropoff Location</label>
                    <select name="" id="">
                        <option value=""></option>

                    </select>
                    <label>Special Request</label>
                    <textarea 
                    name="" 
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