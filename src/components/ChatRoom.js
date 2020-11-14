import React, { Component } from 'react';
import firebase from 'firebase'

class ChatRoom extends Component {
     constructor() {
         super();
         this.updateMessage = this.updateMessage.bind(this);
         this.submitMessage = this.submitMessage.bind(this);
         this.state = {
             message: '',
             messages: [],
         }
     }
     
     componentDidMount() {
         firebase.database().ref('messages/').on('value', snapshot => {
             const currentMessages = snapshot.val();
             if(currentMessages != null ){
                 this.setState({
                     messages: currentMessages
                 })
             }
         })
     }
     updateMessage(e) {
        this.setState({ 
            message: e.target.value
        })
     }

     submitMessage() {
         const message = {
            id: this.state.messages.length,
            text: this.state.message
         };

        firebase.database().ref('messages/' + message.id).set(message);
        //  let listMessages = this.state.messages;
        //  listMessages.push(message);
        //  this.setState({
        //      messages: listMessages
        //  });

         this.setState({ message: ''})
     }
    render() {
        const currentMessages = this.state.messages.map((message, i ) => {
            return(
                <li className="list-group-item list-group-item-action" key={message.id}>{message.text}</li>
            )
        })
        return (
            <div className="card">
                <div className="card-body">
                    <ul className="list-group">
                        {currentMessages}
                    </ul>
                </div>
                <div className="card-footer">
                    <input 
                    value={this.state.message}
                    onChange={this.updateMessage}
                    type="text" 
                    placeholder="Write your message"
                    className="form-control"
                    />
                    <button  
                    onClick={this.submitMessage}
                    className="btn btn-primary btn-block">
                    Send Message
                    </button>
                </div>
            </div>
        )
    }
}

export default ChatRoom;