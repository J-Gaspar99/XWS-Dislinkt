import React, { Component } from 'react';

import axios from 'axios';
class MyFriendsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           friends: []
           
            
        }
     
        
    }
    

    viewPosts(id){
        this.props.history.push('/loggedviewposts');
    }
 
    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        axios.get("http://localhost:8082/follows/follower/" + activeUser.id).then((res)=>{
            this.setState({friends: res.data}); });

    } 

    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">Friends</h2>
                    
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
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.viewPosts(friends.followingId)} className="loginbtn">Posts</button>
                                                
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