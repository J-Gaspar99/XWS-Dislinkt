import { act } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';

class UserProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.match.params.id,
            username: '',
            password: '',

            firstname: '',
            lastname: '',
            email: '',
            uloga: 0 

        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        
        
        

        
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

   
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    

    componentDidMount() {

        
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))

        if(activeUser.uloga==2){
            this.setState({
                id: activeUser.id,
                username: activeUser.username,
                password: activeUser.password,
                firstname: activeUser.firstname,
                lastname: activeUser.lastname,
                email: activeUser.email,
                uloga: "REGISTROVAN"
                
            });
        }
        else{
            if(activeUser.uloga==3){
                this.setState({
                    id: activeUser.id,
                    username: activeUser.username,
                    password: activeUser.password,
                    firstname: activeUser.firstname,
                    lastname: activeUser.lastname,
                    email: activeUser.email,
                    uloga: "VLASNIK"
                    
                });
            }
            else {
                this.setState({
                    id: activeUser.id,
                    username: activeUser.username,
                    password: activeUser.password,
                    firstname: activeUser.firstname,
                    lastname: activeUser.lastname,
                    email: activeUser.email,
                    uloga: "ADMIN"
                    
                });
            }
        }
        

    }

    render() {
        return (
            <div>
                <div className="container">

                    <div className="registrationdiv">
                        <h3 className="text-center"> PROFILE </h3>

                        <form>
                            <div className="form-group">
                                <label> Username: </label>
                                <input name="username" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler} /><br/>
                                <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} /><br/>

                                <label> First name: </label>
                                <input name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstNameHandler} /><br/>
                                <label> Last name: </label>
                                <input name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastNameHandler} /><br/>
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} /><br/>
                                
                                <label> Role: </label>
                                <input name="role" className="form-control" value={this.state.uloga}  />
                                <br/>

                                
                                <br/>
                            </div>
                        </form>

                    </div>




                </div>
            </div>
        );
    }
}

export default UserProfileComponent;