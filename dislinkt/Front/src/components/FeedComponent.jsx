import { cellClick } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import React, { Component } from 'react';


class FeedComponent extends Component {
    constructor(props){
        super(props)
        this.state={

            posts: [],
            publicUsers:[]
            
        }
        
    }

    seeprofile(id){
        axios.get("http://localhost:8081/user/" + id).then((res) => {

            localStorage.setItem('activeProfile', JSON.stringify(res.data));

        this.props.history.push('/viewprofile');
        });
    }

    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        axios.get("http://localhost:8080/post/publicity/1").then((res) => {

            this.setState({ posts: res.data }); 
            console.log(this.state.posts);
            
           
              
        }); 

    }
    render() {
        return (
                
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                
                    <h2 className="text-center">Posts from public profiles</h2>

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
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.seeprofile(posts.ownerId)} className="loginbtn">See profile</button>

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

export default FeedComponent;