import React, { Component } from 'react';
import axios from 'axios';

class RegistrationComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            username:'',
            password:'',

            firstname:'',
            lastname:'',
            email: '',
            uloga:''
            
        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
 

        this.register=this.register.bind(this);
        
    }
    register(){
        //CREATE USER
        let newUser ={
            id:this.state.id,
            userName:this.state.username,
            password:this.state.password,

            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email: this.state.email,
            uloga:2
        };

        
        axios.post("http://localhost:8092/user",newUser).then((res) => {
            alert(res.data);
            }); 
        
          
    }
    changeUserNameHandler = (event) => {
        this.setState({username: event.target.value});
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    

    changeFirstNameHandler = (event) => {
        this.setState({firstname: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({lastname: event.target.value});
    }

    changeAdressHandler = (event) => {
        this.setState({adress: event.target.value});
    }
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    

    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className="registrationdiv">
                        <h3 className="text-center"> REGISTRATION </h3>
                
                        <form>
                            <div className="form-group">
                                <label> User name: </label>
                                <input  name="username" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler}/>
                                <label> Password: </label>
                                <input  name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        
                                <label> First name: </label>
                                <input  name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                <label> Last name: </label>
                                <input  name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastNameHandler}/>
        
                                <label> Email: </label>
                                <input  name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.register()}>Register</button></div>
                                <br/>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
            </div>
        );
    }
}

export default RegistrationComponent;