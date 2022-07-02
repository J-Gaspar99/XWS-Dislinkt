import React, { Component } from 'react';
import UserService from '../services/UserService';


class UpdateAdminComponent extends Component {
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
        
       this.updateAdmin=this.updateAdmin.bind(this);
       this.adminprofile = this.adminprofile.bind(this);
       this.logout= this.logout.bind(this); 
       this.income= this.income.bind(this);
       
       this.regreq= this.regreq.bind(this);

       this.cottageowners=this.cottageowners.bind(this);
        this.cottages=this.cottages.bind(this);
        this.shipowners=this.shipowners.bind(this);
        this.ships=this.ships.bind(this);
        this.fishinginstructors=this.fishinginstructors.bind(this);
        this.clients=this.clients.bind(this);
        this.admins=this.admins.bind(this);
    }
    componentDidMount(){
        UserService.getUserById(this.props.match.params.id).then((res) => {
            let admin = res.data;
            this.setState({
                email: admin.email,
                password: admin.password,
                firstName: admin.firstName,
                lastName: admin.lastName, 
                address: admin.address,
                city: admin.city,
                country: admin.country,
                phoneNumber: admin.phoneNumber

            });
        });
    }
    updateAdmin= (e) => {
        e.preventDefault();
        let admin = {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, address:this.state.address, city:this.state.city, country:this.state.country, phoneNumber:this.state.phoneNumber, type:"admin"}
        console.log('admin => ' + JSON.stringify(admin));

        UserService.updateUser( admin,this.props.match.params.id).then(res => {
            this.props.history.push('/alladmins');
        });
    }
    

    //admin profile dugme ne radi nista jer smo vec na profilu, ako bude trebao da refreshuje zbog necega onda cemo ga uraditi
    //kako loguot vratiti na pocetnu tj localhost?
    adminprofile(){
        this.props.history.push('/adminprofile');
    }
   
    regreq(){
        this.props.history.push('/registrationrequests');
    }
    income(){
        this.props.history.push('/income');
    }
    cottageowners(){
        this.props.history.push('/maincottageowners');
    }
    cottages(){
        this.props.history.push('/maincottages');
    }
    shipowners(){
        this.props.history.push('/mainshipowners');
    }
    ships(){
        this.props.history.push('/mainships');
    }
    fishinginstructors(){
        this.props.history.push('/mainfishinginstructors');
    }
    clients(){
        this.props.history.push('/mainclients');
    }
    admins(){
        this.props.history.push('/alladmins');
    }
    logout(){
        localStorage.removeItem('activeUser')
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
    render() {
        return (
            <div>
                
                <div className="menu">
                <button onClick={this.adminprofile} > Profile</button>
                
                <button onClick={this.regreq}> Registration requests</button>
                <button onClick={this.income}> Income </button>
                <button onClick={this.cottageowners}> Cottage owners </button>
                    <button onClick={this.cottages}> Cottages </button>
                    <button onClick={this.shipowners}> Ship owners </button>
                    <button onClick={this.ships}> Ships </button>
                    <button onClick={this.fishinginstructors}> Fishing instructors </button>
                    <button onClick={this.clients}> Clients </button>
                    <button onClick={this.admins}> Admins </button>

                <button className="menubtnLog" onClick={()=>this.logout()} >Logout</button>
                </div>
                
                <div className="registrationdiv">
                    <br/><br/>
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
                                <div className="center"><button className="loginbtn" onClick={this.updateAdmin}>Update</button></div>

                </div>
            </div>

        );
    }
}

export default UpdateAdminComponent;