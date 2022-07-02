import React, { Component } from 'react';
import RegistrationRequestService from '../services/RegistrationRequestService';
import axios from 'axios';
class RegistrationRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
            registrationRequests:[]
        }
        
    
        this.viewRequest= this.viewRequest.bind(this);
    }
    
    
    denyRequest(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        RegistrationRequestService.deleteRegistrationRequest(id,activeUser.type).then(res=>{
                this.setState({registrationRequests: this.state.registrationRequests.filter(request=>request.id !==id)});
                
        });
        window.location.reload();
        
    }
    
    viewRequest(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios
        .get("http://localhost:8080/api/v1/registrationrequests/" + activeUser.type + '/' + id )
        .then(response => {
            localStorage.setItem('activeRequest',JSON.stringify(response.data));
            this.props.history.push(`/viewrequest`);
        });
        
    }

    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
        RegistrationRequestService.getRegistrationRequests(activeUser.type).then((res)=>{
                    this.setState({registrationRequests: res.data});
            });
        } 
        else{this.logout(); alert("Unauthorised access")}  
    } 
    render() {
        return (
            
        <div>
        
            <br/><br/><br/><br/><br/><br/>
            <h2 className="text-center">Registration requests</h2>

               

                <div className="row">
                    <table className = "table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.registrationRequests.map(

                                    registrationRequests =>
                                    <tr key= {registrationRequests.id}>
                                        <td>{registrationRequests.email}</td>
                                        <td>{registrationRequests.firstName} </td>
                                        <td>{registrationRequests.lastName} </td>
                                        
                                        <td>{registrationRequests.type} </td>
                                        
                                        <td><button onClick={()=>this.denyRequest(registrationRequests.id)} className="loginbtn">Deny</button>
                                        <button onClick={()=>this.viewRequest(registrationRequests.id)} className="loginbtn">View details</button></td>

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

export default RegistrationRequestComponent;