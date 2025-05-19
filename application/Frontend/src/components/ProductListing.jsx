import { useState, useEffect } from "react"
import {Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import '../ProductListing.css'
import Header from "./Header"
import image from "./images/imageNA.png"
import StarIcon from '@mui/icons-material/Star';
import CreateReviewForm from "./CreateReviewForm";
import CreateDeliveryRequest from "./CreateDeliveryRequest";
import {UserContext} from "../UserContext"
import {useContext} from "react"

const ProductListing =  () => {

    const {user} = useContext(UserContext);
    const { id } = useParams();
    const [product, setProduct] = useState([]); 
    const [reviews, setReviews] = useState([]); 
    const [alreadyReviewed, setAlreadyReviewed] =useState(false); 
    const [isSeller, setIsSeller] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showDeliRequest, setShowDeliRequest] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [text, setText] = useState("");
    const [vendor, setVendor] = useState({
        username: "", 
        rating: 0,
    });

    const getUsername = (id)=>{

    }

    useEffect(() => {
        fetch(`/api/listing/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((data) => {
                setProduct(data); 
                setLoading(false); 

                console.log("DAta : ", data); 

                if(user) {
                fetch(`/api/delivery_request/listing-buyer?userId=${user.user_id}&listingId=${data[0].listing_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(res.statusText);
                    return res.json();
                })
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setHasRequested(true);
                    } else {
                        setHasRequested(false);
                    }
                    
                }) 
                }

                  
                
            })
            .catch((err) => console.error("Error fetching products:", err));

            if(user) {
                fetch(`/api/direct_message/listing-sender/get?id=${user.user_id}&listing=${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(res.statusText);
                    return res.json();
                })
                .then((data) => {
      
                    if (Array.isArray(data) && data.length > 0) {
                        // console.log("Request Found");
                        setMessageSent(true);
                    } else {
                        setMessageSent(false);
                        // console.log("No request found"); 
                    }

            }) 
            }

              
        

      }, [id , showForm]);



      useEffect(() => {

        if (product.length > 0 && product[0].vendor_id) {
            const vendorId = product[0].vendor_id;

            fetch(`/api/review/${vendorId}`)
            .then((res) => {
              if (!res.ok) throw new Error(res.statusText);
              return res.json();
            })
            .then((data) => {
                setReviews(data); 

                if(user) {
                    const foundReview = data.some(review => review.author_id === user.user_id)
                    setAlreadyReviewed(foundReview); 
                }
                
              
            })
        .catch((err) => console.error("Error fetching products:", err));
        }



      }, [product]);

 

    const formatDate = (date) => {
        const newDate = new Date(date); 
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options);

    }

    const handleMessage = (e) =>{
        console.log("CLick"); 
        e.preventDefault();
        

        // fetch("/api/direct_message", {
        //     mode: "cors",
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         sender_id: user.user_id, 
        //         receiver_id: product[0].vendor_id, 
        //         listing_id: id ,
        //         content: text,
        //     }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("direct message")

        //     })
        //     .catch((err) => {
        //       console.error("Error:", err);
        //     });
    }
    const handleText = (e) =>{
        setText(e.target.value)
        console.log(e.target.value)
    }

    if(!user){
        return (
        <>
        {loading ? (
            <div>Loading...</div> // Or a spinner, skeleton, etc.
        ) : (

        <div className="container-prodListing">
            <div className="left-container">
                <div className="prod-img-container">
                    {
                        product[0].thumbnail ? (
                            <img src={product[0].thumbnail} alt="product image" />
                        ) : 
                        (
                            <img src={image} alt="product image" />
                        )
                    }
                    
                </div>
                <div className="vendor-reviews-container" >
                    <div className="total-review-container" >
                        <div className="vendor-username" >Seller: Name here</div>
                        <div className="total-stars" > stars</div>
                        <div className="submit-review" >
                            <button className="btn-create-review"> 
                                <Link to="/login" >Write a review</Link>
                            </button>
                        </div>
                    </div>
                
                    { [...reviews].reverse().map((review) => (
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
                                    Reviwer: {review.username}
                                </p>
                                <p className="review-date" >
                                    Date: {formatDate(review.review_date)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <br/>
                    <br/>
                </div>

            </div>
            <div className="right-container">
                <div className="prod-price" >
                    <h2>${product[0].price}</h2>    
                </div>
                <div className="prod-title" >
                    <h3>{product[0].title}</h3>
                </div>
                <div className="sendMessage-box">
                        <div> <strong>Send Seller a Message</strong> </div>
                        <div className="send-message-container">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleText}
                                    placeholder="Type a message"
                                />
                                <button>
                                    <Link to="/login" >Send</Link>
                                </button>
        
                        </div>         
                </div>
                <div className="deliver-request-box" >
                    <button>
                        <Link className="link-btn"  to="/login"> Get Item Delivered</Link> 
                    </button>
                        
                </div>
                <div className="description-container">
                    <h2>Description</h2>
                    <p> <strong>Type:</strong> {product[0].category}</p>
                    <p> <strong>Condition:</strong> {product[0].conditions}</p>
                    <p>{product[0].description}</p>
                </div>
            </div>
        </div>

        )}
       
        </>
    )

         
    }
 
    return (
        <>
        {loading ? (
            <div>Loading...</div> // Or a spinner, skeleton, etc.
        ) : (

        <div className="container-prodListing">
            <div className="left-container">
                <div className="prod-img-container">
                    {
                        product[0].thumbnail ? (
                            <img src={product[0].thumbnail} alt="product image" />
                        ) : 
                        (
                            <img src={image} alt="product image" />
                        )
                    }
                    
                </div>
                <div className="vendor-reviews-container" >
                    <div className="total-review-container" >
                        <div className="vendor-username" > <strong>Seller: {vendor.username}</strong></div>
                        <div className="total-stars" > stars</div>
                        <div className="submit-review" >
                            <button className="btn-create-review"> 
                                <Link to="/login" >Write a review</Link>
                            </button>
                        </div>
                    </div>
                
                    { [...reviews].reverse().map((review) => (
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
                                    Reviwer: {review.username}
                                </p>
                                <p className="review-date" >
                                    Date: {formatDate(review.review_date)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <br/>
                    <br/>
                </div>

            </div>
            <div className="right-container">
                <div className="prod-price" >
                    <h2>${product[0].price}</h2>    
                </div>
                <div className="prod-title" >
                    <h3>{product[0].title}</h3>
                </div>
                <div className="sendMessage-box">
                    {messageSent ? (
                        <>
                        <div> <strong>Message Sent to Seller</strong> </div>
                        <div>
                            See Conversations
                        </div>
                        </>
                    ) : (
                        <>
                        <div> <strong>Send Seller a Message</strong> </div>
                        <div className="send-message-container">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleText}
                                    placeholder="Type a message"
                                />
                                <button onClick={handleMessage} >Send</button>
        
                        </div>
                        </>
                    )}

                    
                </div>
                <div className="deliver-request-box" >
                    {
                        hasRequested ? (
                            <>
                            <button>Request Already Sent</button>
                            </>
                        ):(
                        <>
                        <button onClick={() => setShowDeliRequest(true)} > Get Item Delivered</button>
                        {
                            showDeliRequest && (<CreateDeliveryRequest onClose={() => setShowDeliRequest(false)} vendorId={product[0].vendor_id} title={product[0].title} listingId={product[0].listing_id} setHasRequested={setHasRequested}/>)
                        }
                        </>
                    )}
                    
                </div>
                <div className="description-container">
                    <h2>Description</h2>
                    <p> <strong>Type:</strong> {product[0].category}</p>
                    <p> <strong>Condition:</strong> {product[0].conditions}</p>
                    <p>{product[0].description}</p>
                </div>
            </div>
        </div>

        )}
       
        </>
    )

}

export default ProductListing