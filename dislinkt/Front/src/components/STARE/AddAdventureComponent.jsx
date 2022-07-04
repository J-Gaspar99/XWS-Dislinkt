import React, { Component } from 'react';
import axios from 'axios';
import AdventureService from '../services/AdventureService';
class AddAdventureComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            address: '',
            description:'',
            maxPeople:'',
            rulesOfConduct: '',
            termsOfReservation:'',
            instructorId:'',
            adventures:[],
             
        }
        this.addAdventure=this.addAdventure.bind(this);
       
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeAddressHandler=this.changeAddressHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.changeMaxPeopleHandler=this.changeMaxPeopleHandler.bind(this);
        this.changeRulesOfConductHandler=this.changeRulesOfConductHandler.bind(this);
        this.changeTermsOfReservationHandler=this.changeTermsOfReservationHandler.bind(this);
    }

    createImageFolder(i){
        
        let images={
            idOfType: this.state.adventures[i].id,
            type:"adventure",
            image1:'',
            image2:'',
            image3:'',
            image4:'',
            image5:'',
        }

        axios.post("http://localhost:8080/api/v1/images/fishing_instructor",images);
    

    
    }


     async addAdventure(){
         
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        let adventure = {
            name:this.state.name,
             address:this.state.address, 
             description:this.state.description,
              maxPeople:this.state.maxPeople,
               rulesOfConduct:this.state.rulesOfConduct, 
               termsOfReservation:this.state.termsOfReservation, 
               instructorId:activeUser.id, 
               additionalServices:this.state.additionalServices, 
               prices: this.state.prices,
                fishingEquipment:this.state.fishingEquipment}

        console.log('adventure => ' + JSON.stringify(adventure));

        axios.post("http://localhost:8080/api/v1/adventures/fishing_instructor",adventure);

        await axios.get("http://localhost:8080/api/v1/adventures/instructorid/fishing_instructor/" + activeUser.id).then((res) => {
            this.setState({ adventures: res.data });
            
            });
            let i = this.state.adventures.length-1
        this.createImageFolder(i);
           

        
            this.props.history.push('/addadventure')
        

    }
   
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeAddressHandler = (event) => {
        this.setState({address: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }
    changeMaxPeopleHandler = (event) => {
        this.setState({maxPeople: event.target.value});
    }
    changeRulesOfConductHandler = (event) => {
        this.setState({rulesOfConduct: event.target.value});
    }
    changeTermsOfReservationHandler = (event) => {
        this.setState({termsOfReservation: event.target.value});
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "fishing_instructor" )
        {

        } 
        else{this.logout(); alert("Unauthorised access")}  

    }
    render() {
        return (
            <div>
            
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Name: </label>
                                <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler}/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                <label> Max number of people: </label>
                                <input name="maxPeople" className="form-control" value={this.state.maxPeople} onChange={this.changeMaxPeopleHandler}/>

                                <label> Rules of conduct: </label>
                                <input name="rulesOfConduct" className="form-control" value={this.state.rulesOfConduct} onChange={this.changeRulesOfConductHandler}/>
                                <label> Terms of reservation: </label>
                                <input name="termsOfReservation" className="form-control" value={this.state.termsOfReservation} onChange={this.changeTermsOfReservationHandler}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=> this.addAdventure()}>Add</button></div>

                </div>
            </div>
        );
    }
}

export default AddAdventureComponent;