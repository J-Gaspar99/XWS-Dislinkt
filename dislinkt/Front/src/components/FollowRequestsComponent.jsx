import React, { Component } from 'react';

import axios from 'axios';
class FollowRequestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: []
        }


        this.view = this.view.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.denyRequest = this.denyRequest.bind(this);


    }
    view(id) {
        let activeProfile = JSON.parse(localStorage.getItem('activeProfile'));
        axios.get("http://localhost:8081/user/" + id).then(response => {
            localStorage.setItem('activeProfile', JSON.stringify(response.data));
        });

        
        console.log(activeProfile);
        if (activeProfile.publicity == 1) {
            this.props.history.push('/viewprofile');
        }
        else {
            alert("Profile that you trying to view is private. Please login and follow the profile if you still want to view it.")
        }


    }


    acceptRequest(id, userName) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8082/follows/followerandfollowing/" + activeUser.id + "/" + id).then(res => {             //IF Follow doesnt exists
            if (res.data.id == null) {
                axios.get("http://localhost:8081/user/" + id).then(response => {


                    let follow = {

                        followerId: id,
                        followingId: activeUser.id,
                        followerUserName: userName,
                        followingUserName: activeUser.userName,
                        newMessages: 0,
                        newPosts: 0,
                    };

                    let chat = {

                        chatter1Id: activeUser.id,
                        chatter2Id: id,
                        chatter1: activeUser.userName,
                        chatter2: userName,

                    };

                    axios.post("http://localhost:8082/follows", follow); //kreiranje followa

                    axios.get("http://localhost:8089/chat/chatter1idchatter2id/" + activeUser.id + "/" + id).then(res3 => {        //provera da li chat vec postoji izmedju ta 2 korisnika
                        if (res3.data.id == null) {
                            axios.get("http://localhost:8089/chat/chatter1idchatter2id/" + id + "/" + activeUser.id).then(res4 => {
                                if (res4.data.id == null) {
                                    axios.post("http://localhost:8089/chat", chat);
                                }

                            });

                        }
                    });

                    axios.delete("http://localhost:8083/followrequest/" +id ); //brisanje requesta

                    alert("Follow accepted");

                



                });


            }
            else { alert("Follow already exists") };
            
            window.location.reload(false);
        })

    }
    denyRequest(id){
        axios.delete("http://localhost:8083/followrequest/" +id );
        window.location.reload(false);
    }
    componentDidMount() {

        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8083/followrequest/following/"+ activeUser.id).then((res) => {
            this.setState({ requests: res.data });

        });


    }
    render() {
        return (
            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />
                    
                    <h2 className="text-center">Follow requests</h2>

                    <div className="row">
                        <table >
                            <thead>
                                <tr>

                                    <th>User name</th>
                                    

                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.requests.map(
                                        requests =>
                                            <tr key={requests.id}>
                                                <td>{requests.followerUserName}</td>
                                                

                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.acceptRequest(requests.id,requests.followerUserName)} className="loginbtn">Accept</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.denyRequest(requests.id)} className="loginbtn">Deny</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.view(requests.followerId)} className="loginbtn">View user</button>

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

export default FollowRequestComponent;