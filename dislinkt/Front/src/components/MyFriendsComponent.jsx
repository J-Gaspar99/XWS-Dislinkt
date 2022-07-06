import React, { Component } from 'react';

import axios from 'axios';
class MyFriendsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           friends: [], friends2: []
           
            
        }
        

        this.viewChat = this.viewChat.bind(this);
        
        
        
    }
    viewChat(id){
      
        axios.get("http://localhost:8081/user/" + id).then(response => {
            localStorage.setItem('activeProfile', JSON.stringify(response.data));
        })

        let activeProfile = JSON.parse(localStorage.getItem('activeProfile'));
        console.log (activeProfile);
        if (activeProfile.publicity==1){
            this.props.history.push('/viewprofile');
        } 
        else {
            alert("Profile that you trying to view is private. Please login and follow the profile if you still want to view it.")
        }


    }
 
    
   
    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        
        axios.get("http://localhost:8082/follows/follower/" + activeUser.id).then((res)=>{
          
               let tmpArray=[];
                for(const key in res.data){
                   
                   tmpArray[key]=res.data[key].followingId;
                    
                    
                };
                

                axios.get("http://localhost:8081/user/id/" + tmpArray).then((res2)=>{
                       
                    console.log(res2.data);
                    this.setState({friends: res2.data});
                    
                    });
                
                //console.log(this.state.friends);
               
                
               
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
                                
                                    <th>User name</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    
                                    <th>Action</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.friends.map(
                                        friends =>
                                        <tr key= {friends.id}>
                                            <td>{friends.userName}</td>
                                            <td>{friends.firstName}</td>
                                            <td>{friends.lastName}</td>
                                           
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.view(friends.id)} className="loginbtn">View</button>
                                                
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