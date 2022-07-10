import React, { Component } from 'react';
import RegistrationRequestService from '../services/RegistrationRequestService';

class MainRegistrationRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
            registrationRequests:[]
        }
        //let registrationRequests= {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, address:this.state.address, city:this.state.city, country:this.state.country, phoneNumber:this.state.phoneNumber, type: this.state.type}
        this.adminprofile = this.adminprofile.bind(this);
        this.logout= this.logout.bind(this); 
        this.income= this.income.bind(this);
        this.regreq= this.regreq.bind(this);
        
        this.cottageowners=this.cottageowners.bind(this);
        this.cottages=this.cottages.bind(this);
        this.shipowners=this.shipowners.bind(this);
        this.ships=this.ships.bind(this);
        this.clients=this.clients.bind(this);
        this.fishinginstructors=this.fishinginstructors.bind(this);
        this.admins=this.admins.bind(this);
    
        this.viewRequest= this.viewRequest.bind(this);
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
    denyRequest(id){
        RegistrationRequestService.deleteRegistrationRequest(id).then(res=>{
                this.setState({registrationRequests: this.state.registrationRequests.filter(request=>request.id !==id)});
                this.props.history.push("/mainregistrationrequests"); // refresh ne radi nzm zasto
        });
        window.location.reload();
    }
    
    viewRequest(id){
        this.props.history.push(`/mainviewrequests/${id}`);
    }
    
    
   /* acceptRequest= (e) => {
        //e.preventDefault();
        //let registrationRequests = {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, address:this.state.address, city:this.state.city, country:this.state.country, phoneNumber:this.state.phoneNumber, type: this.state.type}
        let registrationRequests = this.state.registrationRequests;
        console.log('registrationRequests => ' + JSON.stringify(registrationRequests));

        //RegistrationRequestService.createUser(registrationRequests).then((res)=>{this.props.history.push('/registrationrequest')});


        //const{type} = props
        switch(registrationRequests.type){
            case 'fishing_instructor':
                RegistrationRequestService.createRegistrationRequestFI(registrationRequests).then((res)=>{this.props.history.push('/registrationrequest')});
            break;

            case 'ship_owner':
                RegistrationRequestService.createRegistrationRequestSO(registrationRequests).then((res)=>{this.props.history.push('/registrationrequest')});
            break;

            case 'cottage_owner':
                RegistrationRequestService.createRegistrationRequestCO(registrationRequests).then((res)=>{this.props.history.push('/registrationrequest')});
            break;

            case 'user':
                RegistrationRequestService.createRegistrationRequestU(registrationRequests).then((res)=>{this.props.history.push('/registrationrequest')});
            break;
            
            default :
            
        }
        
    }*/

    componentDidMount(){
       RegistrationRequestService.getRegistrationRequests().then((res)=>{
                this.setState({registrationRequests: res.data});
        });
    } 
    render() {
        return (
            
        <div>
            <div className="menu">
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

export default MainRegistrationRequestComponent;