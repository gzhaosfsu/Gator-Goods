import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/imageNA.png"
import React, { useState, useEffect } from "react"
import "../Chat.css"
import {directMessage, registeredUsers, listings} from "../chatDummyData"; 
import {UserContext} from "../UserContext"
import {useContext} from "react"

const Chats = () => {

    const {user} = useContext(UserContext);
    
    console.log(user.id + " user Id "); 
    Object.entries(user).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });

      
    console.log(Object.entries(user).length + " number of entries");



    const [ischatting, setIsChatting] = useState(false);
    const [receiverID, setReceiverID] = useState(0);
    const [listingID, setListingID] = useState(0);
    const [senderID, setSenderID] = useState(0);
    const [usernameReceiver, setUsernameReceiver] = useState(""); 
    //const [userMessages, setUserMessages] = useState([]); 
    //const [uniqueChats, setUniqueChats] = useState([]); 
    //const [sender, setSender] = useState([]); 
    //const [receiver, setReceiver] = useState([]);
    //const [listing, setListing] = useState([]);


  const currentUserID = 2; 


  // Filtering based on current User and unique listing from direct message table 
  const userMessages = directMessage
  .filter(msg => msg.sender_id === currentUserID)
  .filter((msg, index, self) =>
    index === self.findIndex(m => m.listing_id === msg.listing_id)
  );

    // request for current User and unique listing from direct message table 
//   useEffect(() => {
//     fetch('http://localhost:3001/api/directmessage?q=${user_id}')
//       .then((response) => response.json())
//       .then((data) => {
//          const uniqueMessage = data.filter((index, self) => {
//          index === self.findIndex(m => m.listing_id === msg.listing_id) })
//         setUserMessages(uniqueMessage); 
//       })
//       .catch((error) => {
//         console.error("Error fetching featured items:", error);
//       });


    // const chatdisplay = userMessages.map(msg => {
    
    //       fetch('http://localhost:3001/api/registerUser?q=${msg.sender_id}')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setSender(data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching featured items:", error);
    //       });

    //       fetch('http://localhost:3001/api/registerUser?q=${msg.receiver_id}')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setReceiver(data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching featured items:", error);
    //       });

    //       fetch('http://localhost:3001/api/listing?q=${msg.listing_id}')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setListing(data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching featured items:", error);
    //       });

        // return{
        //     message_id: msg.message_id,
        //     senderUsername: sender?.username || "Unknown",
        //     userId: sender?.id, 
        //     receiverUsername: receiver?.username || "Unknown",
        //     receiverId: receiver?.id,
        //     productTitle: listing?.title || "Unknown",
        //     listingId: listing?.product_id
        // };

    // });

//   }, []); 


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
                                    <img src={image} alt="imgae" width={65} height={65}/>
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
                        <div>
                            <h1>
                                Click to start a chat
                            </h1>
                        </div>
                    )}
                    
                </div>
                
            </div>
        </>
    )

}

export default Chats