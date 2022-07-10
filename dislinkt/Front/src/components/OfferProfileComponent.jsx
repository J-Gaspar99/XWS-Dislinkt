import axios from 'axios';
import React, { Component } from 'react';


class OfferProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
            id: this.props.match.params.id,
            postition: '',
            description: '',
            dailyActivities: '',
            preconditions: '',
            companyId: '',
            companyName: ''
            
            
        }
       
    }
    comments(id){
        //kreiranje active joboffera
        axios.get("http://localhost:8092/joboffer/" + id).then((res)=>{
        localStorage.setItem('activeJobOffer', JSON.stringify(res.data));
        })

        //prelaz na sl stranicu
        this.props.history.push('/comments');
    }
   
    componentDidMount(){
        
        let activeOffer =  JSON.parse(localStorage.getItem('activeOffer'))

            this.setState({
            id:activeOffer.id,
            postition: activeOffer.position,
            description: activeOffer.description,
            dailyActivities: activeOffer.dailyActivities,
            preconditions: activeOffer.preconditions,
            companyId: activeOffer.companyId,
            companyName: activeOffer.companyName

            });
           
        
    }
    render() {
        return (
                
            <div className="registrationdiv">
                    <br/><br/>
                                <label> Company: </label>
                                <input  name="company" className="form-control" value={this.state.companyName}/>
                                
                                <label> Position: </label>
                                <input  name="position" className="form-control" value={this.state.postition}/>
                                <label> Description: </label>
                                <input  name="description" className="form-control" value={this.state.description}/>
                                <label> Daily activities: </label>
                                <input  name="daily" className="form-control" value={this.state.dailyActivities}/>
                                <label> Preconditions: </label>
                                <input  name="phonenumber" className="form-control" value={this.state.preconditions}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.comments(this.state.id)}>See comments</button></div>
                                <br/>

            </div>
            
        )   ;
    }
}

export default OfferProfileComponent;