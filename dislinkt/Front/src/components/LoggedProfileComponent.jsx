import React, { Component } from 'react';

import axios from 'axios';
class LoggedProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            search: '',

            id: this.props.match.params.id,
            blockedId: '',
            blockedUserName: '',
            blockerId: '',
            blockerUserName: ''
        }


        this.view = this.view.bind(this);
        this.search = this.search.bind(this);


    }
    block(id, userName) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8090/block/blockerId/blockedId/" + activeUser.id + "/" + id).then(res => {

            if (res.data.id == null) {


                let newBlock = {
                    blockedId: id,
                    blockedUserName: userName,
                    blockerId: activeUser.id,
                    blockerUserName: activeUser.userName
                }

                axios.post("http://localhost:8090/block/", newBlock);
                alert("Block successful.");



                axios.get("http://localhost:8082/follows/followerandfollowing/" + activeUser.id + "/" + id).then(res2 => {  //brisanje follow activeUser - user

                    if (res2.data.id != null) {

                        axios.delete("http://localhost:8082/follows/" + res2.data.id)
                    }
                });

                axios.get("http://localhost:8082/follows/followerandfollowing/" + id + "/" + activeUser.id).then(res2 => {  //brisanje follow user - activeUser

                    if (res2.data.id != null) {

                        axios.delete("http://localhost:8082/follows/" + res2.data.id)
                    }
                });


                axios.get("http://localhost:8083/followrequest/followerandfollowing/" + id + "/" + activeUser.id).then(res3 => {    //brisanje followrequest activeUser - user
                    if (res3.data.id != null) {
                        axios.delete("http://localhost:8083/followrequest/" + res3.data.id)
                    }

                });

                axios.get("http://localhost:8083/followrequest/followerandfollowing/" + activeUser.id + "/" + id).then(res3 => { //brisanje followrequest user - activeUser
                    if (res3.data.id != null) {
                        axios.delete("http://localhost:8083/followrequest/" + res3.data.id)
                    }

                });
            }
            else alert("User already blocked");

        });



    }




    view(id) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        axios.get("http://localhost:8090/block/blockerId/blockedId/" + activeUser.id + "/" + id).then(res => {

            axios.get("http://localhost:8090/block/blockerId/blockedId/" + id + "/" + activeUser.id).then(res2 => {

                if (res.data.id == null) {
                    if (res2.data.id == null) {

                        axios.get("http://localhost:8081/user/" + id).then(response => {
                            localStorage.setItem('activeProfile', JSON.stringify(response.data));
                        });

                        let activeProfile = JSON.parse(localStorage.getItem('activeProfile'));
                        console.log(activeProfile);
                        if (activeProfile.publicity == 1) {
                            this.props.history.push('/viewprofile');
                        }
                        else {
                            alert("Profile that you trying to view is private. Please login and follow the profile if you still want to view it.")
                        }

                    }
                    else { alert("You are blocked by user") }

                }
                else { alert("You blocked user") }

            });

        });





    }


    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });


    }
    search(username) {

        axios.get("http://localhost:8081/user/username/" + username).then((res) => {
            this.view(res.data.id)
        });
    }

    follow(id, userName) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));


        axios.get("http://localhost:8090/block/blockerId/blockedId/" + activeUser.id + "/" + id).then(res4 => {

            axios.get("http://localhost:8090/block/blockerId/blockedId/" + id + "/" + activeUser.id).then(res5 => {

                if (res4.data.id == null) {
                    if (res5.data.id == null) {



                        axios.get("http://localhost:8082/follows/followerandfollowing/" + activeUser.id + "/" + id).then(res => {             //IF Follow doesnt exists
                            if (res.data.id == null) {
                                axios.get("http://localhost:8083/followrequest/followerandfollowing/" + activeUser.id + "/" + id).then(res2 => {  //IF FollowRequest doesnt exists
                                    if (res2.data.id == null) {


                                        axios.get("http://localhost:8081/user/" + id).then(response => {


                                            let follow = {

                                                followerId: activeUser.id,
                                                followingId: id,
                                                followerUserName: activeUser.userName,
                                                followingUserName: userName,
                                                newMessages: 0,
                                                newPosts: 0
                                            };

                                            let chat = {

                                                chatter1Id: activeUser.id,
                                                chatter2Id: id,
                                                chatter1: activeUser.userName,
                                                chatter2: userName,

                                            };

                                            if (response.data.publicity == 1) {   //PUBLIC

                                                axios.post("http://localhost:8082/follows", follow);

                                                axios.get("http://localhost:8089/chat/chatter1idchatter2id/" + activeUser.id + "/" + id).then(res3 => {        //provera da li chat vec postoji izmedju ta 2 korisnika
                                                    if (res3.data.id == null) {
                                                        axios.get("http://localhost:8089/chat/chatter1idchatter2id/" + id + "/" + activeUser.id).then(res4 => {
                                                            if (res4.data.id == null) {
                                                                axios.post("http://localhost:8089/chat", chat);
                                                            }

                                                        });

                                                    }
                                                });



                                                alert("Follow successful")

                                            }
                                            else {                               //PRIVATE
                                                axios.post("http://localhost:8083/followrequest", follow)
                                                alert("Follow request sent")

                                            };
                                        });

                                    }
                                    else { alert("FollowRequest already exists") };
                                })
                            }
                            else { alert("Follow already exists") };

                        });


                    }
                    else { alert("You are blocked by user") }
                }
                else { alert("You blocked user") }
            });
        });

    }
    blockedUsers(){
        this.props.history.push("/blockedusers");
    }
    componentDidMount() {

        axios.get("http://localhost:8081/user").then((res) => {
            this.setState({ profiles: res.data });

        });


    }
    render() {
        return (
            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />
                    <input style={{ position: 'absolute', top: '154px' }} name="name" value={this.state.search} onChange={this.changeSearchHandler}></input>
                    <button style={{ position: 'absolute', top: '150px', left: '500px' }} onClick={() => this.search(this.state.search)} className="loginbtn">Search</button>

                    <h2 className="text-center">Users</h2>

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
                                            <tr key={profiles.id}>
                                                <td>{profiles.userName}</td>
                                                <td>{profiles.firstName}</td>
                                                <td>{profiles.lastName}</td>

                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.view(profiles.id)} className="loginbtn">View</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.follow(profiles.id, profiles.userName)} className="loginbtn">Follow</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.block(profiles.id, profiles.userName)} className="loginbtn">Block</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <button style={{ position: 'absolute', top: '150px', right: '300px' }} onClick={() => this.blockedUsers()} className="loginbtn">Blocked users</button>
                </div>
            </div>
        );
    }
}

export default LoggedProfileComponent;