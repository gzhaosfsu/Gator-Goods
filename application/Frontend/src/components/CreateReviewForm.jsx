import React, { useContext, useEffect, useState} from 'react';
import {UserContext} from "../UserContext";
import "../CreateReviewForm.css"

const CreateReviewForm = ({ onClose, vendorId }) => {

    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({
      
        author_id: 0,
        vendor_id: 0,
        rating: 0,
        comment: '',
    });

    const handleSubmit = (e) => {
        
    e.preventDefault();
        fetch("/api/review", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_id: user.user_id,
                vendor_id: vendorId,
                rating: formData.rating,
                comment: formData.comment,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
                onClose(); 

            })
            .catch((err) => {
              console.error("Error:", err);
            });

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
    <div className='form-overlay'>
        <div className='form-container' >
            <button className="close-button" onClick={onClose}>
                x
            </button>
            <h2>Rating Seller: Name here </h2>
            <form onSubmit={handleSubmit}>
                <label>Rate your experience with seller</label>
                <select 
                name="rating" 
                value={formData.rating}
                onChange={handleChange}
                required
                >
                    <option value="" selected >Select a rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label>Comment</label>
                <textarea 
                name="comment"
                onChange={handleChange}
                value={formData.comment}
                rows="3"
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

export default CreateReviewForm;