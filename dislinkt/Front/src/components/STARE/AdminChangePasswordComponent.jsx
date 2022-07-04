import React, { Component } from 'react';
import UserService from '../services/UserService';


class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state={
           email: '',
           password: ''
            
        }
        
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }
    change(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        activeUser.password = this.state.password;
        UserService.updateUser(activeUser,activeUser.id).then(res => {
            this.props.history.push('/login');
        });
        localStorage.removeItem('activeUser')
        this.props.history.push(`/login`);
            
       
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }
    render() {
        return (
            <div><br/><br/><br/><br/>
                <div className="container">
                    
                    <div className="logindiv">
                        <h3 className="text-center"> CHANGE PASSWORD </h3>
                
                        <form id="myForm">
                            <div className="form-group">
                            <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} type="text"/>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.change()}>Change</button></div>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
                
                
            </div>
        );
    }
}

export default LoginComponent;