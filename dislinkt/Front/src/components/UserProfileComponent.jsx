import { act } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';

class UserProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            userName: '',
            password: '',

            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: '',
            biography: '',
            workExperiance: '',
            hobbies: '',
            publicity: ''

        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.changeBiographyHandler = this.changeBiographyHandler.bind(this);
        this.changeWorkExperianceHandler = this.changeWorkExperianceHandler.bind(this);
        this.changeHobbiesHandler = this.changeHobbiesHandler.bind(this);
        this.changePublicityHandler = this.changePublicityHandler.bind(this);



    }

    changeUserNameHandler = (event) => {
        this.setState({ userName: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }



    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }


    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changePhoneNumberHandler = (event) => {
        this.setState({ phoneNumber: event.target.value });
    }
    changeGenderHandler = (event) => {
        this.setState({ gender: event.target.value });
    }

    changeDateOfBirthHandler = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }
    changeBiographyHandler = (event) => {
        this.setState({ biography: event.target.value });
    }
    changeWorkExperianceHandler = (event) => {
        this.setState({ workExperiance: event.target.value });
    }
    changeHobbiesHandler = (event) => {
        this.setState({ hobbies: event.target.value });
    }
    changePublicityHandler = (event) => {
        this.setState({ publicity: event.target.value });
    }
    update() {

        let updatedUser = {
            userName:this.state.userName,
            password:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            phoneNumber:this.state.phoneNumber,
            dateOfBirth:this.state.dateOfBirth,
            biography:this.state.biography,
            workExperiance:this.state.workExperiance,
            hobbies:this.state.hobbies,
            publicity:this.state.publicity
        };

        let uuid = this.state.id;
        
        

        console.log('updatedUser => ' + JSON.stringify(updatedUser));
        axios.put("http://localhost:8081/user/"+ uuid ,updatedUser).then(res=> {
            this.props.history.push('/userprofile')
        }); 
        
    }
    componentDidMount() {

        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        this.setState({
            id: activeUser.id,
            userName: activeUser.userName,
            password: activeUser.password,
            firstName: activeUser.firstName,
            lastName: activeUser.lastName,
            email: activeUser.email,
            phoneNumber: activeUser.phoneNumber,
            gender: activeUser.gender,
            dateOfBirth: activeUser.dateOfBirth,
            biography: activeUser.biography,
            workExperiance: activeUser.workExperiance,
            hobbies: activeUser.hobbies,
            publicity: activeUser.publicity

        });

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
                                <input name="username" className="form-control" value={this.state.userName} onChange={this.changeUserNameHandler} />
                                <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} />

                                <label> First name: </label>
                                <input name="firstname" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                <label> Last name: </label>
                                <input name="lastname" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                                <label> Phone number: </label>
                                <input name="phonenumber" className="form-control" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} />
                                <label> Date of birth: </label>
                                <input type="date" name="dateofbirth" className="form-control" value={this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler} />
                                <label> Biography: </label>
                                <input name="biography" className="form-control" value={this.state.biography} onChange={this.changeBiographyHandler} />
                                <label> Work experiance: </label>
                                <input name="workexperiance" className="form-control" value={this.state.workExperiance} onChange={this.changeWorkExperianceHandler} />
                                <label> Hobbies: </label>
                                <input name="hobbies" className="form-control" value={this.state.hobbies} onChange={this.changeHobbiesHandler} />
                                <label> Publicity: </label>
                                <input name="publicity" className="form-control" value={this.state.publicity} onChange={this.changePublicityHandler} />

                                <div className="center"><button className="loginbtn" onClick={this.update()}>Update</button></div>
                            </div>
                        </form>

                    </div>




                </div>
            </div>
        );
    }
}

export default UserProfileComponent;