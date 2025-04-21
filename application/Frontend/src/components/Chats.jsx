import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/imageNA.png"
import React, { useState, useEffect } from "react"
import "../Chat.css"
import {directMessage, registeredUsers, listings} from "../chatDummyData"; 


const Chats = () => {

    const [ischatting, setIsChatting] = useState(false);
    const [receiverID, setReceiverID] = useState(0);
    const [listingID, setListingID] = useState(0);
    const [senderID, setSenderID] = useState(0);
    const [usernameReceiver, setUsernameReceiver] = useState(""); 


  const currentUserID = 2; 

  // Filtering based on current User and unique listing from direct message table 
  const userMessages = directMessage
  .filter(msg => msg.sender_id === currentUserID)
  .filter((msg, index, self) =>
    index === self.findIndex(m => m.listing_id === msg.listing_id)
  );

  // I will then return all data needed to display the listing name, username of receiver, and image
  // this will be all from the get request I will be making from listing table, registered user talbe
  const uniqueChats = userMessages.map(msg => {
  const sender = registeredUsers.find(user => user.id === msg.sender_id);
  const receiver = registeredUsers.find(user => user.id === msg.receiver_id);
  const listing = listings.find(item => item.product_id === msg.listing_id);

  return {
    message_id: msg.message_id,
    senderUsername: sender?.username || "Unknown",
    userId: sender?.id, 
    receiverUsername: receiver?.username || "Unknown",
    receiverId: receiver?.id,
    productTitle: listing?.title || "Unknown",
    listingId: listing?.product_id
  };
});

    // console.log(userMessages); 
    console.log(uniqueChats); 

    const handleClick = (receiverId, listingId, receiverUsername, userId) => {
        setListingID(listingId);
        setReceiverID(receiverId); 
        setUsernameReceiver(receiverUsername); 
        setSenderID(userId); 
        // console.log(" Receiver username " + receiverUsername); 
        setIsChatting(true); 
        // console.log("clicking user" + receiverId + " with listing " + listingId)
    }

    // I need the receiver username and the product name from listing 

    return(
        <>
            <Header></Header>
            <div className="chat-body">
                <div className="Sendor-container" >
                    <div className="Sender-title">
                        <h2 className="title-edit" >
                            {uniqueChats[0].senderUsername}
                        </h2>
                    </div>
                    <div className="sender-listings" >
                        {
                            uniqueChats.map((chat) => (
                                <div className="individual-chat" key={chat.receiverId} onClick={() =>handleClick(chat.receiverId, chat.listingId, chat.receiverUsername, chat.userId)}>
                                    <img src={image} alt="imgae" width={100} height={100}/>
                                    <div className="indv-chat-name">
                                        <h4>
                                            {chat.receiverUsername}
                                        </h4>
                                        <p>
                                            {chat.productTitle}
                                        </p>
        
                                    </div>
                                
                                </div>
                            ))
                        }
                       
                    </div>
                </div>
                <div className="Chat-log-container" > 
                {ischatting ? (
                        <ChatLog receiverID={receiverID} listingID={listingID} usernameReceiver={usernameReceiver} senderID={senderID}/>
                    ) : (
                        <div>Click to chat</div>
                    )}
                    
                </div>
                
            </div>
        </>
    )

}

export default Chats