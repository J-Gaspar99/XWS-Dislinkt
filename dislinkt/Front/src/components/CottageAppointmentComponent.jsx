import React, { Component } from 'react';

class CottageAppointmentComponent extends Component {
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

    AddAppointment()
    {
        
        this.props.history.push(`/cottageaddappointment`);

    }
    
    AddQuickAppointment()
    {
        
        this.props.history.push(`/cottageaddquickappointment`);

    }
    
    cottages(){
        this.props.history.push(`/cottageownercottages`);
    }
    cottageprofile()
    {
        
        this.props.history.push(`/cottageprofile`);

    }
    profile(){
        this.props.history.push(`/cottageownerprofile`);
    }
    ScheduleForClient(){

        this.props.history.push(`/cottagescheduleforclient`);
    }
    History(){
        this.props.history.push(`/cottageappointmentshistory`);
    }

    CurrentReservations(){
        this.props.history.push(`/cottageappointmentsreservations`);

    }

    componentDidMount(){

        
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
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.cottages()}>My cottages</button>

               <button onClick={()=>this.cottageprofile()}>Cottage profile</button>

               
               <button >Appointments</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
                </div>
                <div className="registrationdiv">
                    
                                

                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.AddAppointment()}>Add Appointment</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.AddQuickAppointment()}>Add Quick Appointment</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.ScheduleForClient()}>Schedule For Client</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.History()}>History</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.CurrentReservations()}>Current Reservations</button></div>
                                <br/>
                                

                </div>
            </div>

        )   ;
    }
}

export default CottageAppointmentComponent;