import "../Chat.css"
import image from "./images/marthaPortrait.jpeg"

const ChatLog = () => {


    return (
        <>
            
            <div className="chat-log-title" >
                <img src={image} alt="imgae" width={80} height={80}/>
                <h2>
                    CurrentUserName
                </h2>
            </div>
            <div className="chat-log" >
                
            </div>
            <div className="message-box" >

            </div>
            
        </>
    )
}

export default ChatLog