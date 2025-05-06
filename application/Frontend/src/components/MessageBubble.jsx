import React from 'react';
import { useState, useEffect } from "react";
import '../courierPage.css';


const MessageBubble = ({ id, 
    handleSendMessage, // for backend implementation, uncomment the line
    messageStates // for backend implementation, uncomment the line
  }) => {
      const [messageText, setMessageText] = useState('');
    
      const handleSendClick = () => {
        if (messageText.trim() !== '') {
            // handleSendMessage(id);
          // for backend implementation, uncomment the lines below
          handleSendMessage(id, messageText); // pass the actual text to the function
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
                //NOTE (delete later): THIS BUTTON DOESNT WORK. WHY. WHAT WENT WRONG. IM GOINGT O EXPLODE IT.
              <button className="see-convo-btn">See Conversation</button>
            )}
          </div>
        </div>
      );
    };

    export default MessageBubble;