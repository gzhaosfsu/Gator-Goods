import React from 'react';
import { useState, useEffect } from "react";
import '../courierPage.css';
import { Link } from 'react-router-dom';


const MessageBubble = ({ id, buyerId, handleSendMessage, messageStates, setMessageStates
  }) => {

    useEffect(() => {
    console.log("MessageBubble messageStates updated:", JSON.stringify(messageStates, null, 2));
  }, [messageStates]);

    console.log("buyerId inside MessageBubble:", buyerId);
      const [messageText, setMessageText] = useState('');
    
      const handleSendClick = () => {
        if (messageText.trim() !== '') {
          console.log("Sending message:", messageText);
          handleSendMessage(buyerId, messageText, id); // pass the actual text to the function
          setMessageText(''); // Optionally clear the input after sending
          console.log("Message sent to buyerId:", buyerId); // Make sure this is not undefined or null

        setMessageStates((prev) => ({
        ...prev,
        [buyerId]: true
      }));
    }
  };

  console.log("Rendering MessageBubble for buyerId:", buyerId, "messageStates:", messageStates);
  console.log("Condition messageStates[buyerId]:", messageStates[String(buyerId)]);
  
      return (
        <div className="message-section">
          <div className="message-bubble">
            <p className="message-label">Send buyer a message</p>
            {!messageStates[buyerId] ? (
              <div className="message-input-row">
                <input
                  type="text"
                  className="message-input"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="I will deliver the item and need payment"
                />
                <button className="send-btn" onClick={handleSendClick}>SEND</button>
              </div>
            ) : (
              <Link to= "/Chats" className="see-convo-btn">See Conversation</Link>
            )}
          </div>
        </div>
      );
    };

    export default MessageBubble;