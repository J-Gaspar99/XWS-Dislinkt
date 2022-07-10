import React, { Component, useState } from 'react';
import axios from 'axios';

class AddCottageComponent extends Component {
    constructor(props){
        
        
        super(props)
        this.state={
            name:'',
            address:'',
            description:'',
            rating:'',
            numberOfRooms:'',
            rules:'',
            ownerId:'',
            baseImage:'',
            cottages:[]

        }
       
    }
    cottages()
    {
        
        this.props.history.push(`/cottageownercottages`);

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

    changeRatingHandler = (event) => {
        this.setState({rating: event.target.value});
    }
    changeNumberOfRoomsHandler = (event) => {
        this.setState({numberOfRooms: event.target.value});
    }

    changeRulesHandler = (event) => {
        this.setState({rules: event.target.value});
    }
    changeImageHandler = (event) => {
        this.setState({image: event.target.value});
    }

    profile()
    {
        
        this.props.history.push(`/cottageownerprofile`);

    }
    
    createImageFolder(i){
        
        let images={
            idOfType: this.state.cottages[i].id,
            type:"cottage",
            image1:'',
            image2:'',
            image3:'',
            image4:'',
            image5:'',
        }

        axios.post("http://localhost:8080/api/v1/images/cottage_owner",images);
    

    this.props.history.push(`/cottageownercottages`);
    window.location.reload();
    }
   

    async Add (){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));

        
       
        let cottage = {           
            name:this.state.name,
        address:this.state.address,
        description:this.state.description,
        rating:this.state.rating,
        numberOfRooms:this.state.numberOfRooms,
        rules:this.state.rules,
        ownerId:activeUser.id}

        console.log('cottage => ' + JSON.stringify(cottage));

        axios.post("http://localhost:8080/api/v1/cottages/cottage_owner",cottage);


        await axios.get("http://localhost:8080/api/v1/cottages/owner/cottage_owner/" + activeUser.id).then((res) => {
            this.setState({ cottages: res.data });
            
            });
            
            let i = this.state.cottages.length-1
            this.createImageFolder(i);
            
        
        

    }


    


    componentDidMount(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type != "cottage_owner") { this.logout(); alert("Unauthorised access") }
        
    }
        
    
    render() {
        return (
            <div>
               <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.cottages()}>My cottages</button>
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
</div>
                
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Name: </label>
                                <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                <label> Address: </label>
                                <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler}/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>

                                <label> Rating: </label>
                                <input name="rating" className="form-control" value={this.state.rating} onChange={this.changeRatingHandler}/>
                                <label> Number of rooms: </label>
                                <input name="numberofrooms" className="form-control" value={this.state.numberOfRooms} onChange={this.changeNumberOfRoomsHandler}/>
                                
                                <label> Rules: </label>
                                <input name="rules" className="form-control" value={this.state.rules} onChange={this.changeRulesHandler}/>
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.Add()}>Add</button></div>
                                 
                               

                                

                </div>
            </div>

        )   ;
    }
}

export default AddCottageComponent;