import React, { Component } from 'react';
import UserService from '../services/UserService';
import ComplaintsService from '../services/ComplaintsService';
import axios from 'axios';




class AdminComplaintsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            complaints:[],
            
        }
        
        this.writeResponse = this.writeResponse.bind(this);
       
    }
    
    writeResponse(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios
        .get("http://localhost:8080/api/v1/complaints/" + activeUser.type +'/'+ id )
        .then(response => {
            localStorage.setItem('activeComplaint',JSON.stringify(response.data));
            
            });
            this.props.history.push('/adminsendemailcom');
        
    }
    
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

     componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
            ComplaintsService.getComplaints(activeUser.type).then((res)=>{
                    this.setState({complaints: res.data});
            });
        } 
        else{this.logout(); alert("Unauthorised access")} 
     } 
 
    render() {
        return (
            <div>
                 <br/><br/>
            <h2 className="text-center">Complaints</h2>

            <br/><br/>

                <div className="row">
                    <table className = "table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>On what</th>
                                <th>Complaint message</th>
                                <th>Recipint email</th>
                                <th>Sender email</th>
                                
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.complaints.map(

                                    complaints =>
                                    <tr key= {complaints.id}>

                                        <td>{complaints.onWhat}</td>
                                        <td>{complaints.complaintMessage}</td>
                                        <td>{complaints.emailOfComplaintRecipient}</td>
                                        <td>{complaints.emailOfComplaintSender}</td>
                                        
                                        
                                        <td><button onClick={()=>this.writeResponse(complaints.id)} className="loginbtn"> Respond </button></td>
                                        
                                       
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AdminComplaintsComponent;
