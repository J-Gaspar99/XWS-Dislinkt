import React, { Component } from 'react';
import CottageService from '../services/CottageService';
class MainCottagesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            cottages:[]
        }
        this.adminprofile = this.adminprofile.bind(this);
        this.logout= this.logout.bind(this); 
        this.income= this.income.bind(this);
        this.regreq= this.regreq.bind(this);

        this.cottageowners=this.cottageowners.bind(this);
        this.cottages=this.cottages.bind(this);
        this.shipowners=this.shipowners.bind(this);
        this.fishinginstructors=this.fishinginstructors.bind(this);
        this.ships=this.ships.bind(this);
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
    deleteCottage(id){
        CottageService.deleteCottage(id).then(res=>{
                this.setState({cottages: this.state.cottages.filter(cottage=>cottage.id !==id)});
                this.props.history.push("/cottages"); // refresh ne radi nzm zasto
        });
    }
    componentDidMount(){
        CottageService.getCottages().then((res)=>{
                 this.setState({cottages: res.data});
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
                <h2 className="text-center">Cottages</h2>

                    <div className="row">
                        <table className = "table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Description</th>
                                    <th>Number of rooms</th>
                                    <th>Rating</th>
                                    <th>Rules</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cottages.map(
                                        cottages =>
                                        <tr key= {cottages.id}>
                                            <td>{cottages.name} </td>
                                            <td>{cottages.address}</td>
                                            <td>{cottages.description} </td>
                                            <td>{cottages.numberOfRooms}</td>
                                            <td>{cottages.rating} </td>
                                            <td>{cottages.rules} </td>
                                            
                                            <td><button onClick={()=>this.deleteCottage(cottages.id)} className="loginbtn">Delete</button></td>
                                            
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

export default MainCottagesComponent;