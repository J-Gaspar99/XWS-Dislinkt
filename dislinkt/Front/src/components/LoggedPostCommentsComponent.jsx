import React, { Component } from 'react';

import axios from 'axios';
class LoggedPostCommentsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            text :''
        }
        

        this.createComment = this.createComment.bind(this);
        
    }
    
 
    
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
        
    }
    createComment() {
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let activePost =  JSON.parse(localStorage.getItem('activePost'));
        let newComment = {
            id:this.state.id,
            ownerId :activeUser.id,
            postId: activePost.id,
            text: this.state.text,
            ownerUserName: activeUser.userName

        };

        let updatedPost ={
            id:activePost.id,
            text:activePost.text,
            likes:activePost.likes,
            dislikes:activePost.dislikes,
            comments:activePost.comments +1,
            ownerId: activePost.ownerId,
            
        };
        //update posta +1 comment
        axios.put("http://localhost:8080/post/"+ activePost.id, updatedPost);

        axios.post("http://localhost:8086/comment/", newComment);

            window.location.reload(false);
    } 
    componentDidMount(){
        let activePost =  JSON.parse(localStorage.getItem('activePost'));
        axios.get("http://localhost:8086/comment/postid/" + activePost.id ).then((res)=>{
                this.setState({comments: res.data});
                
        });
        
    
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <input style={{position:'absolute',top:'154px'}} name="name" value={this.state.text} onChange={this.changeTextHandler}></input>
                <button style={{position:'absolute',top:'150px',left:'440px'}} onClick={() => this.createComment()} className="loginbtn">Comment</button>
                
                    <h2 className="text-center">Comments</h2>

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                    <th>Owner</th>
                                    <th>Text</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.comments.map(
                                        comments =>
                                        <tr key= {comments.id}>
                                            <td>{comments.ownerUserName}</td>
                                            <td>{comments.text}</td>
                                            
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

export default LoggedPostCommentsComponent;