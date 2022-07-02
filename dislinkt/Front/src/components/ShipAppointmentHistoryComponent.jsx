import axios from 'axios';
import React, { Component } from 'react';

class ShipAppointmentHistoryComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            appointments: []
        }
        
    }
    
    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    viewAppointmets(){

        this.props.history.push(`/shipappointments`);
    }
    ships(){
        this.props.history.push(`/shipownerships`);
    }
    shipprofile()
    {
        
        this.props.history.push(`/shipprofile`);

    }
    profile(){
        this.props.history.push(`/shipownerprofile`);
    }
    
    toClient(id){
        axios
        .get("http://localhost:8080/api/v1/users/id/ship_owner/" + id )
        .then(response => {
            localStorage.setItem('ClientToReview',JSON.stringify(response.data));
            this.props.history.push('/clientreviewship');});
            
    }

    componentDidMount(){
        
        
        let activeShip =  JSON.parse(localStorage.getItem('activeShip'));
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "ship_owner"){this.logout(); alert("Unauthorised access")}
        else{

        axios.get("http://localhost:8080/api/v1/shiphistoryappointments/ship/ship_owner/" + activeShip.id).then((res)=>{
            this.setState({appointments: res.data});
    });
}
    } 
    render() {
        return (
            <div>
               <div className="menu">
               
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.ships()}>My ships</button>

               <button onClick={()=>this.shipprofile()}>Ship profile</button>

               
               <button onClick={()=>this.viewAppointmets(this.state.id)}>Appointments</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
            </div>

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                
         
                    <h2 className="text-center">Appointments</h2>

               

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Starting date</th>
                                    <th>Endign date</th>
                                    <th>Number of people</th>
                                    <th>Additional services</th>
                                    <th>Price</th>
                                    <th>ACTION</th>
                                    
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.appointments.map(
                                        appointments =>
                                        <tr key= {appointments.id}>
                                            <td>{appointments.startingDate}</td>
                                            <td>{appointments.endingDate}</td>
                                            <td>{appointments.numberOfPeople}</td>
                                            <td>{appointments.additionalServices}</td>
                                            <td>{appointments.price}</td>
                                            
                                            
                                            
                                            <td>
                                                <button onClick={()=>this.toClient(appointments.clientId)} className="loginbtn">Client Profile</button> 
                                                
                                                 </td>
                                                 <td style={{visibility:'hidden'}}>{appointments.clientId}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShipAppointmentHistoryComponent;