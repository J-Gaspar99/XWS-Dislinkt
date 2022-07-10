
import React, { Component } from 'react';
import axios from 'axios';

class CreateCommentComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            ownerId:'',
            offerId:'',
            text:'',
            interview:'',
            salary: '',
            grade:''
            
        }
       
        this.changeTextHandler = this.changeTextHandler.bind(this);

        this.changeInterviewHandler = this.changeInterviewHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeGradeHandler = this.changeGradeHandler.bind(this);
 

        this.create=this.create.bind(this);
        
    }
    create(){
        //CREATE COMMENT
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeJobOffer = JSON.parse(localStorage.getItem('activeJobOffer'));

        let newComment ={
            ownerId:activeUser.id,
            offerId:activeJobOffer.id,
            ownerUsername:activeUser.userName,
            text:this.state.text,
            interview: this.state.interview,
            salary:this.state.salary,
            grade: this.state.grade
           
        };
       
        axios.post("http://localhost:8092/comment",newComment).then((res) => {
           alert(res);
            }); 
        

            
    }

    
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value});
    }
    changeInterviewHandler = (event) => {
        this.setState({interview: event.target.value});
    }
    changeSalaryHandler = (event) => {
        this.setState({salary: event.target.value});
    }
    changeGradeHandler = (event) => {
        this.setState({grade: event.target.value});
    }
    

    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className="registrationdiv">
                        <h3 className="text-center"> CREATE COMMENT </h3>
                
                        <form>
                            <div className="form-group">
                                <label> Text: </label>
                                <input  name="text" className="form-control" value={this.state.text} onChange={this.changeTextHandler}/>
                                <label> Interview process: </label>
                                <input  name="process" className="form-control" value={this.state.interview} onChange={this.changeInterviewHandler}/>
                        
                                <label> Salary: </label>
                                <input  name="salary" className="form-control" value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                <label> Grade: </label>
                                <input  name="grade" className="form-control" value={this.state.grade} onChange={this.changeGradeHandler}/>
        
                               
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.create()}>Create</button></div>
                                <br/>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
            </div>
        );
    }
}

export default CreateCommentComponent;