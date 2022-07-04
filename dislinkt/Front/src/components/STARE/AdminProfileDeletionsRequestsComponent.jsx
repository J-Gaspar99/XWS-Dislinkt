import React, { Component } from 'react';
import UserService from '../services/UserService';
import ProfileDeletionRequestService from '../services/ProfileDeletionRequestService';
import axios from 'axios';

class AdminProfileDeletionsRequestsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            profiledeletionrequests:[]
        }
        
        this.writeResponse = this.writeResponse.bind(this);
       
    }
    //check this
    writeResponse(userId,id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        axios
        .get("http://localhost:8080/api/v1/users/id/" + activeUser.type + '/'+ userId )
        .then(response => {
            localStorage.setItem('activeRecipient',JSON.stringify(response.data));
            
            });
        
        axios
        .get( "http://localhost:8080/api/v1/profiledeletionrequests/" + activeUser.type + '/'+ id )
        .then(response => {
            localStorage.setItem('activeRequest', JSON.stringify(response.data));
            
            });
        this.props.history.push('/adminsendemail');
    }
    
    
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

     componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" )
        {
        ProfileDeletionRequestService.getProfileDeletionRequests(activeUser.type).then((res)=>{
                 this.setState({profiledeletionrequests: res.data});
         });
        } 
        else{this.logout(); alert("Unauthorised access")} 
     } 
 
    render() {
        return (
            <div>
                 <br/><br/>
            <h2 className="text-center">Account deletion requests</h2>

            <br/><br/>

                <div className="row">
                    <table className = "table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>User type</th>
                                <th>Reason for deletion</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.profiledeletionrequests.map(

                                    profiledeletionrequests =>
                                    <tr key= {profiledeletionrequests.id}>

                                        <td>{profiledeletionrequests.userId}</td>
                                        <td>{profiledeletionrequests.userType}</td>
                                        <td>{profiledeletionrequests.reason}</td>
                                        
                                        <td><button onClick={()=>this.writeResponse(profiledeletionrequests.userId,profiledeletionrequests.id)} className="loginbtn"> Respond </button></td>
                                        
                                       
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

export default AdminProfileDeletionsRequestsComponent;
