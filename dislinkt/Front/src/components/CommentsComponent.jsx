import React, { Component } from 'react';

import axios from 'axios';
class CommentsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           comments: []
            
        }
     
        
    }

    createcomment(){
    
        //prelaz na sl stranicu
        this.props.history.push('/createcomment');
        
    }
    
   
 
    componentDidMount(){
        
        axios.get("http://localhost:8092/comment").then((res)=>{
            this.setState({comments: res.data}); });
 
    } 

    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <button style={{marginLeft:"10px"}} onClick={()=>this.createcomment()} className="loginbtn">Comment</button>
                    <h2 className="text-center">Comments</h2>
                    
                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                <th>User</th>
                                    <th>Text</th>
                                    <th>Interview procedures</th>
                                    <th>Salary</th>
                                    <th>Grade</th>
                                  
                                    

                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.comments.map(
                                        comments =>
                                        <tr key= {comments.id}>
                                            <td>{comments.ownerUsername}</td>
                                            <td>{comments.text}</td>
                                            <td>{comments.interview}</td>
                                            <td>{comments.salary}</td>
                                            <td>{comments.grade}</td>
                                             
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

export default CommentsComponent;