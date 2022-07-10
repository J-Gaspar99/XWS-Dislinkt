import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import axios from 'axios';

class ClientsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            clients:[]
        }
       
    }
    
    deleteClient(id){
        ClientService.deleteClient(id).then(res=>{
                this.setState({sclients: this.state.clients.filter(client=>client.id !==id)});
                this.props.history.push("/clients"); 
        });
    }
    
        
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
            axios.get("http://localhost:8080/api/v1/users/type/client").then((res)=>{
                this.setState({clients: res.data});
            });
        }  
        
        else{this.logout(); alert("Unauthorised access")}
        
     } 
    render() {
        return (
            <div>
            
                <br/><br/><br/><br/><br/><br/>
                <h2 className="text-center">Clients</h2>

                    <div className="row">
                        <table className = "table table-striped table-borderd">
                            <thead>
                                <tr>
                                <th>Email</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Phone number</th>

                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.clients.map(
                                        clients =>
                                        <tr key= {clients.id}>
                                            <td>{clients.email}</td>
                                            <td>{clients.firstName}</td>
                                            <td>{clients.lastName}</td>
                                            <td>{clients.address}</td>
                                            <td>{clients.city}</td>
                                            <td>{clients.country}</td>
                                            <td>{clients.phoneNumber}</td>
                                            
                                            <td><button onClick={()=>this.deleteClient(clients.id)} className="loginbtn">Delete</button></td>
                                            
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

export default ClientsComponent;
