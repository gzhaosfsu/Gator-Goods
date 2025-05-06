import React, { useState, useEffect } from "react"
import Header from "./Header"

const VendorDeliveryRequest = () => {



    return (

        <>
        <Header></Header>
        <div>Vendor pages
            <div >Back to dashbaord</div>
            <div className="deli-request-container">
                <div className="request-header" >
                    Header
                </div>
                <div className="indiv-request">
                    <div className="request-info-container">
                        { // undo once you need img 
                        /* <img src="" alt="image" /> */}
                        <div className="request-info">
                            <h2>Name of product</h2>
                            <div className="price-buyer" >
                                <p>$ price </p>
                                <p>Buyer: Name here</p>
                            </div>
                        </div>
                    </div>
                    <div className="request-action">
                        <button>Accept</button>
                        <button>Decline</button>
                    </div>
                </div>
            </div>
         </div>
        
        </>
    )
}


export default VendorDeliveryRequest