import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/imageNA.png"
import React, { useState, useEffect } from "react"
import "../Chat.css"
import {directMessage, registeredUsers, listings} from "../chatDummyData"; 
import {UserContext} from "../UserContext"
import {useContext} from "react"

const Chats = () => {
    // This is how we access current user
    const {user} = useContext(UserContext);


    const [ischatting, setIsChatting] = useState(false); // will display the user conversation with selected person
    const [receiverID, setReceiverID] = useState(0); // hold the value of receiver ID aka person user is chatting with
    const [listingID, setListingID] = useState(0); // each chat is connected with listing 
    const [senderID, setSenderID] = useState(0); // we need to also track the user 
    const [usernameReceiver, setUsernameReceiver] = useState("");  // this hold the username of the person chatting with 
    const [userMessages, setUserMessages] = useState(true); // toggles between if the user has ever chatted with anyone 
    const [uniqueChats, setUniqueChats] = useState([]); // this holds all the unque chats the user has talked to
    const [loading, setLoading] = useState(true); // We have to make sure we are able to fetch all requiremts before it renders the page 
    const [isSelected, setIsSelected] = useState(null); // handles css highlight 

  

  // const currentUserID = user.user_id; 
  const currentUserID = user.user_id; // this is the current user signed in Id 


useEffect(() => {
  // this will fetch all messages from the current user 
    fetch(`/api/direct_message/${currentUserID}`)
      .then((res) => res.json())
      .then(async (data) => {

        if(data.length < 1 ) { // if user does not have chat history 
          setUserMessages(false);  // diplay different message
          setLoading(false);
        } else {
          // else we get all messages my unique listings 
          const uniqueMessage = data.filter((msg, index, self) => {
            return index === self.findIndex((m) => m.listing_id === msg.listing_id);
          });

          // this will gather all information from those unique chats based on the listings
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
    
          
          setUniqueChats(chatdisplay.filter((chat) => chat !== null));
          setLoading(false);
        }

        
      })
      .catch((err) => {
        console.error("Error fetching direct messages:", err);
        setLoading(false);
      });

  }, []);

  

    const handleClick = (receiverId, listingId, receiverUsername, userId) => {
      // This will handle the selected person the user wants to conitnue chatting with and display 
      // their conversation log

      setIsSelected(receiverId); 
      setListingID(listingId);
      setReceiverID(receiverId); 
      setUsernameReceiver(receiverUsername); 
      setSenderID(userId); 
      setIsChatting(true); 
       
        

    } 

    return(
        <>
        {loading ? (
            <div>Loading...</div> // Or a spinner, skeleton, etc.
        ) : (
           <> 
                <div className="chat-body">
                  <div className="Sendor-container" >
                        <div className="Sender-title">
                            <h2 className="title-edit" >
                                {user.username}
                            </h2>
                        </div>
                        {userMessages ? (
                          <div className="sender-listings" >
                            {
                                uniqueChats.map((chat) => (
                                    <div className={`individual-chat ${isSelected === chat.receiverId ? 'selected' : ''}`} key={chat.receiverId} onClick={() =>handleClick(chat.receiverId, chat.listingId, chat.receiverUsername, chat.userId)}>
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
                        ) : (
                          <div className="sender-listings">
                            No users to chat with 
                          </div>
                        )}
                        
                  </div>

                  {userMessages ? (
                    <div className="Chat-log-container" > 
                        {ischatting ? (
                              <ChatLog 
                              receiverID={receiverID} 
                              listingID={listingID} 
                              usernameReceiver={usernameReceiver} 
                              senderID={senderID} 
                            />
                          ) : (
                              <div>
                                  <h1>
                                      Click to start a chat
                                  </h1>
                              </div>
                          )}
                          
                      </div>
                  ) : (
                    <div className="Chat-log-container">
                      No users to chat with
                    </div>
                  )}
                      
                    
                </div>
           </>

        )}

           
        </>
    )

}

export default Chats