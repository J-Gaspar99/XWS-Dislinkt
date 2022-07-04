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
            phonenumber: '',
            gender: '',
            dateofbirth: '',
            biography: '',
            workexperience: '',
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
        this.changeWorkExperienceHandler = this.changeWorkExperienceHandler.bind(this);
        this.changeHobbiesHandler = this.changeHobbiesHandler.bind(this);
        this.changePublicityHandler = this.changePublicityHandler.bind(this);

        this.update = this.update.bind(this);

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
    changePhoneNumberHandler = (event) => {
        this.setState({phonenumber: event.target.value});
    }
    changeGenderHandler = (event) => {
        this.setState({gender: event.target.value});
    }

    changeDateOfBirthHandler = (event) => {
        this.setState({dateofbirth: event.target.value});
    }
    changeBiographyHandler = (event) => {
        this.setState({biography: event.target.value});
    }
    changeWorkExperienceHandler = (event) => {
        this.setState({workexperience: event.target.value});
    }
    changeHobbiesHandler = (event) => {
        this.setState({hobbies: event.target.value});
    }
    changePublicityHandler = (event) => {
        this.setState({publicity: event.target.value});
    }
    update(idd) {

        
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))
        console.log(activeUser.id);
        let updatedUser = {
            id:idd,
            userName:this.state.username,
            password:this.state.password,
            firstName:this.state.firstname,
            lastName:this.state.lastname,
            email:this.state.email,
            phoneNumber:this.state.phonenumber,
            dateOfBirth:this.state.dateofbirth,
            biography:this.state.biography,
            workExperience:this.state.workexperience,
            hobbies:this.state.hobbies,
            publicity:this.state.publicity
        };


        console.log('updatedUser => ' + JSON.stringify(updatedUser));
        axios.put("http://localhost:8081/user/"+ activeUser.id,updatedUser).then(response => {
                localStorage.setItem('activeUser', JSON.stringify(response.data))
                
            });
        /*.then(res=> {
            this.props.history.push('/userprofile')
        }); */


        
    }
    componentDidMount() {

        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        this.setState({
            id: activeUser.id,
            username: activeUser.userName,
            password: activeUser.password,
            firstname: activeUser.firstName,
            lastname: activeUser.lastName,
            email: activeUser.email,
            phonenumber: activeUser.phoneNumber,
            gender: activeUser.gender,
            dateofbirth: activeUser.dateOfBirth,
            biography: activeUser.biography,
            workexperience: activeUser.workExperience,
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
                                <input name="username" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler} />
                                <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} />

                                <label> First name: </label>
                                <input name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstNameHandler} />
                                <label> Last name: </label>
                                <input name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastNameHandler} />
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                                <label> Phone number: </label>
                                <input name="phonenumber" className="form-control" value={this.state.phonenumber} onChange={this.changePhoneNumberHandler} />
                                <label> Date of birth: </label>
                                <input type="date" name="dateofbirth" className="form-control" value={this.state.dateofbirth} onChange={this.changeDateOfBirthHandler} />
                                <label> Biography: </label>
                                <input name="biography" className="form-control" value={this.state.biography} onChange={this.changeBiographyHandler} />
                                <label> Work experience: </label>
                                <input name="workexperience" className="form-control" value={this.state.workexperience} onChange={this.changeWorkExperienceHandler} />
                                <label> Hobbies: </label>
                                <input name="hobbies" className="form-control" value={this.state.hobbies} onChange={this.changeHobbiesHandler} />
                                <label> Publicity: </label>
                                <input name="publicity" className="form-control" value={this.state.publicity} onChange={this.changePublicityHandler} />

                                <div className="center"><button className="loginbtn" onClick={()=>this.update(this.state.id)}>Update</button></div>
                            </div>
                        </form>

                    </div>




                </div>
            </div>
        );
    }
}

export default UserProfileComponent;