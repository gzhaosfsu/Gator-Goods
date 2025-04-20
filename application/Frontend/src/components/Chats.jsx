import Header from "./Header"
import ChatLog from "./ChatLog"
import image from "./images/LogoGG.png"
import "../Chat.css"


const Chats = () => {

    // List of things I always need 
    // 1. I need current user Id 
    // 2. From user Id I can gather their username, and all messages 
    // 


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