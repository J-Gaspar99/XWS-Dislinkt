import React, { Component } from 'react';


class ViewProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',

            firstname:'',
            lastname:'',
            email: '',
            phonenumber:'',
            gender:'',
            dateofbirth: '',
            biography:'',
            workexperiance:'',
            hobbies:'',
            publicity:''
            
        }
       
    }
    

    componentDidMount(){
        
        let activeProfile =  JSON.parse(localStorage.getItem('activeProfile'))

            this.setState({
            
            username: activeProfile.userName,
            firstname:activeProfile.firstName,
            lastname:activeProfile.lastName,
            email: activeProfile.email,
            phonenumber:activeProfile.phoneNumber,
            dateofbirth:activeProfile.dateOfBirth,
            biography:activeProfile.biography,
            workexperiance: activeProfile.workExperiance,
            hobbies: activeProfile.hobbies,

            });
           
        
    }
    render() {
        return (
                
            <div className="registrationdiv">
                    <br/><br/>
                                <label> User name: </label>
                                <input  name="username" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler}/>
                                
                                <label> First name: </label>
                                <input  name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                <label> Last name: </label>
                                <input  name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastNameHandler}/>
                                <label> Email: </label>
                                <input  name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                <label> Phone number: </label>
                                <input  name="phonenumber" className="form-control" value={this.state.phonenumber} onChange={this.changePhoneNumberHandler}/>
                                <label> Date of birth: </label>
                                <input type="date"  name="dateofbirth" className="form-control" value={this.state.dateofbirth} onChange={this.changeDateOfBirthHandler}/>
                                <label> Biography: </label>
                                <input  name="biography" className="form-control" value={this.state.biography} onChange={this.changeBiographyHandler}/>   
                                <label> Work experiance: </label>
                                <input  name="workexperiance" className="form-control" value={this.state.workexperiance} onChange={this.changeWorkExperianceHandler}/> 
                                <label> Hobbies: </label>
                                <input  name="hobbies" className="form-control" value={this.state.hobbies} onChange={this.changeHobbiesHandler}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.seeposts(this.state.id)}>See posts</button></div>

            </div>
            
        )   ;
    }
}

export default ViewProfileComponent;