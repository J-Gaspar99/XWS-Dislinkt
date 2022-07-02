import React, { Component } from 'react';
import axios from 'axios';

class CottageOwnerProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address: '',
            city:'',
            country:'',
            phoneNumber:'',
            type:'',
            
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

    deleteprofile(id){

        this.props.history.push(`/deleteprofile`);
    }
    
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
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

    cottages()
    {
        
        this.props.history.push(`/cottageownercottages`);

    }

    update(){
        

        let cottageOwner = {

            id:this.state.id,
            email: this.state.email,
            password: this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address: this.state.address,
            city:this.state.city,
            country:this.state.country,
            phoneNumber:this.state.phoneNumber,
            type:"cottage_owner",


        }
        let coid = this.state.id;
       
        
        console.log('cottageOwner => ' + JSON.stringify(cottageOwner));
        axios.put("http://localhost:8080/api/v1/users/cottage_owner/"+coid,cottageOwner);
        this.props.history.push(`/login`);

        
    }
    
    componentDidMount(){

        localStorage.removeItem('activeCottage');
        localStorage.removeItem('activeRoom');
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "cottage_owner"){this.logout(); alert("Unauthorised access")}
        else{

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
            type:activeUser.type

            });
        }
    }

    
    render() {
        return (
            <div>
                <div className="menu">
                                <button>Profile</button>
                                <button onClick={()=>this.cottages()}>My cottages</button>
                                <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
                </div>
                <div className="registrationdiv">
                    
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                <label> Password: </label>
                                <input name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                <label> Password again: </label>
                                <input name="password2" className="form-control" value={this.state.password} onChange={this.changePassword2Handler}/>

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
                                <div className="center"><button className="loginbtn" onClick={()=>this.update()}>Update</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.deleteprofile(this.state.id)}>Delete</button></div>
                                <br/>
                                

                </div>
            </div>

        )   ;
    }
}

export default CottageOwnerProfileComponent;