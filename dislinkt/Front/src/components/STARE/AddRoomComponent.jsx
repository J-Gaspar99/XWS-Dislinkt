import React, { Component } from 'react';
import axios from 'axios';

class RoomProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            number:'',
            numberOfBeds:'',
            description:'',
            cottageId:'',
            
        }
       
        this.changeNumberHandler = this.changeNumberHandler.bind(this);
        this.changeNumberOfBedsHandler = this.changeNumberOfBedsHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        

     
       
    }
    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    profile()
    {
        
        this.props.history.push(`/cottageownerprofile`);

    }

    cottageprofile()
    {
        
        this.props.history.push(`/cottageprofile`);

    }
    cottages()
    {
        
        this.props.history.push(`/cottageownercottages`);

    }
    viewRooms(){
        this.props.history.push(`/allrooms`);
    }
    

    changeNumberHandler = (event) => {
        this.setState({number: event.target.value});
    }
    changeNumberOfBedsHandler = (event) => {
        this.setState({numberOfBeds: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    Add(){
        let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));

        let room = {           
            id:this.state.id,
            number:this.state.number,
            numberOfBeds:this.state.numberOfBeds,
            description:this.state.description,
            cottageId:activeCottage.id,
        }
        
        console.log('room => ' + JSON.stringify(room));
        axios.post("http://localhost:8080/api/v1/rooms/cottage_owner",room);
        this.props.history.push(`/allrooms`);
        window.location.reload();

    }
    
    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "cottage_owner") { this.logout(); alert("Unauthorised access") }
    }
    render() {
        return (
            <div>
               <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.cottages()}>My cottages</button>
               <button onClick={()=>this.cottageprofile()}>Cottage profile</button>
               <button onClick={()=>this.viewRooms()}>Rooms</button>
               
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
            </div>
                
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Number: </label>
                                <input name="number" className="form-control" value={this.state.number} onChange={this.changeNumberHandler}/>
                                <label> Number of beds: </label>
                                <input name="numberOfBeds" className="form-control" value={this.state.numberOfBeds} onChange={this.changeNumberOfBedsHandler}/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>

                                
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.Add()}>Add</button></div>
                                
                                
                                

                </div>
            </div>

        )   ;
    }
}

export default RoomProfileComponent;