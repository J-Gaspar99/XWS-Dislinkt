import axios from 'axios';
import React, { Component } from 'react';
import ShipOwnerService from '../services/ShipOwnerService';

class ShipOwnersComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            shipOwners:[]
        }
    
    }
    
    deleteShipOwner(id){
        ShipOwnerService.deleteShipOwner(id).then(res=>{
                this.setState({shipOwners: this.state.shipOwners.filter(shipowner=>shipowner.id !==id)});
                this.props.history.push("/shipowners"); // refresh ne radi nzm zasto
        });
    }
    
    componentDidMount(){
        axios.get("http://localhost:8080/api/v1/users/type/ship_owner").then((res)=>{
            this.setState({shipOwners: res.data});
    });
     } 
    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/><br/>
                <h2 className="text-center">Ship owners</h2>

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
                                    this.state.shipOwners.map(
                                        shipOwners =>
                                        <tr key= {shipOwners.id}>
                                            <td>{shipOwners.email}</td>
                                            <td>{shipOwners.firstName} </td>
                                            <td>{shipOwners.lastName} </td>
                                            <td>{shipOwners.address} </td>
                                            <td>{shipOwners.city} </td>
                                            <td>{shipOwners.country} </td>
                                            <td>{shipOwners.phoneNumber} </td>
                                            
                                            
                                            
                                            <td><button onClick={()=>this.deleteShipOwner(shipOwners.id)} className="loginbtn">Delete</button></td>
                                            
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

export default ShipOwnersComponent;