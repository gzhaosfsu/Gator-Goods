import "../Chat.css"
import image from "./images/imageNA.png"
import {directMessage} from "../chatDummyData"
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from "react"


const ChatLog = ({receiverID, listingID, usernameReceiver, senderID}) => {
    const [conversation, setConversation] = useState([]);
    const [istyping, setIsTyping] = useState(false); 
    const [drafts, setDrafts] = useState({});

       

useEffect(() => {
    if(senderID && senderID && listingID) {
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
    }

    

}, [senderID, receiverID, listingID]);

const handleInputChange = (e) => {
    const newMessage = e.target.value;

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

const handleMessage = () => {
    const currentMessage = drafts[receiverID] || '';

    if (currentMessage.trim()) {
        // Send message logic here...

        fetch("api/direct_message", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender_id: senderID,  // Corrected to pass the variable properly
              receiver_id: receiverID,
              listing_id: listingID,
              content: currentMessage,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "data");
            })
            .catch((err) => {
              console.error("Error:", err);
            });



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
    </>
)
}

export default ChatLog