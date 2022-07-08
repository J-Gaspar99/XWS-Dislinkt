import React, { Component } from 'react';

import axios from 'axios';
class ChatComponent extends Component {
    constructor(props) {
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
        let activeChat = JSON.parse(localStorage.getItem('activeChat'));
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeFriend = JSON.parse(localStorage.getItem('activeFriend'));
        let d = new Date();

        let newMessage = {

            senderId: activeUser.id,
            receiverId: activeFriend.id,
            senderUserName: activeUser.userName,
            receiverUserName: activeFriend.userName,
            text: this.state.text,
            chatId: activeChat.id,
            seen: 0,
            time: d,


        }


        axios.post("http://localhost:8088/message", newMessage);

        axios.get("http://localhost:8082/follows/followerandfollowing/" + activeFriend.id + "/" + activeUser.id).then((res) => {

            let updatedFollow = {
                id: res.data.id,
                followerId: res.data.followerId,
                followingId: res.data.followingId,
                followerUserName: res.data.followerUserName,
                followingUserName: res.data.followingUserName,
                newMessages: res.data.newMessages + 1,
                newPosts: res.data.newPosts
            };
            axios.put("http://localhost:8082/follows/" + res.data.id, updatedFollow);


        });

        window.location.reload(false);
    }




    mount(activeChat, activeUser,activeFriend) {

        axios.get("http://localhost:8088/message/chatId/" + activeChat.id).then((res) => {


            for (const key in res.data) {

                if (res.data[key].receiverId == activeUser.id) {            //stavljanje seena na 1



                    let updatedMessage = {
                        id: res.data[key].id,
                        senderId: res.data[key].senderId,
                        receiverId: res.data[key].receiverId,
                        senderUserName: res.data[key].senderUserName,
                        receiverUserName: res.data[key].receiverUserName,
                        text: res.data[key].text,
                        chatId: res.data[key].chatId,
                        seen: 1,
                        time: res.data[key].time,

                    };
                    axios.put("http://localhost:8088/message/" + res.data[key].id, updatedMessage);
                    res.data[key].seen = 1;
                };

            }

            //updatovanje newMessages

            axios.get("http://localhost:8082/follows/followerandfollowing/" + activeUser.id + "/" + activeFriend.id ).then((res) => {

                let updatedFollow = {
                    id: res.data.id,
                    followerId: res.data.followerId,
                    followingId: res.data.followingId,
                    followerUserName: res.data.followerUserName,
                    followingUserName: res.data.followingUserName,
                    newMessages: 0,
                    newPosts: res.data.newPosts
                };
                axios.put("http://localhost:8082/follows/" + res.data.id, updatedFollow);


            });

            //setovanje stranice i loop
            this.setState({ messages: res.data });

            setTimeout(this.mount(activeChat, activeUser,activeFriend), 1000);
        });


    }


    componentDidMount() {


        let activeChat = JSON.parse(localStorage.getItem('activeChat'));
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeFriend = JSON.parse(localStorage.getItem('activeFriend'));

        this.mount(activeChat, activeUser,activeFriend);


    }
    render() {
        return (
            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />

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
                                            <tr key={messages.id}>
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
                <input style={{ position: 'absolute', top: '154px' }} name="name" value={this.state.text} onChange={this.changeTextHandler}></input>
                <button style={{ position: 'absolute', top: '150px', left: '440px' }} onClick={() => this.createMessage()} className="loginbtn">Message</button>

            </div>
        );
    }
}

export default ChatComponent;