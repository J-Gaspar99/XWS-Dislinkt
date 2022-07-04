import React, { Component } from 'react';


class ClientReviewAdventureComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            email: '',
            firstName: '',
            lastName: '',
            dateOfBirth: "",
            address: '',
            city: '',
            country: '',
            phoneNumber: '',
            
        }

    }


    
    Review(){

        this.props.history.push(`/writeclientreviewadventure`);
    }
    componentDidMount() {
        let ClientToReview = JSON.parse(localStorage.getItem('ClientToReview'))
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "fishing_instructor"){this.logout(); alert("Unauthorised access")}
        else{
        
        
        this.setState({
            id: ClientToReview.id,
            email: ClientToReview.email,
            firstName: ClientToReview.firstName,
            lastName: ClientToReview.lastName,
            dateOfBirth: ClientToReview.dateOfBirth,
            address: ClientToReview.address,
            city: ClientToReview.city,
            country: ClientToReview.country,
            phoneNumber: ClientToReview.phoneNumber,
           
        });
    }

    }


   
    render() {
        return (
            <div>
                
               
                
                <div className="registrationdiv">
                    
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} />
                                

                                <label> First name: </label>
                                <input name="firstName" className="form-control" value={this.state.firstName}/>
                                <label> Last name: </label>
                                <input name="lastName" className="form-control" value={this.state.lastName} />
                                
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} />
                                <label> City: </label>
                                <input name="city" className="form-control" value={this.state.city}/>   
                                <label> Country: </label>
                                <input name="country" className="form-control" value={this.state.country} /> 

                                <label> Phone number: </label>
                                <input name="phoneNumber" className="form-control" value={this.state.phoneNumber}/>
                                <br></br>
                                
                                <div className="center"><button className="loginbtn" onClick={()=>this.Review()}>Write a review</button> </div>                           
                                

                </div>
            </div>
            
        )
    }
}


export default ClientReviewAdventureComponent;