import React from 'react';
import { useState, useEffect } from "react";
import '../courierPage.css';


const MessageBubble = ({ id, buyerId, handleSendMessage, messageStates
  }) => {
      const [messageText, setMessageText] = useState('');
    
      const handleSendClick = () => {
        if (messageText.trim() !== '') {
          console.log("Sending message:", messageText);
          handleSendMessage(buyerId, messageText, id); // pass the actual text to the function
          setMessageText(''); // Optionally clear the input after sending
          console.log("Message sent to buyerId:", buyerId); // Make sure this is not undefined or null

        }
      };
  
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
              <button className="see-convo-btn">See Conversation</button>
            )}
          </div>
        </div>
      );
    };

    export default MessageBubble;