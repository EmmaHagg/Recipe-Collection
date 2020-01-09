import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

// NR 2 -> Tar emot info från Chat

class MessageList extends React.Component {
    
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    
    }

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }

        return (
            <div className="message-list">

                {/* 
                State kan bara leva i en komponent, vilket gör att vi tar emot de
                nya värderna med porps när det skickats neråt !
                */}

                {this.props.messages.map((message, key) => {
                    return (
                        // Skickar information neråt till Message komponenten
                        // Så vi kan använda eller skriva ut dem där
                        <Message key={message.id} username={message.senderId} text={message.text} />
                    )
                })}
            </div>
        )
    }
}

export default MessageList