import React, { Component } from 'react';
import axios from 'axios';

class ShipProfileSOComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            name:'',
            type:'',
            length:'',
            numberOfEngines:'',
            hp:'',
            topSpeed:'',
            navigation:'',
            address:'',
            description:'',
            capacity:'',
            rules:'',
            fishingEquipment:'', 
            ownerId:'',

        }
       
       
    }
    
    
    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
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

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }
    changeNumberOfEnginesHandler = (event) => {
        this.setState({numberOfEngines: event.target.value});
    }

    changeRulesHandler = (event) => {
        this.setState({rules: event.target.value});
    }

    changeLengthHandler = (event) => {
        this.setState({length: event.target.value});
    }
    changeHorsePowerHandler = (event) => {
        this.setState({hp: event.target.value});
    }
    changeTopSpeedHandler = (event) => {
        this.setState({topSpeed: event.target.value});
    }
    changeNavigationHandler = (event) => {
        this.setState({navigation: event.target.value});
    }
    changeCapacityHandler = (event) => {
        this.setState({capacity: event.target.value});
    } 

    changeFishingEquipmentHandler = (event) => {
        this.setState({fishingEquipment: event.target.value});
    }
    Appointments(){
        this.props.history.push(`/shipappointments`);
    }
    
    update(){

        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));

        let ship = {

            name:this.state.name,
            type:this.state.type,
            length:this.state.length,
            numberOfEngines:this.state.numberOfEngines,
            hp:this.state.hp,
            topSpeed:this.state.topSpeed,
            navigation:this.state.navigation,
            address:this.state.address,
            description:this.state.description,
            capacity:this.state.capacity,
            rules:this.state.rules,
            fishingEquipment:this.state.fishingEquipment,            
            ownerId:activeUser.id   

        }
        let shid = this.state.id;

        console.log('ship => ' + JSON.stringify(ship));
        axios.put("http://localhost:8080/api/v1/ships/ship_owner/"+ shid,ship);
        this.props.history.push(`/shipownerships`);
        window.location.reload();

        
    }
    profile()
    {
        
        this.props.history.push(`/shipownerprofile`);

    }
    ships()
    {
        
        this.props.history.push(`/shipownerships`);

    }

    Statistics(){
        this.props.history.push(`/shipstatistics`);
    }
    Maps(){
        const words = this.state.address.split(" ");
        window.location.href=("https://www.google.com/maps/place/"+words[0]+"+"+words[1]+"+"+words[2]);

    }
    UploadPhotos(){

        this.props.history.push(`/uploadimageship`);
    }

    ViewPhotos(){
        this.props.history.push(`/displaypictureship`);
        

    }
    componentDidMount(){
        
        

        let activeShip =  JSON.parse(localStorage.getItem('activeShip'))
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "ship_owner"){this.logout(); alert("Unauthorised access")}
        else{

            this.setState({
                id:activeShip.id,
                name:activeShip.name,
                type:activeShip.type,
                length:activeShip.length,
                numberOfEngines:activeShip.numberOfEngines,
                hp:activeShip.hp,
                topSpeed:activeShip.topSpeed,
                navigation:activeShip.navigation,
                address:activeShip.address,
                description:activeShip.description,
                capacity:activeShip.capacity,
                rules:activeShip.rules,
                fishingEquipment:activeShip.fishingEquipment, 
                ownerId:activeUser.id

            });
        
        localStorage.clear();
        localStorage.setItem('activeUser',JSON.stringify(activeUser));
        localStorage.setItem('activeShip',JSON.stringify(activeShip));
        }
        
    }
    render() {
        return (
            <div>
               <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.ships()}>My ships</button>
               <button>Ship profile</button>
               <button onClick={()=>this.Appointments()}>Appointments</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
            </div>
                
                <div className="registrationdiv">
                    <br/><br/>
                    <label> Name: </label>
                                <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                <label> Type: </label>
                                <input name="type" className="form-control" value={this.state.type} onChange={this.changeTypeHandler}/>
                                <label> Length: </label>
                                <input name="length" className="form-control" value={this.state.length} onChange={this.changeLengthHandler}/>
                                <label> Number of engines: </label>
                                <input name="numberOfEngines" className="form-control" value={this.state.numberOfEngines} onChange={this.changeNumberOfEnginesHandler}/>
                                <label> Horse Power: </label>
                                <input name="hp" className="form-control" value={this.state.hp} onChange={this.changeHorsePowerHandler}/>      
                                <label> Top Speed: </label>
                                <input name="topSpeed" className="form-control" value={this.state.topSpeed} onChange={this.changeTopSpeedHandler}/>
                                <label> Navigation: </label>
                                <input name="navigation" className="form-control" value={this.state.navigation} onChange={this.changeNavigationHandler}/>
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler}/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                <label> Capacity: </label>
                                <input name="capacity" className="form-control" value={this.state.capacity} onChange={this.changeCapacityHandler}/>                        
                                <label> Rules: </label>
                                <input name="rules" className="form-control" value={this.state.rules} onChange={this.changeRulesHandler}/>
                                <label> Fishing Equipment: </label>
                                <input name="fishingEquipment" className="form-control" value={this.state.fishingEquipment} onChange={this.changeFishingEquipmentHandler}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.update()}>Update</button></div>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.Statistics()}>Statistics</button></div>
                                <br></br>
                                <div className="center"><button className="loginbtn" onClick={() => this.Maps()}>View on map</button></div>
                                <br></br>
                                <div className="center"><button className="loginbtn" onClick={() => this.ViewPhotos()}>View photos</button></div>
                                <br></br>
                                <div className="center"><button className="loginbtn" onClick={() => this.UploadPhotos()}>Upload photos</button></div>
                                
                                
                                

                </div>
            </div>

        )   ;
    }
}

export default ShipProfileSOComponent;