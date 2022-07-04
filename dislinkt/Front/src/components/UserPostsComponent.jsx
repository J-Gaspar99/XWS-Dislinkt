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

    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))
        axios.get("http://localhost:8080/post/ownerid/" + activeUser.id).then((res) => {
            this.setState({ posts: res.data });
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
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Comments</th>
                                    
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map(
                                        posts =>
                                        <tr key= {posts.id}>
                                            <td>{posts.text}</td>
                                            <td>{posts.likes}</td>
                                            <td>{posts.dislikes}</td>
                                            <td>{posts.comments}</td>
                                            
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