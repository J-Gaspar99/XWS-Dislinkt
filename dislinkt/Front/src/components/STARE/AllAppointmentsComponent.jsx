import React, { Component } from 'react';
import axios from 'axios';
class AllRoomsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            appointments: []
        }
        this.viewRoom=this.viewRoom.bind(this);
        this.addroom=this.addroom.bind(this);
        

       this.deleteRoom = this.deleteRoom.bind(this);
        this.logout= this.logout.bind(this); 
        
        
    }
    viewAppointment(id){

        axios
        .get("http://localhost:8080/api/v1/appointments/" + id )
        .then(response => {
            localStorage.setItem('activeAppointment',JSON.stringify(response.data));
            this.props.history.push(`/appointmentprofile`);
        });
            
        
    }

    
    logout(){
        localStorage.removeItem('activeUser')
        localStorage.removeItem('activeCottage')
        localStorage.removeItem('activeRoom')
        this.props.history.push(`/login`);
       
    }
    addroom(){
        this.props.history.push('/addappointment');
    }
    deleteRoom(id){
        axios.delete("http://localhost:8080/api/v1/appointments/" + id);
        window.location.reload();
    }
    componentDidMount(){
    
        localStorage.removeItem('activeAppointment');
        let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
        axios.get("http://localhost:8080/api/v1/appointments/cottage/" + activeCottage.id).then((res)=>{
            this.setState({appointments: res.data});
    });
      
        
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <button onClick={this.addroom} className="loginbtn" > Add room </button>
         
                    <h2 className="text-center">Rooms</h2>

               

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Number</th>
                                    <th>Number of beds</th>
                                    <th>Description</th>
                                    
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rooms.map(
                                        rooms =>
                                        <tr key= {rooms.id}>
                                            <td>{rooms.number}</td>
                                            <td>{rooms.numberOfBeds}</td>

                                            <td>{rooms.description}</td>
                                            
                                            <td>
                                                <button onClick={()=>this.viewRoom(rooms.id)} className="loginbtn">View</button> 
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.deleteRoom(rooms.id)} className="loginbtn">Delete</button>
                                            </td>
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

export default AllRoomsComponent;