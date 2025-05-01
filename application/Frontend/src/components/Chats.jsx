import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/imageNA.png"
import React, { useState, useEffect } from "react"
import "../Chat.css"
import {directMessage, registeredUsers, listings} from "../chatDummyData"; 
import {UserContext} from "../UserContext"
import {useContext} from "react"

const Chats = () => {

    // const {user} = useContext(UserContext);
    
    // console.log(user.id + " user Id "); 
    // Object.entries(user).forEach(([key, value]) => {
    //     console.log(`Key: ${key}, Value: ${value}`);
    //   });

      
    // console.log(Object.entries(user).length + " number of entries");



    const [ischatting, setIsChatting] = useState(false);
    const [receiverID, setReceiverID] = useState(0);
    const [listingID, setListingID] = useState(0);
    const [senderID, setSenderID] = useState(0);
    const [usernameReceiver, setUsernameReceiver] = useState(""); 
    const [userMessages, setUserMessages] = useState([]); 
    const [uniqueChats, setUniqueChats] = useState([]); 
    const [loading, setLoading] = useState(true);



  const currentUserID = 3; 


useEffect(() => {
    fetch(`/api/direct_message/${currentUserID}`)
      .then((res) => res.json())
      .then(async (data) => {
        const uniqueMessage = data.filter((msg, index, self) => {
          return index === self.findIndex((m) => m.listing_id === msg.listing_id);
        });
  
        const chatdisplay = await Promise.all(
          uniqueMessage.map(async (msg) => {
            try {
              const [senderRes, receiverRes, listingRes] = await Promise.all([
                fetch(`/api/user/${msg.sender_id}`),
                fetch(`/api/user/${msg.receiver_id}`),
                fetch(`/api/listing/${msg.listing_id}`),
              ]);
  
              const [senderData, receiverData, listingData] = await Promise.all([
                senderRes.json(),
                receiverRes.json(),
                listingRes.json(),
              ]);

  
              return {
                message_id: msg.message_id,
                senderUsername: senderData[0].username || "Unknown",
                userId: senderData[0].user_id,
                receiverUsername: receiverData[0].username || "Unknown",
                receiverId: receiverData[0].user_id,
                productTitle: listingData[0].title || "Unknown",
                listingId: listingData[0].product_id,
              };
            } catch (error) {
              console.error("Error fetching message details:", error);
              return null;
            }
          })
        );
  
        // Remove any failed fetch results (null)
        // console.log("here", chatdisplay); 
        setUniqueChats(chatdisplay.filter((chat) => chat !== null));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching direct messages:", err);
        setLoading(false);
      });

      console.log("Here" , uniqueChats); 
  }, []);

  

    const handleClick = (receiverId, listingId, receiverUsername, userId) => {


        setListingID(listingId);
        setReceiverID(receiverId); 
        setUsernameReceiver(receiverUsername); 
        setSenderID(userId); 
        setIsChatting(true); 

    }

    // I need the receiver username and the product name from listing 

    return(
        <>
        {loading ? (
            <div>Loading...</div> // Or a spinner, skeleton, etc.
        ) : (
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

        )}

           
        </>
    )

}

export default Chats