import { cellClick } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import React, { Component } from 'react';


class UserPostComponent extends Component {
    constructor(props){
        super(props)
        this.state={

            posts: []
            
        }
        
    }
   createpost(){
    this.props.history.push('/createpost');
   }

   addImage(postId){
    axios.get("http://localhost:8080/post/" + postId ).then(response => {
    localStorage.setItem('activePost', JSON.stringify(response.data));
   });
   this.props.history.push('/uploadimage');


   }
  

    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        axios.get("http://localhost:8080/post/ownerid/" + activeUser.id).then((res) => {
            
            this.setState({ posts: res.data });
            console.log(this.state.posts);
            }); 

    }
    render() {
        return (
                
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <button onClick={()=>this.createpost()} className="loginbtn" > Create post </button>
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
                                    <th>Action</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map(
                                        posts =>
                                        <tr key= {posts.id}>
                                            <td>{posts.text}</td>
                                            <div align="center"><a href={posts.link}><td>{posts.link}</td></a></div>
                                            <td>{posts.likes}</td>
                                            <td>{posts.dislikes}</td>
                                            <td>{posts.comments}</td>
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.addImage(posts.id)} className="loginbtn">Add Image</button>
                                            
                                                
                                            </td>
                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        )   ;
    }
}

export default UserPostComponent;