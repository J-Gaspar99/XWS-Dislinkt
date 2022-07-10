import axios from 'axios';
import React, { Component } from 'react';

class AdventureAppointmentReservationComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            appointments: []
        }
        
    }
   
    
    
    toClient(id){
        axios

        .get("http://localhost:8080/api/v1/users/id/fishing_instructor/" + id )

        .then(response => {
            localStorage.setItem('ClientToReview',JSON.stringify(response.data));
            this.props.history.push('/clientreviewadventurereservation');});
            
    }

    componentDidMount(){
       
        
        let activeAdventure =  JSON.parse(localStorage.getItem('activeAdventure'));
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))


        if (activeUser.type != "fishing_instructor"){this.logout(); alert("Unauthorised access")}
        else{

        axios.get("http://localhost:8080/api/v1/adventureappointments/adventure/fishing_instructor/" + activeAdventure.id).then((res)=>{
            this.setState({appointments: res.data});
    });
}
}

    
    render() {
        return (
            <div>
               

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

export default AdventureAppointmentReservationComponent;