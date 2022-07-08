import React, { Component } from 'react';

import axios from 'axios';
class MyFriendsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           friends: []
           
            
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
 
    
   
    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        
        axios.get("http://localhost:8082/follows/follower/" + activeUser.id).then((res)=>{
          
            this.setState({friends: res.data});
            console.log(this.state.friends);
               /*let tmpArray=[];
                for(const key in res.data){
                   
                   tmpArray[key]=res.data[key].followingId;
                    
                    
                };
                

                axios.get("http://localhost:8081/user/id/" + tmpArray).then((res2)=>{
                       
                    console.log(res2.data);
                    this.setState({friends: res2.data});
                    
                    });
                
                //console.log(this.state.friends);
               
                
               */
        });
        

      
    
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">My friends</h2>

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Username</th>
                                    
                                    <th>Action</th>
                                
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

export default MyFriendsComponent;