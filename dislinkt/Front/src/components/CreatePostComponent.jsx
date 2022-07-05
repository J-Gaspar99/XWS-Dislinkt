import React, { Component } from 'react';
import axios from 'axios';

class CreatePostComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            text:'',
            likes:'',
            dislikes:'',
            comments:'',
            ownerId: ''
            
            
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        

        this.createPost=this.createPost.bind(this);
        
    }
    createPost(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        let newPost ={
            id:this.state.id,
            text:this.state.text,
            likes:0,
            dislikes:0,
            comments:0,
            ownerId: activeUser.id
            
        };

        
    
        axios.post("http://localhost:8080/post",newPost).then((res) => {
            console.log(newPost);
            }); 
            
        
            
    }
    changeTextHandler = (event) => {
        this.setState({text: event.target.value});
    }
   componentDidMount(){

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
                                <textarea name="text" className="form-control" value={this.state.text} onChange={this.changeTextHandler}/>
                                
                                
                                <div className="center"><button className="loginbtn" onClick={()=>this.createPost()}>Create</button></div>
                            </div>
                        </form>
                        <h1>Upload new Photo</h1>
                        <form method="POST" action="http://localhost:8087/photos/add" encType="multipart/form-data">
                            Title:<input type="text" name="title" />
                            Image:<input type="file" name="image" accept="image/*" />
                        <input type="submit" value="Upload" />
</form>
                            
                    </div>
                   
                    
                    
                
                </div> 
            </div>
        );
    }
}

export default CreatePostComponent;