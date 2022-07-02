import axios from 'axios';
import React, { Component } from 'react';
import ReviewService from '../services/ReviewService';
import emailjs from "emailjs-com";


class AdminReviewRequestsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           reviewRequests:[],
           emailOfReceiver:'',
           emailOfSender:''
        }
        
    
        this.denyRequest= this.denyRequest.bind(this);
        this.acceptRequest= this.acceptRequest.bind(this);
    }
    
    
    denyRequest(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));

        ReviewService.deleteReview(id,activeUser.type).then(res=>{
                this.setState({reviewRequests: this.state.reviewRequests.filter(review=>review.id !==id)});
               
        });

        this.sendEmailDeny(id);
    }
    
    acceptRequest(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));

        ReviewService.deleteReview(id,activeUser.type).then(res=>{
            this.setState({reviewRequests: this.state.reviewRequests.filter(review=>review.id !==id)});
            
    });
    
    //davanje penala 
    //kolegini penali u bazi ne rade , tako da mu ne dodeli zapravo penal
    //axios.post("http://localhost:8080/api/v1/clientPenalties", this.state.reviewRequests.idOfReceiver);

    //slanje emaila
    this.sendEmailAccept(id);
    
    }
    sendEmailAccept(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios
        .get("http://localhost:8080/api/v1/clientreviews/" + activeUser.type + '/' + id )
        .then(response => {
            localStorage.setItem('activeRequest',JSON.stringify(response.data));
            
        });
        let activeRequest=  JSON.parse(localStorage.getItem('activeRequest'));
        //send to review sender
        var template_params = {
            "email": activeRequest.emailOfSender,
            "message":"Review request accepted.Client got penalty.",
            "subject": "Review request"
        }
        emailjs.send('service_h91s9bd', 'template_633ebld',template_params,'user_8ZDv9VEXQIiu7UptSVwB3')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
           
         }, function(error) {
            console.log('FAILED...', error);
         });

        //send to recipient
         var template_params2 = {
            "email": activeRequest.emailOfReceiver,
            "message":"Review request accepted.You got penalty.",
            "subject": "Review request"
        }
        emailjs.send('service_h91s9bd', 'template_633ebld',template_params2,'user_8ZDv9VEXQIiu7UptSVwB3')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
           
         }, function(error) {
            console.log('FAILED...', error);
         });
         //window.location.reload();

    }
    sendEmailDeny(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios
        .get("http://localhost:8080/api/v1/clientreviews/" + activeUser.type + '/' + id )
        .then(response => {
            localStorage.setItem('activeRequest',JSON.stringify(response.data));
            
        });
        let activeRequest=  JSON.parse(localStorage.getItem('activeRequest'));
        //send to review sender
        var template_params = {
            "email": activeRequest.emailOfSender,
            "message":"Review request denied.Client didn't get penalty.",
            "subject": "Review request"
        }
        emailjs.send('service_h91s9bd', 'template_633ebld',template_params,'user_8ZDv9VEXQIiu7UptSVwB3')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
           
         }, function(error) {
            console.log('FAILED...', error);
         });

        //send to recipient
         var template_params2 = {
            "email": activeRequest.emailOfReceiver,
            "message":"Review request denied.You didn't get penalty.",
            "subject": "Review request"
        }
        emailjs.send('service_h91s9bd', 'template_633ebld',template_params2,'user_8ZDv9VEXQIiu7UptSVwB3')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
           
         }, function(error) {
            console.log('FAILED...', error);
        });
        //window.location.reload();
    }
    
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
            ReviewService.getReviews(activeUser.type).then((res)=>{
                        this.setState({reviewRequests: res.data});
                });
        } 
        else{this.logout(); alert("Unauthorised access")}  
    } 
    render() {
        return (
            
        <div>
        
            <br/><br/><br/><br/><br/><br/>
            <h2 className="text-center">Client review requests</h2>

               

                <div className="row">
                    <table className = "table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>Email of sender</th>
                                <th>Email of receiver</th>
                                <th>Review message</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.reviewRequests.map(

                                    reviewRequests =>
                                    <tr key= {reviewRequests.id}>
                                        <td>{reviewRequests.emailOfSender}</td>
                                        <td>{reviewRequests.emailOfReceiver} </td>
                                        <td>{reviewRequests.reviewMessage} </td>
                                        
                                        <td><button onClick={()=>this.denyRequest(reviewRequests.id)} className="loginbtn">Deny</button>
                                        <button onClick={()=>this.acceptRequest(reviewRequests.id)} className="loginbtn">Accept</button></td>

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

export default AdminReviewRequestsComponent;