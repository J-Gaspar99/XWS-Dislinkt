import React, { Component } from 'react';
import axios from 'axios';

class CottageProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            description: '',
            rating: '',
            numberOfRooms: '',
            rules: '',
            ownerId: '',

        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRatingHandler = this.changeRatingHandler.bind(this);
        this.changeNumberOfRoomsHandler = this.changeNumberOfRoomsHandler.bind(this);
        this.changeRulesHandler = this.changeRulesHandler.bind(this);




        this.logout = this.logout.bind(this);

    }


    logout() {
        localStorage.removeItem('activeUser')
        localStorage.removeItem('activeCottage')
        localStorage.removeItem('activeRoom')
        this.props.history.push(`/login`);

    }

    Appointments() { }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changeRatingHandler = (event) => {
        this.setState({ rating: event.target.value });
    }
    changeNumberOfRoomsHandler = (event) => {
        this.setState({ numberOfRooms: event.target.value });
    }

    changeRulesHandler = (event) => {
        this.setState({ rules: event.target.value });
    }

    viewRooms(id) {
        this.props.history.push(`/allrooms`);
    }

    viewAppointmets() {

        this.props.history.push(`/cottageappointments`);
    }

    update() {

        let activeUser = JSON.parse(localStorage.getItem('activeUser'));


        let cottage = {

            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            rating: this.state.rating,
            numberOfRooms: this.state.numberOfRooms,
            rules: this.state.rules,
            ownerId: activeUser.id,

        }
        let coid = this.state.id;

        console.log('cottage => ' + JSON.stringify(cottage));
        axios.put("http://localhost:8080/api/v1/cottages/cottage_owner/" + coid, cottage);
        this.props.history.push(`/cottageownercottages`);
        window.location.reload();


    }
    profile() {

        this.props.history.push(`/cottageownerprofile`);

    }
    cottages() {

        this.props.history.push(`/cottageownercottages`);

    }

    Statistics() {
        this.props.history.push(`/cottagestatistics`);

    }

    Maps(){
        const words = this.state.address.split(" ");
        window.location.href=("https://www.google.com/maps/place/"+words[0]+"+"+words[1]+"+"+words[2]);

    }
    UploadPhotos(){

        this.props.history.push(`/uploadimage`);
    }

    ViewPhotos(){
        this.props.history.push(`/displaypicture`);
        

    }
    componentDidMount() {


        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        localStorage.removeItem('activeRoom');
        let activeCottage = JSON.parse(localStorage.getItem('activeCottage'))

        if (activeUser.type != "cottage_owner") { this.logout(); alert("Unauthorised access") }

        else {

            this.setState({
                id: activeCottage.id,
                name: activeCottage.name,
                address: activeCottage.address,
                description: activeCottage.description,
                rating: activeCottage.rating,
                numberOfRooms: activeCottage.numberOfRooms,
                rules: activeCottage.rules,

            });
        }
    }
    render() {
        return (

            <div>
                
                    <div className="menu">
                        <button onClick={() => this.profile()}>Profile</button>
                        <button onClick={() => this.cottages()}>My cottages</button>
                        <button>Cottage profile</button>
                        <button onClick={() => this.viewRooms(this.state.id)}>Rooms</button>
                        <button onClick={() => this.viewAppointmets(this.state.id)}>Appointments</button>
                        <button className="menubtnLog" onClick={() => this.logout()}>Logout</button>
                    </div>
                  
                
                <div style={{ position: 'absolute', top: '100px', left: '35%', height: '600px' }} className="registrationdiv">
                    <br /><br />
                    <h2 className='text-center'>Cottage Profile</h2>
                    <br /><br />
                    <label> Name: </label>
                    <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                    <label> Address: </label>
                    <input name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler} />
                    <label> Description: </label>
                    <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />

                    <label> Rating: </label>
                    <input name="rating" className="form-control" value={this.state.rating} onChange={this.changeRatingHandler} />
                    <label> Number of rooms: </label>
                    <input name="numberOfRooms" className="form-control" value={this.state.numberOfRooms} onChange={this.changeNumberOfRoomsHandler} />

                    <label> Rules: </label>
                    <input name="rules" className="form-control" value={this.state.rules} onChange={this.changeRulesHandler} />

                    <br />
                   
                        <div className="center"><button className="loginbtn" onClick={() => this.update()}>Update</button></div>

                    <br></br>
                    <div className="center"><button className="loginbtn" onClick={() => this.Statistics()}>Statistics</button></div>
                    <br></br>
                    <div className="center"><button className="loginbtn" onClick={() => this.Maps()}>View on map</button></div>
                    <br></br>
                    <div className="center"><button className="loginbtn" onClick={() => this.ViewPhotos()}>View photos</button></div>
                    <br></br>
                    <div className="center"><button className="loginbtn" onClick={() => this.UploadPhotos()}>Upload photos</button></div>


                </div>
            </div>

        );
    }
}

export default CottageProfileComponent;