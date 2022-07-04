import emailjs from "emailjs-com";
import React from 'react';


export default function AdminSendEmail() {
    
        function sendEmail(e) {
          e.preventDefault();
            
            emailjs.sendForm('service_h91s9bd', 'template_633ebld', e.target, 'user_8ZDv9VEXQIiu7UptSVwB3')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
                e.target.reset()
            
               
           
        } 
         
        
   
    return(
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                    
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email" defaultValue={JSON.parse(localStorage.getItem('activeComplaint')).emailOfComplaintRecipient}/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email2"  defaultValue={JSON.parse(localStorage.getItem('activeComplaint')).emailOfComplaintSender}/>
                        </div>

                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject" defaultValue="Complaint"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Email"></input>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}