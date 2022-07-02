import React, { Component } from 'react';
import UserService from '../services/UserService';

class MainAdminProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            city:'',
            country:'',
            phoneNumber:''
            
        }
        
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePassword2Handler = this.changePassword2Handler.bind(this);

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);

        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        
       
    
    }
    
    update(id) {
        
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))
        activeUser.email=this.state.email;
        activeUser.firstName=this.state.firstName;
        activeUser.lastName=this.state.lastName;
        activeUser.address=this.state.address;
        activeUser.city=this.state.city;
        activeUser.country=this.state.country;
        activeUser.phoneNumber=this.state.phoneNumber;
        
        console.log('activeUser => ' + JSON.stringify(activeUser));

        UserService.updateUser(activeUser,id) ;
    }
    
   
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }
    changePassword2Handler = (event) => {
        this.setState({password2: event.target.value});
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address: event.target.value});
    }
    changeCityHandler = (event) => {
        this.setState({city: event.target.value});
    }
    changeCountryHandler = (event) => {
        this.setState({country: event.target.value});
    }

    changePhoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }
    componentDidMount(){

        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

            this.setState({
            id:activeUser.id,
            email: activeUser.email,
            password: activeUser.password,
            firstName:activeUser.firstName,
            lastName:activeUser.lastName,
            address: activeUser.address,
            city:activeUser.city,
            country:activeUser.country,
            phoneNumber:activeUser.phoneNumber,

            });
        
    }
    render() {
        return (
            <div>
                
                
                
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                <label> Password again: </label>
                                <input name="password2" className="form-control" value={this.state.password} onChange={this.changePassword2Handler}/>

                                <label> First name: </label>
                                <input name="firstname" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                <label> Last name: </label>
                                <input name="lastname" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler}/>
                                <label> City: </label>
                                <input name="city" className="form-control" value={this.state.city} onChange={this.changeCityHandler}/>   
                                <label> Country: </label>
                                <input name="country" className="form-control" value={this.state.country} onChange={this.changeCountryHandler}/> 

                                <label> Phone number: </label>
                                <input name="phonenumber" className="form-control" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>

                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.update(this.state.id)}>Update</button></div>

                </div>
            </div>

        )   ;
    }
}

export default MainAdminProfileComponent;