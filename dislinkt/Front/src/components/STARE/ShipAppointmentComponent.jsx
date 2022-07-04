import React, { Component } from 'react';

class ShipAppointmentComponent extends Component {
    constructor(props){
        super(props)
        this.state={
                      
        }
      
        
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
    ScheduleForClient(){
        this.props.history.push(`/shipscheduleforclient`);
    }
    AddAppointment()
    {
        
        this.props.history.push(`/shipaddappointment`);

    }
    
    AddQuickAppointment()
    {
        
        this.props.history.push(`/shipaddquickappointment`);

    }
    shipProfile(){
        this.props.history.push(`/shipprofileso`);
    }
    profile()
    {
        
        this.props.history.push(`/shipownerprofile`);

    }
    ships()
    {
        
        this.props.history.push(`/shipownerships`);

    }

    History(){
        this.props.history.push(`/shipappointmentshistory`);
    }

    CurrnetReservation(){
        this.props.history.push(`/shipappointmentsreservation`);
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "ship_owner"){this.logout(); alert("Unauthorised access")}
       
    }

    
    render() {
        return (
            <div>
                <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.ships()}>My ships</button>
               <button onClick={()=>this.shipProfile()}>Ship profile</button>
               
               <button>Appointments</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
                </div>
                <div className="registrationdiv">
                    
                                

                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.AddAppointment()}>Add Appointment</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.AddQuickAppointment()}>Add Quick Appointment</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.ScheduleForClient()}>Schedule For Client</button></div>
                                <br></br>
                                <div className="center"><button className="loginbtn" onClick={()=>this.History()}>History</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.CurrnetReservation()}>Currnet Reservation</button></div>
                                <br/>
                                

                </div>
            </div>

        )   ;
    }
}

export default ShipAppointmentComponent;