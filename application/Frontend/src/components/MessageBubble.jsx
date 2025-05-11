import React from 'react';
import { useState, useEffect } from "react";
import '../courierPage.css';


const MessageBubble = ({ id, buyerId, courierId, handleSendMessage, messageStates
  }) => {
      const [messageText, setMessageText] = useState('');
    
      const handleSendClick = () => {
        if (messageText.trim() !== '') {
          handleSendMessage(id, messageText, buyerId, courierId); // pass the actual text to the function
          setMessageText(''); // Optionally clear the input after sending
        }
      };
  
      return (
        <div className="message-section">
          <div className="message-bubble">
            <p className="message-label">Send buyer a message</p>
            {!messageStates[id] ? (
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