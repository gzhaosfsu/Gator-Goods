import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import '../ProductListing.css'
import Header from "./Header"
import image from "./images/imageNA.png"
import StarIcon from '@mui/icons-material/Star';

const ProductListing =  () => {

    const { id } = useParams();
    console.log("Listing ID: ", id); 
    const [product, setProduct] = useState([]); 
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/listing/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((data) => {
                console.log("listing Info: ", data);
                console.log("vendor id: " + data[0].vendor_id); 
                setProduct(data); 
                setLoading(false); 
            })
            .catch((err) => console.error("Error fetching products:", err));
      }, []);

      useEffect(() => {

        if (product.length > 0 && product[0].vendor_id) {
            const vendorId = product[0].vendor_id;

            fetch(`/api/review/${vendorId}`)
            .then((res) => {
              if (!res.ok) throw new Error(res.statusText);
              return res.json();
            })
            .then((data) => {
              console.log("reviews HERE: ", data); 
                setReviews(data); 
              
            })
        .catch((err) => console.error("Error fetching products:", err));
        }
      }, [product]);

const formatDate = (date) => {
    const newDate = new Date(date); 
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return newDate.toLocaleDateString('en-US', options);

}
 
    return (
        <>
        <Header></Header>
        {loading ? (
            <div>Loading...</div> // Or a spinner, skeleton, etc.
        ) : (

        <div className="container-prodListing">
            <div className="left-container">
                <div className="prod-img-container">
                    <img src={image} alt="product image" />
                </div>
                <div className="vendor-reviews-container" >
                    <div className="total-review-container" >
                        <div className="vendor-username" >Seller: Name here</div>
                        <div className="total-stars" > stars</div>
                        <div className="submit-review" >
                            <button> Write a review</button>
                        </div>
                    </div>
                
                    { reviews.map((review) => (
                        <div className="customer-review-container" key={review.review_id}> 
                            <div className="customer-stars" >
                            {[...Array(review.rating)].map((_, i) => (
                                <StarIcon key={i} style={{ color: '#000' }} />
                            ))}
                            </div>
                            <div className="customer-comment" > 
                                {review.comment}
                            </div>
                            <div className="reviewer-info">
                                <p className="reviewer-username" >
                                    Reviewer: Name here
                                </p>
                                <p className="review-date" >
                                    Date: {formatDate(review.review_date)}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="right-container">
                <div className="prod-price" >
                    <h2>${product[0].price}</h2>    
                </div>
                <div className="prod-title" >
                    <h3>{product[0].title}</h3>
                </div>
                <div className="SendMessage-box">
                    <div > Send Seller a Message</div>
                    <div className="send-message-container">
                        <div></div>
                        <div>Send</div>
                    </div>
                </div>
                <div className="deliver-request-box" >
                    <button>Get Item Delivered</button>
                </div>
                <div className="description-container">
                    <h2>Description</h2>
                    <p>Type: {product[0].category}</p>
                    <p>Condition: {product[0].conditions}</p>
                    <p>{product[0].description}</p>
                </div>
            </div>
        </div>

        )}
       
        </>
    )

}

export default ProductListing