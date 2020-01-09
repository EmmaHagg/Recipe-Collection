import React from 'react'

// Nr 3 -> Barn barn till Chat

// Varje meddelande som skrivs ut är en egen komponent
function Message(props) {  
  
    return (
        <div className="message">
            {/* Vi måste referera till props och den porpsen vi skickat in från MessageList som vi vill skriva ut */}
            <div className="message-username">{props.username}</div>
            <div className="message-text">{props.text}</div>
        </div>
    )
}

export default Message