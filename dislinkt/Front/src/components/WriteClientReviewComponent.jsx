import axios from 'axios';
import React, { Component } from 'react';


class WriteClientReviewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            idOfReceiver:'',
            idOfSender:'',
            emailOfReceiver: '',
            emailOfSender:'',
            reviewMessage:'',
            
        }
        this.changeReviewMessageHandler = this.changeReviewMessageHandler.bind(this);
    }
    
    changeReviewMessageHandler = (event) => {
        this.setState({reviewMessage: event.target.value});
    }
    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    viewAppointmets(){

        this.props.history.push(`/cottageappointments`);
    }
    cottages(){
        this.props.history.push(`/cottageownercottages`);
    }
    cottageprofile()
    {
        
        this.props.history.push(`/cottageprofile`);

    }
    profile(){
        this.props.history.push(`/cottageownerprofile`);
    }

    SubmitNegative(){
        let review ={
            id: this.state.id,
            idOfReceiver:this.state.idOfReceiver,
            idOfSender:this.state.idOfSender,
            emailOfReceiver:this.state.emailOfReceiver,
            emailOfSender:this.state.emailOfSender,
            reviewMessage:this.state.reviewMessage,
        }
        axios.post("http://localhost:8080/api/v1/clientreviews/cottage_owner",review)
        this.props.history.push(`/clientreview`);

    }

    SubmitDidntShow(){

        //minus poen - aleksa
        this.props.history.push(`/clientreview`);
    }
    SubmitPositive(){
        //cuva pozitivan komentar
        this.props.history.push(`/clientreview`);
    }
    componentDidMount() {
        let ClientToReview = JSON.parse(localStorage.getItem('ClientToReview'))
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "cottage_owner"){this.logout(); alert("Unauthorised access")}
        else{
        
        
        this.setState({
            idOfReceiver:ClientToReview.id,
            idOfSender:activeUser.id,
            emailOfReceiver:ClientToReview.email,
            emailOfSender:activeUser.email,

           
        });
    }
    }


   
    render() {
        return (
            <div>
                
               <div className="menu">
               
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.cottages()}>My cottages</button>

               <button onClick={()=>this.cottageprofile()}>Cottage profile</button>

               
               <button onClick={()=>this.viewAppointmets(this.state.id)}>Appointments</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
            </div>
                
                <div className="registrationdiv">
                    
                                <label> Write your comments/suggestions: </label>
                                <div className="col-8 form-group pt-2 mx-auto">
                                <textarea  type="text" cols="30" rows="8" name="reviewMessage" className="form-control" value={this.state.reviewMessage} onChange={this.changeReviewMessageHandler}/>
                            
                                </div>
                                
                                <div className="center"><button className="loginbtn" onClick={()=>this.SubmitNegative()}>Submit negative report</button> </div>   
                                <br></br>  
                                <div className="center"><button className="loginbtn" onClick={()=>this.SubmitDidntShow()}>Client didn't show</button> </div>   
                                <br></br> 
                                <div className="center"><button className="loginbtn" onClick={()=>this.SubmitPositive()}>Submit positive report</button> </div>   
                                <br></br>                     
                                

                </div>
            </div>
            
        )
    }
}


export default WriteClientReviewComponent;