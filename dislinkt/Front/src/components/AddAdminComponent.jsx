import React, { Component } from 'react';
import UserService from '../services/UserService';

class AddAdminComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address: '',
            city:'',
            country:'',
            phoneNumber:''
            
            
        }
      
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);

        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        
       this.addAdmin=this.addAdmin.bind(this);
       
    }

    addAdmin(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let admin = {email:this.state.email, password:"password", firstName:this.state.firstName, lastName:this.state.lastName, address:this.state.address, city:this.state.city, country:this.state.country, phoneNumber:this.state.phoneNumber, type: "admin"}
        console.log('admin => ' + JSON.stringify(admin));

        UserService.createUser(admin,activeUser.type).then(res=> {
            this.props.history.push('/addadmin')
        });
    }

    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
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
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        if (activeUser.type == "main_admin" )
        {
        } 
        else{this.logout(); alert("Unauthorised access")} 
    }
    render() {
        return (
            <div>
                
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                               

                                <label> First name: </label>
                                <input name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                <label> Last name: </label>
                                <input name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler}/>
                                <label> City: </label>
                                <input name="city" className="form-control" value={this.state.city} onChange={this.changeCityHandler}/>   
                                <label> Country: </label>
                                <input name="country" className="form-control" value={this.state.country} onChange={this.changeCountryHandler}/> 

                                <label> Phone number: </label>
                                <input name="phoneNumber" className="form-control" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>

                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.addAdmin()}>Add</button></div>

                </div>
            </div>

        );
    }
}

export default AddAdminComponent;