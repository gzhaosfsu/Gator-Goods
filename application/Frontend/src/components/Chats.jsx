import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/LogoGG.png"
import "../Chat.css"


const Chats = () => {

    const directMessage = [
        {
          message_id: 1,
          sender_id: 101,
          receiver_id: 202,
          content: "Hey, is this item still available?",
          timestamp: "2025-04-20T10:15:00Z",
          listing_id: 301
        },
        {
          message_id: 2,
          sender_id: 202,
          receiver_id: 101,
          content: "Yes, it's still available. Are you interested?",
          timestamp: "2025-04-20T10:16:30Z",
          listing_id: 301
        },
        {
          message_id: 3,
          sender_id: 103,
          receiver_id: 204,
          content: "Can you lower the price a bit?",
          timestamp: "2025-04-19T17:42:12Z",
          listing_id: 302
        },
        {
          message_id: 4,
          sender_id: 202,
          receiver_id: 103,
          content: "What price are you thinking?",
          timestamp: "2025-04-19T17:45:00Z",
          listing_id: 302
        },
        {
          message_id: 5,
          sender_id: 105,
          receiver_id: 206,
          content: "I can pick it up tomorrow if that works for you.",
          timestamp: "2025-04-18T09:20:00Z",
          listing_id: 303
        }
      ];

    // List of things I always need 
    // 1. I need current user Id 
    // 2. From user Id I can gather their username, and all messages 
    // 

    const currentUserID = 202; 


    const sentMessages = directMessage.filter(msg => msg.sender_id === currentUserID);
    const uniqueReceiverIds = [...new Set(sentMessages.map(msg => msg.receiver_id))];
  
    console.log("here : " + uniqueReceiverIds); 


    return(
        <>
            <Header></Header>
            <div className="chat-body">
                <div className="Sendor-container" >
                    <div className="Sender-title">
                        <h2 className="title-edit" >
                            UserName
                        </h2>
                    </div>
                    <div className="sender-listings" >
                        
                        <div className="individual-chat">
                            <img src={image} alt="imgae" width={100} height={100}/>
                            <div className="indv-chat-name">
                                <h4>
                                    username
                                </h4>
                                <p>
                                    product name
                                </p>

                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="Chat-log-container" > 
                    <ChatLog/>
                </div>
                
            </div>
        </>
    )

}

export default Chats