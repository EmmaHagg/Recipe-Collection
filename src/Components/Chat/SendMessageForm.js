import React from 'react'

class SendMessageForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    /*
    e = event
    CLG e.target.value visar vad som skrivs in i input fältet

    Uppdaterar state (messange) med vad som skrivs in i input fältet
    */
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    /*
    Information skickas från chat.js så att denna komponent kan låna infon.
    Flödet skickas i fel ordning. Från parent till child  
    */
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form
            /* 
            kallar på handlesubmit funktionen efter att du submitat formuläret
            */
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    /* Lyssnar efter förändringar i input fältet */
                    onChange={this.handleChange}
                    /* Sätter värdet på input fältet till vad message är */
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm