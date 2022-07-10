import React, { Component } from 'react';
import axios from 'axios';

class AddShipComponent extends Component {
    constructor(props){
        super(props)
        this.state={
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
            ships:[],

        }
       
    }
    ships()
    {
        
        this.props.history.push(`/shipownerships`);

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
        this.setState({fishingEquipment: event.target.value});}
    


    
    profile()
    {
        
        this.props.history.push(`/shipownerprofile`);

    }
    createImageFolder(i){
        
        let images={
            idOfType: this.state.ships[i].id,
            type:"ship",
            image1:'',
            image2:'',
            image3:'',
            image4:'',
            image5:'',
        }

        axios.post("http://localhost:8080/api/v1/images/ship_owner",images);
    

    this.props.history.push(`/shipownerships`);
    window.location.reload();
    }

   async Add(){
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
            
        ownerId:activeUser.id}

        console.log('ship => ' + JSON.stringify(ship));
        axios.post("http://localhost:8080/api/v1/ships/ship_owner",ship);

        await axios.get("http://localhost:8080/api/v1/ships/owner/ship_owner/" + activeUser.id).then((res) => {
            this.setState({ ships: res.data });
            
            });
            
            
            let i = this.state.ships.length-1  //kada radi bez debugera preskace za 1
            this.createImageFolder(i);
        

    }
    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "ship_owner"){this.logout(); alert("Unauthorised access")}
    }
    render() {
        return (
            <div>
               <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.ships()}>My ships</button>
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
                                <div className="center"><button className="loginbtn" onClick={()=>this.Add()}>Add</button></div>
                                

                </div>
            </div>

        )   ;
    }
}

export default AddShipComponent;