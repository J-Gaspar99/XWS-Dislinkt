import axios from 'axios';
import React, { Component } from 'react';

class CottageAppointmentHistoryComponent extends Component {
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

        this.props.history.push(`/cottageappointments`);
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
    
    toClient(id){
        axios
        .get("http://localhost:8080/api/v1/users/id/cottage_owner/" + id )
        .then(response => {
            localStorage.setItem('ClientToReview',JSON.stringify(response.data));
            this.props.history.push('/clientreview');});
            
    }

    componentDidMount(){
        
        
        let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "cottage_owner"){this.logout(); alert("Unauthorised access")}
        else{

        axios.get("http://localhost:8080/api/v1/cottagehistoryappointments/cottage/cottage_owner/" + activeCottage.id).then((res)=>{
            this.setState({appointments: res.data});
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

export default CottageAppointmentHistoryComponent;