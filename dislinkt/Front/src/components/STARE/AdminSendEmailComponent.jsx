import emailjs from "emailjs-com";
import React from 'react';
import axios from 'axios';
import UserService from '../services/UserService';

export default function AdminSendEmail() {
    const selectedOption = '';
        function sendEmail(e) {
            e.preventDefault();
            
            emailjs.sendForm('service_h91s9bd', 'template_633ebld', e.target, 'user_8ZDv9VEXQIiu7UptSVwB3')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
                e.target.reset()
            
               
           /* if(selectedOption == "Accepted")  {
                
                //UserService.deleteUser(JSON.parse(localStorage.getItem('activeRecipient')).id); 
                axios.delete("http://localhost:8080/api/v1/users/"+ JSON.parse(localStorage.getItem('activeRecipient')).id);
                axios.delete("http://localhost:8080/api/v1/profiledeletionrequests/"+ JSON.parse(localStorage.getItem('activeRequest')).id);
            }
            else axios.delete("http://localhost:8080/api/v1/profiledeletionrequests/"+ JSON.parse(localStorage.getItem('activeRequest')).id);  
            */
        } 
         
        
   
    return(
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                    
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email" value={JSON.parse(localStorage.getItem('activeRequest')).userEmail}/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject" value="Account deletion request"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Email"></input>
                        </div>



                        <div className="col-8 pt-3 mx-auto">
                            <input type="button" className="btn btn-info" value="Accept deletion" onClick={()=>(
                                axios.delete("http://localhost:8080/api/v1/users/admin/"+ JSON.parse(localStorage.getItem('activeRecipient')).id),
                                axios.delete("http://localhost:8080/api/v1/profiledeletionrequests/delete/admin/"+ JSON.parse(localStorage.getItem('activeRequest')).id)
                            )}></input>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="button" className="btn btn-info" value="Deny deletion" onClick={()=>axios.delete("http://localhost:8080/api/v1/profiledeletionrequests/delete/admin/"+ JSON.parse(localStorage.getItem('activeRequest')).id)}></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}