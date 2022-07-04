import React, { Component } from 'react';

import GradeRequestService from '../services/GradeRequestService';
import axios from 'axios';
import emailjs from "emailjs-com";

class AdminGradeRequestsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            graderequests:[],
            grade: '',
            message: '',
            type:'',
            typeId:''
           
        }
        
        this.accept = this.accept.bind(this);
       
    }
    
    accept(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios.get("http://localhost:8080/api/v1/graderequests/getid/" + activeUser.type +'/'+ id)
        .then(response => {
            localStorage.setItem('activeRequest', JSON.stringify(response.data));
        });
        
        // dodavanje u tabelu grade
        
        let activeRequest=JSON.parse(localStorage.getItem('activeRequest'));
        let request = {
            grade: activeRequest.grade,
            message: activeRequest.message,
            type: activeRequest.type,
            typeId: activeRequest.typeId
        } 
        axios.post("http://localhost:8080/api/v1/grades/create/"+ activeUser.type, request);

        this.sendEmail(activeRequest.type);


        //deny da ga izbrise iz tabele requesta
         this.deny(id);
        //window.location.reloade();

        
    }
    sendEmail(type){
        let activeRequest=JSON.parse(localStorage.getItem('activeRequest'));

            var template_params = {
                "email": activeRequest.email,
                "message":"Your grade for " +  activeRequest.type  + " is accepted.",
                "subject": "Grade"
            }

            emailjs.send('service_h91s9bd', 'template_633ebld',template_params,'user_8ZDv9VEXQIiu7UptSVwB3')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
               
             }, function(error) {
                console.log('FAILED...', error);
             });
             

            
      
    }
    /*
    findEmail(){
        let activeRequest=JSON.parse(localStorage.getItem('activeRequest'));
        var email1;
        //var cottageOwner;
        //var cottageOwnerId;
        var shipOwnerId;
        
        switch(activeRequest.type){
            
            case 'cottage_owner':  email1 = (axios.get("http://localhost:8080/api/v1/users/" + activeRequest.typeId)).email ; return email1;

            case 'ship_owner': email1 = (axios.get("http://localhost:8080/api/v1/users/" + activeRequest.typeId)).email ; return email1;

            case 'cottage': {
                
                axios.get("http://localhost:8080/api/v1/cottages/"+ activeRequest.typeId)
                .then((response)=> {
                   let cottageOwner = response.data;
                   let cottageOwnerId= cottageOwner.ownerId;
                   axios.get("http://localhost:8080/api/v1/users/" + cottageOwnerId).then((response=>{let email=response.data; return email;}));
                   
                });
                
               
            }
            case 'ship': {
                 shipOwnerId= axios.get("http://localhost:8080/api/v1/ships/"+ activeRequest.typeId).ownerId ;
                 email1 = (axios.get("http://localhost:8080/api/v1/users/" + shipOwnerId)).email1;
                return email1;
            }

            case 'fishing_instructor':  email1= (axios.get("http://localhost:8080/api/v1/users/" + activeRequest.typeId)).email ; return email1;

            default: return "EmailNotFound";
        }
    }*/
     deny(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios.delete("http://localhost:8080/api/v1/graderequests/" + activeUser.type  + '/' + JSON.parse(localStorage.getItem('activeRequest')).id);
        window.location.reload();
                                            
     }

     logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
     componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
            GradeRequestService.getGradeRequests(activeUser.type).then((res)=>{
                    this.setState({graderequests: res.data});
            });
        } 
        else{this.logout(); alert("Unauthorised access")}  
         
     } 
 
    render() {
        return (
            <div>
                 <br/><br/>
            <h2 className="text-center">Grade requests</h2>

            <br/><br/>

                <div className="row">
                    <table className = "table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>Grade</th>
                                <th>Type</th>
                                
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.graderequests.map(

                                    graderequests =>
                                    <tr key= {graderequests.id}>

                                        <td>{graderequests.grade}</td>
                                        <td>{graderequests.type}</td>
                                        
                                        <td>
                                            <button onClick={()=>this.accept(graderequests.id)} className="loginbtn"> Accept </button>
                                            <button onClick={()=>this.deny(graderequests.id)} className="loginbtn" > Deny </button>
                                        </td>
                                        
                                       
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

export default AdminGradeRequestsComponent;
