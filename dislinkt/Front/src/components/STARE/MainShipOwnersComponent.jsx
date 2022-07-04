import axios from 'axios';
import React, { Component } from 'react';
import ShipOwnerService from '../services/ShipOwnerService';

class MainShipOwnersComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            shipOwners:[]
        }
        this.adminprofile = this.adminprofile.bind(this);
        this.logout= this.logout.bind(this); 
        this.income= this.income.bind(this);
        this.regreq= this.regreq.bind(this);

        this.cottageowners=this.cottageowners.bind(this);
        this.cottages=this.cottages.bind(this);
        this.shipowners=this.shipowners.bind(this);
        this.ships=this.ships.bind(this);
        this.fishinginstructors=this.fishinginstructors.bind(this);
        this.clients=this.clients.bind(this);
        this.admins=this.admins.bind(this);
    }
    adminprofile(){
        this.props.history.push('/mainadminprofile');
    }

    regreq(){
        this.props.history.push('/mainregistrationrequests');
    }
    income(){
        this.props.history.push('/mainincome');
    }
    
    cottageowners(){
        this.props.history.push('/maincottageowners');
    }
    cottages(){
        this.props.history.push('/maincottages');
    }
    shipowners(){
        this.props.history.push('/mainshipowners');
    }
    ships(){
        this.props.history.push('/mainships');
    }
    fishinginstructors(){
        this.props.history.push('/mainfishinginstructors');
    }
    clients(){
        this.props.history.push('/mainclients');
    }
    admins(){
        this.props.history.push('/alladmins');
    }
    logout(){
        localStorage.removeItem('activeUser')
        this.props.history.push(`/login`);
    }
    deleteShipOwner(id){
        ShipOwnerService.deleteShipOwner(id).then(res=>{
                this.setState({shipOwners: this.state.shipOwners.filter(shipowner=>shipowner.id !==id)});
                this.props.history.push("/mainshipowners"); // refresh ne radi nzm zasto
        });
    }
    
    componentDidMount(){
        axios.get("http://localhost:8080/api/v1/users/type/ship_owner").then((res)=>{
            this.setState({shipOwners: res.data});
    });
     } 
    render() {
        return (
            <div><div className="menu">
            <button onClick={this.adminprofile} > Profile</button>
            <button onClick={this.regreq}> Registration requests</button>
            <button onClick={this.income}> Income </button>
            <button onClick={this.cottageowners}> Cottage owners </button>
            <button onClick={this.cottages}> Cottages </button>
            <button onClick={this.shipowners}> Ship owners </button>
            <button onClick={this.ships}> Ships </button>
            <button onClick={this.fishinginstructors}> Fishing instructors </button>
            <button onClick={this.clients}> Clients </button>
            <button onClick={this.admins}> Admins </button>
            
            <button className="menubtnLog" onClick={()=>this.logout()} >Logout</button>
            </div>

             
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

export default MainShipOwnersComponent;