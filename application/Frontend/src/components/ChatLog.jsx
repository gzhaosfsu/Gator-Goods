import "../Chat.css"
import image from "./images/imageNA.png"
import {directMessage} from "../chatDummyData"
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from "react"


const ChatLog = ({receiverID, listingID, usernameReceiver, senderID}) => {
    const [conversation, setConversation] = useState([]);
    const [messageText, setMessageText] = useState('');

       

useEffect(() => {

    fetch(`/api/direct_message`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(msg => {
          const isBetweenUsers = 
            (msg.sender_id === senderID && msg.receiver_id === receiverID) ||
            (msg.sender_id === receiverID && msg.receiver_id === senderID);
          
          const isSameListing = msg.listing_id === listingID;
          
          return isBetweenUsers && isSameListing;
        });

        console.log("Here", filtered); 
        setConversation(filtered);
      })
      .catch(err => {
        console.error("Error fetching messages:", err);
      });

}, [senderID, receiverID, listingID]);

const handleInputChange = (e) => {
    setMessageText(e.target.value);
};

const handleMessage = () => {
    if (messageText.trim()) {
        
        setMessageText(''); // clear input
        console.log("sent")
    }
};


return (
    <>
        <div className="chat-log-title">
            <img src={image} alt="image" width={70} height={70} />
            <h2 className="reciever-username">{usernameReceiver}</h2>
        </div>

        <div className="chat-log">
            {conversation.map((message) => (
                <div
                    key={message.message_id}
                    className={`chat-message ${message.sender_id === senderID ? 'sent' : 'received'}`}
                >
                    <p>{message.content}</p>
                </div>
            ))}
        </div>

        <div className="message-box">
            <input
                className="message-text"
                placeholder="Message..."
                type="text"
                value={messageText}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleMessage()}
            />
            <span className="sendIcon" onClick={handleMessage}>
                <SendIcon />
            </span>
        </div>
    </>
)
}

export default ChatLog