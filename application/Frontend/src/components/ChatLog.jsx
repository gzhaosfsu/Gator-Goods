import "../Chat.css"
import image from "./images/imageNA.png"
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from "react"
import {UserContext} from "../UserContext"
import {useContext} from "react"


const ChatLog = ({receiverID, listingID, usernameReceiver, senderID, listingImage}) => {
    const {user} = useContext(UserContext);
    const [conversation, setConversation] = useState([]); // holds the conversation between users 
    const [istyping, setIsTyping] = useState(false); // handles css when user is typing 
    const [drafts, setDrafts] = useState({}); // we want to temporarly store the user conversation when on chat feature only 

        
    
const getConversation = () => {

    // get request for messages 
    fetch(`/api/direct_message`)
        .then((res) => res.json())
        .then((data) => {
            // This make sure we get all conversation between the users
            const filtered = data.filter(msg => {
            const isBetweenUsers = 
              (msg.sender_id === senderID && msg.receiver_id === receiverID) ||
              (msg.sender_id === receiverID && msg.receiver_id === senderID);
            
            const isSameListing = msg.listing_id === listingID;
            
            return isBetweenUsers && isSameListing;
          });
  

          setConversation(filtered);
          console.log("HERE: ", filtered); 
        })
        .catch(err => {
          console.error("Error fetching messages:", err);
        });
}    

useEffect(() => {
    // this will render when a new chat is selected
    if(senderID && senderID && listingID) {
        getConversation(); 
    }

    

}, [senderID, receiverID, listingID]);

const handleInputChange = (e) => {
    const newMessage = e.target.value;
    
    // this deals with the holding draft message has typed but not sent 
    setDrafts((prevDrafts) => ({
        ...prevDrafts,
        [receiverID]: newMessage
    }));

    if((e.target.value).length !== 0 ) {
        setIsTyping(true); 
    } else {
        setIsTyping(false); 
    }
};

 const handleMessage = () => { // method deals with post request of the user conversation and when they have sent message it renders the sent message
    
    const currentMessage = drafts[receiverID] || '';

    if (currentMessage.trim()) {
        // Send message logic here...
        const receiver = receiverID !== user.user_id ? receiverID : senderID;

        fetch("api/direct_message", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender_id: user.user_id,  // Corrected to pass the variable properly
              receiver_id: receiver,
              listing_id: listingID,
              content: currentMessage,
            }),
          })
            .then((res) => res.json())
            .then((data) => {


            })
            .catch((err) => {
              console.error("Error:", err);
            });

            setTimeout(getConversation, 100); 

        setDrafts((prevDrafts) => ({
            ...prevDrafts,
            [receiverID]: ''
        }));

        setIsTyping(false);
    }
};


return (
    <>
        <div className="chat-log-title">
            <img src={listingImage ? listingImage : image} alt="image" width={70} height={70} />
            <h2 className="reciever-username">{usernameReceiver}</h2>
        </div>

        <div className="chat-log">
            {conversation.map((message) => {
                const isSentByMe = message.sender_id === user.user_id;
                return (
                <div key={message.message_id} className={`chat-message ${isSentByMe ? 'sent' : 'received'}`}>
                    <p>{message.content}</p>
                </div>
                );
            })} 
        </div>
        <div>
            <div className={`message-box ${istyping ? 'typing' : ''}`}>
                <input
                    className="message-text"
                    placeholder="Message..."
                    type="text"
                    value={drafts[receiverID] || ''}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleMessage()}
                />
                <span className="sendIcon" onClick={handleMessage}>
                    <SendIcon />
                </span>
            </div>
        </div>

    </>
)
}

export default ChatLog