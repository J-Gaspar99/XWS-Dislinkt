import React, { Component } from 'react';

import axios from 'axios';
class LoggedProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            profiles: [],
            search :''
        }
        

        this.view = this.view.bind(this);
        this.search = this.search.bind(this);
        
        
    }
    view(id){
      
        axios.get("http://localhost:8081/user/" + id).then(response => {
            localStorage.setItem('activeProfile', JSON.stringify(response.data));
        });

        let activeProfile = JSON.parse(localStorage.getItem('activeProfile'));
        console.log (activeProfile);
        if (activeProfile.publicity==1){
            this.props.history.push('/viewprofile');
        } 
        else {
            alert("Profile that you trying to view is private. Please login and follow the profile if you still want to view it.")
        }


    }
 
    
    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
        

    }
    search(username) {
        
        axios.get("http://localhost:8081/user/username/" + username).then((res) => {
            this.view(res.data.id)
        });
    } 

    follow(id,userName){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8082/follows/followerandfollowing/"+activeUser.id+"/"+id).then(res => {             //IF Follow doesnt exists
            if (res.data.id == null)
            {
                axios.get("http://localhost:8083/followrequest/followerandfollowing/"+activeUser.id+"/"+id).then(res2 => {  //IF FollowRequest doesnt exists
                    if(res2.data.id == null){


                        axios.get("http://localhost:8081/user/" + id).then(response => {


                            let follow={
                                
                                followerId:activeUser.id,
                                followingId:id,
                                followerUserName:activeUser.userName,
                                followingUserName : userName
                            };

                            let chat={
                                
                                chatter1Id:activeUser.id,
                                chatter2Id:id,
                                chatter1:activeUser.userName,
                                chatter2:userName,
                                
                            };

                            if(response.data.publicity == 1){   //PUBLIC

                                axios.post("http://localhost:8082/follows",follow);

                                axios.get("http://localhost:8089/chat/chatter1idchatter2id/"+ activeUser.id + "/" + id).then(res3=>{        //provera da li chat vec postoji izmedju ta 2 korisnika
                                    if (res3.data.id == null){
                                        axios.get("http://localhost:8089/chat/chatter1idchatter2id/"+ id + "/" + activeUser.id).then(res4=> {
                                            if (res4.data.id == null){
                                                axios.post("http://localhost:8089/chat",chat);
                                            }

                                        });
                        
                                    }
                                });
                                


                                alert("Follow successful")
                               
                            }
                            else{                               //PRIVATE
                                axios.post("http://localhost:8083/followrequest",follow)
                                alert("Follow request sent")

                            };
                        });

                    }
                    else{alert("FollowRequest already exists")};
                })
            }
            else{alert("Follow already exists")};

    })

    }
    componentDidMount(){
        
        axios.get("http://localhost:8081/user").then((res)=>{
                this.setState({profiles: res.data});
                
        });
        
    
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <input style={{position:'absolute',top:'154px'}} name="name" value={this.state.search} onChange={this.changeSearchHandler}></input>
                <button style={{position:'absolute',top:'150px',left:'440px'}} onClick={() => this.search(this.state.search)} className="loginbtn">Search</button>
                
                    <h2 className="text-center">Profiles</h2>

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
                                    this.state.profiles.map(
                                        profiles =>
                                        <tr key= {profiles.id}>
                                            <td>{profiles.userName}</td>
                                            <td>{profiles.firstName}</td>
                                            <td>{profiles.lastName}</td>
                                           
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.view(profiles.id)} className="loginbtn">View</button>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.follow(profiles.id,profiles.userName )} className="loginbtn">Follow</button>
                                                
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

export default LoggedProfileComponent;