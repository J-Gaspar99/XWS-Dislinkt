import React, { Component } from 'react';
import axios from 'axios';

class CreatePostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            text: '',
            link:'',
            likes: '',
            dislikes: '',
            comments: '',
            ownerId: ''


        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeLinkHandler = this.changeLinkHandler.bind(this);


        this.createPost = this.createPost.bind(this);

    }
    createPost() {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        let newPost = {
            text: this.state.text,
            likes: 0,
            link:this.state.link,
            dislikes: 0,
            comments: 0,
            ownerId: activeUser.id

        };

        axios.post("http://localhost:8080/post", newPost).then((res2) => {

           // alert(res2.data);
            let image = {

                postId:res2.data,
                image1:'',
                
            }
    
            axios.post("http://localhost:8087/image", image);
        });

        //follow update newPosts +1 za sve followere activeUsera
        axios.get("http://localhost:8082/follows/following/" + activeUser.id).then((res) => {

            for (const key in res.data) {

                let updatedFollow = {
                    id: res.data[key].id,
                    followerId: res.data[key].followerId,
                    followingId: res.data[key].followingId,
                    followerUserName: res.data[key].followerUserName,
                    followingUserName: res.data[key].followingUserName,
                    newMessages: res.data[key].newMessages,
                    newPosts: res.data[key].newPosts + 1,
                };
                axios.put("http://localhost:8082/follows/" + res.data[key].id, updatedFollow);
            }

        });

    }


    createEmptyImage(id) {

        
    }

    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }
    changeLinkHandler = (event) => {
        this.setState({ link: event.target.value });
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <div className="container">

                    <div className="registrationdiv">
                        <h3 className="text-center"> CREATE POST </h3>

                        <form>
                            <div className="form-group">
                                <label> Text: </label>
                                <textarea name="text" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                                <label> Link: </label>
                                <input name="link" className="form-control" value={this.state.link} onChange={this.changeLinkHandler} />


                                <div className="center"><button className="loginbtn" onClick={() => this.createPost()}>Create</button></div>
                            </div>
                        </form>


                    </div>




                </div>
            </div>
        );
    }
}

export default CreatePostComponent;