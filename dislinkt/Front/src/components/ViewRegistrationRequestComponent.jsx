import React, { Component } from 'react';
import RegistrationRequestService from '../services/RegistrationRequestService';
import ClientPointsService from '../services/ClientPointsService';
import axios from 'axios';



class ViewRegistrationRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address: '',
            city:'',
            country:'',
            phoneNumber:'',
            type:'',
            reason:'',
            userPoints:0,
            userCategory:0,
        
            
            
        }
       
    
        //this.acceptRequest= this.acceptRequest.bind(this);
        //this.denyRequest= this.denyRequest.bind(this);
    }

    denyRequest(){
        /*let activeUser =  JSON.parse(localStorage.getItem('activeUser'));

        RegistrationRequestService.deleteRegistrationRequest(id,activeUser.type).then(res=>{
                this.setState({registrationRequests: this.state.registrationRequests.filter(request=>request.id !==id)});
                this.props.history.push("/adminsendemailreg"); 
                
        });*/
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let activeRequest =  JSON.parse(localStorage.getItem('activeRequest'));
        RegistrationRequestService.deleteRegistrationRequest(activeRequest.id,activeUser.type).then(res=>{
         this.props.history.push(`/adminsendemailreg`);   
        });

        
    }
    
    acceptRequest () {
        
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let usersPoints = { userPoints:this.state.userPoints,userCategory:this.state.userCategory}
        console.log('usersPoints => ' + JSON.stringify(usersPoints));
        ClientPointsService.createClientPoints(usersPoints);
        
        let registrationRequests = {email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName:this.state.lastName, address:this.state.address, city:this.state.city, country:this.state.country, phoneNumber:this.state.phoneNumber, type: this.state.type, reason:this.state.reason}
        console.log('registrationRequests => ' + JSON.stringify(registrationRequests));

        RegistrationRequestService.createUser(registrationRequests,activeUser.type).then((res)=>{this.props.history.push('/adminsendemailreg')});

        this.denyRequest(this.props.match.params.id);

    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        let activeRequest = JSON.parse(localStorage.getItem('activeRequest'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
        
            
            this.setState({
                id:activeRequest.id,
                email: activeRequest.email,
                password: activeRequest.password,
                firstName: activeRequest.firstName,
                lastName: activeRequest.lastName, 
                address: activeRequest.address,
                city: activeRequest.city,
                country: activeRequest.country,
                phoneNumber: activeRequest.phoneNumber,
                type:activeRequest.type,
                reason:activeRequest.reason

            });
        }
     
        else{this.logout(); alert("Unauthorised access")}  
    }
    render() {
        return (
            <div>
                 
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Email: </label>
                                <input name="email" className="form-control" defaultValue={this.state.email} />
                                <label> Password: </label>
                                <input name="password" className="form-control" defaultValue={this.state.password} />
                                

                                <label> First name: </label>
                                <input name="firstname" className="form-control" defaultValue={this.state.firstName} />
                                <label> Last name: </label>
                                <input name="lastname" className="form-control" defaultValue={this.state.lastName} />
                                
                                <label> Address: </label>
                                <input name="address" className="form-control" defaultValue={this.state.address}/>
                                <label> City: </label>
                                <input name="city" className="form-control" defaultValue={this.state.city} />   
                                <label> Country: </label>
                                <input name="country" className="form-control" defaultValue={this.state.country}/> 

                                <label> Phone number: </label>
                                <input name="phonenumber" className="form-control" defaultValue={this.state.phoneNumber}/>

                                <label> Type: </label>
                                <input name="type" className="form-control" defaultValue={this.state.type}/>

                                <label> Reason: </label>
                                <input name="reason" className="form-control" defaultValue={this.state.reason}/>


                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.acceptRequest()}>Accept</button></div>
                                <div className="center"><button className="loginbtn" onClick={()=>this.denyRequest()}>Deny</button></div>

                </div>
            </div>
        );
    }
}

export default ViewRegistrationRequestComponent;