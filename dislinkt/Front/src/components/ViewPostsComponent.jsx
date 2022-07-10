import axios from 'axios';
import React, { Component } from 'react';


class ViewPostComponent extends Component {
    constructor(props){
        super(props)
        this.state={

            posts: []
            
        }
        
    }
   

    componentDidMount(){
        let activeProfile =  JSON.parse(localStorage.getItem('activeProfile'))
        axios.get("http://localhost:8080/post/ownerid/" + activeProfile.id).then((res) => {
            this.setState({ posts: res.data });
            }); 

    }
    render() {
        return (
                
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
         
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

export default ViewPostComponent;