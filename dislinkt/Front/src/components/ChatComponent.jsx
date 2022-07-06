import React, { Component } from 'react';

import axios from 'axios';
class ChatComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           messages: [],
           messages2: [],
           messages3: [],
           text: ''
           
            
        }
        

        this.createMessage = this.createMessage.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        
    }

    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
        
    }
    
    createMessage() {
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let activeFriend =  JSON.parse(localStorage.getItem('activeFriend'));
        let newMessage = {
            id:this.state.id,
            senderId :activeUser.id,
            receiverId: activeFriend.id,
            senderUserName :activeUser.userName,
            receiverUserName: activeFriend.userName,
            text: this.state.text,
            chatId:'',
            time: ''
            

        }

        axios.post("http://localhost:8088/message", newMessage).then((res) => {
            console.log(newMessage);
            });

            window.location.reload(false);
    } 
 
    
   
    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeFriend = JSON.parse(localStorage.getItem('activeFriend'));
        axios.get("http://localhost:8088/message/senderId/receiverId/" + activeUser.id + '/' + activeFriend.id).then((res)=>{
            this.setState({messages3: res.data });
           // console.log(this.state.messages3);
            axios.get("http://localhost:8088/message/senderId/receiverId/" + activeFriend.id + '/' + activeUser.id).then((res2)=>{
          
        
                this.setState({messages2: res2.data });
               // console.log(this.state.messages2);
                
                  
            });

            
         //this.setState({messages: [].concat(this.state.messages3,this.state.messages2)});
         //console.log(this.state.messages);
        
        });
        

      
    
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
                                    <th>Rreceiver username</th>
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