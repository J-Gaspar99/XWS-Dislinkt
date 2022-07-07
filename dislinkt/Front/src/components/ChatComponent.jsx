import React, { Component } from 'react';

import axios from 'axios';
class ChatComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           messages: [],
           text: ''
           
            
        }
        

        this.createMessage = this.createMessage.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        
    }

    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
        
    }
    
    createMessage() {
        let activeChat =  JSON.parse(localStorage.getItem('activeChat'));
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let activeFriend =  JSON.parse(localStorage.getItem('activeFriend'));
       let  d = new Date();
       
        let newMessage = {
           
            senderId :activeUser.id,
            receiverId: activeFriend.id,
            senderUserName :activeUser.userName,
            receiverUserName: activeFriend.userName,
            text: this.state.text,
            chatId:activeChat.id,
            time: d,
            

        }
        console.log(newMessage);

        axios.post("http://localhost:8088/message", newMessage).then((res) => {
            console.log(newMessage);
            });

            window.location.reload(false);
    } 
 
    mount(activeChat){
        
        axios.get("http://localhost:8088/message/chatId/"+ activeChat.id).then((res) => {
            this.setState({messages:res.data});
            setTimeout(this.mount(activeChat) , 1000);
            });
             
        
    }
    
   
    componentDidMount(){
        
       
        let activeChat = JSON.parse(localStorage.getItem('activeChat'));

    this.mount(activeChat);
        
    
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">Our messages</h2>

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Sender username</th>
                                    <th>Receiver username</th>
                                    <th>Message</th>
                                    
                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.messages.map(
                                        messages =>
                                        <tr key= {messages.id}>
                                            <td>{messages.senderUserName}</td>
                                            <td>{messages.receiverUserName}</td>
                                            <td>{messages.text}</td>
                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                            
                        </table>
                        
                    </div>
                    
                </div>
                <input style={{position:'absolute',top:'154px'}} name="name" value={this.state.text} onChange={this.changeTextHandler}></input>
                            <button style={{position:'absolute',top:'150px',left:'440px'}} onClick={() => this.createMessage()} className="loginbtn">Message</button>
                
            </div>
        );
    }
}

export default ChatComponent;