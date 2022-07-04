import React, { Component } from 'react';
import AdventureService from '../services/AdventureService';

class ViewAdventureComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            address: '',
            description: '',
            maxPeople: '',
            rulesOfConduct: '',
            termsOfReservation: '',
            instructorId: '',
            additionalServices:'',
            prices:'',
            fishingEquipment:'',
            clientComponents: false,
            fishingInstructorComponents: true,
            unautentifiedUserComponents: false

        }
        this.adventures = this.adventures.bind(this);
        this.fishinginstructorprofile = this.fishinginstructorprofile.bind(this);

        this.updateAdventure = this.updateAdventure.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeMaxPeopleHandler = this.changeMaxPeopleHandler.bind(this);
        this.changeRulesOfConductHandler = this.changeRulesOfConductHandler.bind(this);
        this.changeTermsOfReservationHandler = this.changeTermsOfReservationHandler.bind(this);
        this.changeAdditionalServicesHandler = this.changeAdditionalServicesHandler.bind(this);
        this.changePricesHandler = this.changePricesHandler.bind(this);
        this.changeFishingEquipmentHandler = this.changeFishingEquipmentHandler.bind(this);
    }
    updateAdventure (id)  {
        //e.preventDefault();
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        //let activeAdventure =  JSON.parse(localStorage.getItem('activeAdventure'));
        let adventure = { name: this.state.name, address: this.state.address, description: this.state.description, maxPeople: this.state.maxPeople, rulesOfConduct: this.state.rulesOfConduct, termsOfReservation: this.state.termsOfReservation, instructorId: this.state.instructorId, additionalServices: this.state.additionalServices, prices: this.state.prices, fishingEquipment: this.state.fishingEquipment }
        console.log('adventure => ' + JSON.stringify(adventure));

        AdventureService.updateAdventure(adventure,id,activeUser.type ).then(res => {
            this.props.history.push('/adventures');
        });
    }
    fishinginstructorprofile() {
        this.props.history.push('/fishinginstructorprofile')
    }
    adventures() {
        this.props.history.push("/adventures");
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeMaxPeopleHandler = (event) => {
        this.setState({ maxPeople: event.target.value });
    }
    changeRulesOfConductHandler = (event) => {
        this.setState({ rulesOfConduct: event.target.value });
    }
    changeTermsOfReservationHandler = (event) => {
        this.setState({ termsOfReservation: event.target.value });
    }
    changeAdditionalServicesHandler = (event) => {
        this.setState({ additionalServices: event.target.value });
    }
    changePricesHandler = (event) => {
        this.setState({ prices: event.target.value });
    }
    changeFishingEquipmentHandler = (event) => {
        this.setState({ fishingEquipment: event.target.value });
    }

    addAppointment()
    {
        this.props.history.push('/addadventureappointment')
    }

    addQuickAppointment()
    {
        this.props.history.push('/addadventurequickappointment')
    }
    History(){
        this.props.history.push(`/adventureappointmentshistory`);
    }
    ScheduleForClient(){
        this.props.history.push(`/adventurescheduleforclient`);
    }

    CurrentReservation(){
        this.props.history.push(`/adventureappointmentsreservation`);
    }

    Statistics(){
        this.props.history.push(`/adventurestatistics`);
    }
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

    Maps(){
        const words = this.state.address.split(" ");
        window.location.href=("https://www.google.com/maps/place/"+words[0]+"+"+words[1]+"+"+words[2]);

    }

    UploadPhotos(){

        this.props.history.push(`/uploadimageadventure`);
    }

    ViewPhotos(){
        this.props.history.push(`/displaypictureadventure`);
        

    }
    componentDidMount() {
        let activeAdventure =  JSON.parse(localStorage.getItem('activeAdventure'))
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        if (activeUser.type == "fishing_instructor" )
        {

        this.setState({
            id:activeAdventure.id,
            name:activeAdventure.name,
            address:activeAdventure.address,
            description:activeAdventure.description,
            maxPeople:activeAdventure.maxPeople,
            rulesOfConduct:activeAdventure.rulesOfConduct,
            termsOfReservation:activeAdventure.termsOfReservation,
            additionalServices:activeAdventure.additionalServices,
            prices:activeAdventure.prices,
            fishingEquipment:activeAdventure.fishingEquipment,
            instructorId:activeAdventure.instructorId,


        });
    } 
    else{this.logout(); alert("Unauthorised access")} 
    }
    render() {
        return (
            <div>

                
                <h2 className='text-center'>Adventure profile</h2>
                
                    

                <div style={{position:'absolute',top:'100px',left:'35%'}} className="registrationdiv">
                    <br /><br />
                    <label> Name: </label>
                    <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                    <label> Address: </label>
                    <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler} />
                    <label> Description: </label>
                    <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                    <label> Max number of people: </label>
                    <input name="maxPeople" className="form-control" value={this.state.maxPeople} onChange={this.changeMaxPeopleHandler} />

                    <label> Rules of conduct: </label>
                    <input name="rulesOfConduct" className="form-control" value={this.state.rulesOfConduct} onChange={this.changeRulesOfConductHandler} />
                    <label> Terms of reservation: </label>
                    <input name="termsOfReservation" className="form-control" value={this.state.termsOfReservation} onChange={this.changeTermsOfReservationHandler} />

                    <label> Additional services: </label>
                    <input name="additionalServices" className="form-control" value={this.state.additionalServices} onChange={this.changeAdditionalServicesHandler} />
                    <label> Prices: </label>
                    <input name="prices" className="form-control" value={this.state.prices} onChange={this.changePricesHandler} />
                    <label> Fishing equipment: </label>
                    <input name="fishingEquipment" className="form-control" value={this.state.fishingEquipment} onChange={this.changeFishingEquipmentHandler} />
                    <br />

                   
                    <div className="center"><button className="loginbtn" onClick={()=>this.updateAdventure(this.state.id)}>Update</button></div>
                       
                </div>
                <div className="menu2">
                    <button className="loginbtn2" onClick={()=>this.ScheduleForClient()}>Schedule for client</button>
                    
                    <button className="loginbtn2" onClick={()=>this.History()}>History</button>
                    
                    <button className="loginbtn2" onClick={()=>this.CurrentReservation()}>Current Reservation</button>
                    
                    <button className="loginbtn2" onClick={()=>this.Statistics()}>Statistics</button>
                    
                    <button className="loginbtn2" onClick={() => this.Maps()}>View on map</button>
                    
                    <button className="loginbtn2" onClick={() => this.ViewPhotos()}>View photos</button>
                    
                    <button className="loginbtn2" onClick={() => this.UploadPhotos()}>Upload photos</button>

                    <button className="loginbtn2" onClick={()=>this.addAppointment()}>Add appointment</button>
                    
                    <button className="loginbtn2" onClick={()=>this.addQuickAppointment()}>Add Quick appointment</button>
                   
                   </div>     
            </div>
        );
    }
}

export default ViewAdventureComponent;