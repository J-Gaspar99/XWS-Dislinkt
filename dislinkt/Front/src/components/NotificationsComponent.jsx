import React, { Component } from 'react';

import axios from 'axios';
class NotificationsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           friends: [],
           followRequests:''
           
            
        }
        

        this.viewChat = this.viewChat.bind(this);
        
        
        
    }
    viewChat(id){   
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
       
        axios.get("http://localhost:8089/chat/chatter1idchatter2id/"+ activeUser.id + "/" + id).then(res => {
            if (res.data.id == null){
                axios.get("http://localhost:8089/chat/chatter1idchatter2id/"+ id + "/" + activeUser.id).then(res2 => {

                    localStorage.setItem('activeChat', JSON.stringify(res2.data));
                    axios.get("http://localhost:8081/user/"+ id).then(res3 => {

                        localStorage.setItem('activeFriend', JSON.stringify(res3.data));
                    });
                    
                    this.props.history.push('/chat');
                });

            }
            else {
                localStorage.setItem('activeChat', JSON.stringify(res.data));
                axios.get("http://localhost:8081/user/"+ id).then(res3 => {

                        localStorage.setItem('activeFriend', JSON.stringify(res3.data));
                    });
                this.props.history.push('/chat');

            };
        });
        

    }

    viewPosts(id){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8081/user/" + id).then(response => {
        localStorage.setItem('activeFriend', JSON.stringify(response.data));
        this.props.history.push('/loggedviewposts');
    });


    axios.get("http://localhost:8082/follows/followerandfollowing/" + activeUser.id + "/" + id ).then((res) => {

                let updatedFollow = {
                    id: res.data.id,
                    followerId: res.data.followerId,
                    followingId: res.data.followingId,
                    followerUserName: res.data.followerUserName,
                    followingUserName: res.data.followingUserName,
                    newMessages: res.data.newMessages,
                    newPosts: 0
                };
                axios.put("http://localhost:8082/follows/" + res.data.id, updatedFollow);


            });


    }
 
    mount(activeUser){
        axios.get("http://localhost:8082/follows/follower/" + activeUser.id).then((res)=>{  //setting friends
        this.setState({friends: res.data});

        axios.get("http://localhost:8083/followrequest/following/" + activeUser.id).then((res2)=>{     //setting followRequests

        this.setState({followRequests: res2.data.length});
        console.log(res2.data.length)

        setTimeout(this.mount(activeUser), 1000);
        });

         
    });
    }
   
    viewFollowRequest(){
        this.props.history.push("/followrequests")
    }

    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        
        
          this.mount(activeUser);
            
               
        
        

      
    
    } 

    
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">Notifications</h2>
                    <button style={{ position: 'absolute', top: '150px', left: '440px' }} onClick={() => this.viewFollowRequest()} className="loginbtn">Follow requests</button>
                    <label style={{ position: 'absolute', top: '150px', left: '600px' }} >{this.state.followRequests}</label>
                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Username</th>
                                    
                                    <th>Action</th>
                                    <th>New messages</th>
                                    <th>Action</th>
                                    <th>New posts</th>

                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.friends.map(
                                        friends =>
                                        <tr key= {friends.id}>
                                            <td>{friends.followingUserName}</td>
                                            
                                           
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.viewChat(friends.followingId)} className="loginbtn">Chat</button>
                                                
                                            </td>
                                            <td>
                                                {friends.newMessages}
                                               
                                            </td>
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.viewPosts(friends.followingId)} className="loginbtn">Posts</button>
                                                
                                            </td>
                                            <td>
                                            {friends.newPosts}
                                                
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationsComponent;