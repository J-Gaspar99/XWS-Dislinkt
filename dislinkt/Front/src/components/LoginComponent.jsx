import React, { Component } from 'react';

import axios from 'axios';
import validator from 'validator';

import UserService from '../services/UserService';
import ClientPointsService from '../services/ClientPointsService';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            errorMessage: ''

        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    
    }


    login() {

        axios.get("http://localhost:8081/user/" + this.state.userName + "/" + this.state.password).then(response => {
                localStorage.setItem('activeUser', JSON.stringify(response.data))
                if(response.data.id != null){this.props.history.push('/userprofile');
                window.location.reload(false);}
                else{
                    alert("Wrong Username and/or Password")
                }
            });
            
            

            

    }


    changeUserNameHandler = (event) => {
        this.setState({ userName: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }


    componentDidMount() {
        localStorage.clear();
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <div style={{ position: 'absolute', top: '150px', left: '33%', height: '300px', width: '500px' }} >

                    <div style={{ position: 'absolute', top: '0px', left: '0px' }} className="logindiv">
                        <h3 style={{ position: 'absolute', top: '20px', left: '40%' }} className="text-center"> LOGIN </h3>

                        <form>
                            <div className="form-group">

                                <label style={{ position: 'absolute', left: '10px', top: '100px' }}> User name: </label>
                                <input style={{ position: 'absolute', top: '125px' }} placeholder="User name" name="email" className="form-control" value={this.state.userName} onChange={this.changeUserNameHandler} />
                                <div style={{ position: 'absolute', top: '165px', color: 'red', left: '38%' }}>{this.state.emailErrorMessage}</div>

                                <label style={{ position: 'absolute', left: '10px', top: '200px' }}> Password: </label>
                                <input style={{ position: 'absolute', top: '225px' }} type='password' placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} />

                                <div style={{ position: 'absolute', top: '315px' }} className="center"><button className="loginbtn" onClick={()=>this.login()}>Login</button></div>
                            </div>


                        </form>

                    </div>

                </div>

               
            </div>
        );
    }
}

export default LoginComponent;