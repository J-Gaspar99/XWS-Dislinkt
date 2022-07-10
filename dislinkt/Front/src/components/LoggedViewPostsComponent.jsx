import axios from 'axios';
import React, { Component } from 'react';


class LoggedViewPostsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            posts: []

        }

    }

    like(id) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        axios.get("http://localhost:8080/post/" + id).then(response => {
            console.log(response.data);



            axios.get("http://localhost:8084/like/owneridpostid/" + activeUser.id + "/" + id).then(res => {             //IF Like doesnt exists
                if (res.data.id == null) {
                    axios.get("http://localhost:8085/dislike/owneridpostid/" + activeUser.id + "/" + id).then(res2 => {  //IF dislike doesnt exists
                        if (res2.data.id == null) {         //like

                            let like = {

                                ownerId: activeUser.id,
                                postId: id
                            };
                            let updatedPost = {
                                id:response.data.id,
                                text: response.data.text,
                                likes:response.data.likes +1,
                                dislikes:response.data.dislikes,
                                comments:response.data.comments,
                                ownerId:response.data.ownerId
                            };


                            axios.put("http://localhost:8080/post/"+id,updatedPost);
                            axios.post("http://localhost:8084/like", like);
                            alert("Liked");


                        }
                        else {                      //dislike into like
                            let like = {

                                ownerId: activeUser.id,
                                postId: id
                            };
                            let updatedPost = {
                                id:response.data.id,
                                text: response.data.text,
                                likes:response.data.likes + 1,
                                dislikes:response.data.dislikes - 1,
                                comments:response.data.comments,
                                ownerId:response.data.ownerId
                            };


                            axios.put("http://localhost:8080/post/"+id,updatedPost);
                            axios.delete("http://localhost:8085/dislike/" + res2.data.id);
                            axios.post("http://localhost:8084/like", like);
                            alert("Liked")
                        };
                    });
                }
                else { alert("Already liked") };

            });

        });
    }


    dislike(id) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        axios.get("http://localhost:8080/post/" + id).then(response => {
        axios.get("http://localhost:8085/dislike/owneridpostid/" + activeUser.id + "/" + id).then(res => {             //IF Like doesnt exists
            if (res.data.id == null) {
                axios.get("http://localhost:8084/like/owneridpostid/" + activeUser.id + "/" + id).then(res2 => {  //IF dislike doesnt exists
                    if (res2.data.id == null) {             //dislike

                        let dislike = {

                            ownerId: activeUser.id,
                            postId: id
                        };
                       // let dis = response.data.dislikes + 1;
                        let updatedPost = {
                            id:response.data.id,
                            text: response.data.text,
                            likes:response.data.likes ,
                            dislikes:response.data.dislikes + 1,
                            comments:response.data.comments,
                            ownerId:response.data.ownerId
                        };
                            console.log(updatedPost);

                        axios.put("http://localhost:8080/post/"+id,updatedPost);



                        axios.post("http://localhost:8085/dislike/", dislike);
                        alert("Disliked")


                    }
                    else {                      //like into dislike
                        let dislike = {

                            ownerId: activeUser.id,
                            postId: id
                        };
                        let dis = response.data.dislikes + 1;
                        let updatedPost = {
                            id:response.data.id,
                            text: response.data.text,
                            likes:response.data.likes - 1,
                            dislikes:dis,
                            comments:response.data.comments,
                            ownerId:response.data.ownerId
                        };
                        console.log(updatedPost);

                        axios.put("http://localhost:8080/post/"+id,updatedPost);
                        axios.delete("http://localhost:8084/like/" + res2.data.id);
                        axios.post("http://localhost:8085/dislike", dislike);
                        alert("Disliked")
                    };
                });
            }
            else { alert("Already disliked") };

        });
    })

    }


    comments(id) {
        axios.get("http://localhost:8080/post/" + id).then(response => {
            localStorage.setItem('activePost', JSON.stringify(response.data))

        });
        this.props.history.push('/loggedpostcomments');

    }
    viewImage(id){

        axios.get("http://localhost:8080/post/" + id).then(response => {
            localStorage.setItem('activePost', JSON.stringify(response.data))

        });
        this.props.history.push('/displayimage');
    }

    componentDidMount() {
        let activeFriend = JSON.parse(localStorage.getItem('activeFriend'))
        axios.get("http://localhost:8080/post/ownerid/" + activeFriend.id).then((res) => {
            this.setState({ posts: res.data });
        });

    }
    render() {
        return (

            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />

                    <h2 className="text-center">Posts</h2>

                    <div className="row">
                        <table >
                            <thead>
                                <tr>

                                    <th>Text</th>
                                    <th>Link</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Comments</th>

                                    <th>Actions</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map(
                                        posts =>
                                            <tr key={posts.id}>
                                                <td>{posts.text}</td>
                                                <div align="center"><a href={posts.link}><td>{posts.link}</td></a></div>
                                                <td>{posts.likes}</td>
                                                <td>{posts.dislikes}</td>
                                                <td>{posts.comments}</td>

                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.like(posts.id)} className="loginbtn">Like</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.dislike(posts.id)} className="loginbtn">Dislike</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.comments(posts.id)} className="loginbtn">Comments</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewImage(posts.id)} className="loginbtn">View Image</button>

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

export default LoggedViewPostsComponent;