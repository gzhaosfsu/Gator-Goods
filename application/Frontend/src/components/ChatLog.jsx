import "../Chat.css"
import image from "./images/imageNA.png"
import {directMessage} from "../chatDummyData"
import SendIcon from '@mui/icons-material/Send';


const ChatLog = ({receiverID, listingID, usernameReceiver, senderID}) => {


    const conversation = directMessage.filter(msg => {
        const isBetweenUsers = 
            (msg.sender_id === senderID && msg.receiver_id === receiverID) ||
            (msg.sender_id === receiverID && msg.receiver_id === senderID);
          
        const isSameListing = msg.listing_id === listingID;
          
        return isBetweenUsers && isSameListing;
    });
       



    return (
        <>
            
            <div className="chat-log-title" >
                <img src={image} alt="imgae" width={70} height={70}/>
                <h2 className="reciever-username">
                    {usernameReceiver}
                </h2>
            </div>
            <div className="chat-log" >
                {
                    conversation.map((message) => (
                        <div  key={message.message_id} className={`chat-message ${message.sender_id === senderID ? 'sent' : 'received'}`} >
                            <p>{message.content}</p>
                        </div>
                    ))
                }
            </div>
            <div className="message-box" >
                <input className="message-text" placeholder="Message...."/>
                <span className="sendIcon" >
                    <SendIcon/>
                </span>
            </div>
            
        </>
    )
}

export default ChatLog