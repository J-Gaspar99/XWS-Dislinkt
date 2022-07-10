import React, { Component } from 'react';
import ShipsFreeAppointmentService from '../services/ShipsFreeAppointmentService';
import ShipsAppointmentService from '../services/ShipsAppointmentService';

class Clientshipprofilecomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            shipName: '',
            address: '',
            description: '',
            rating: '',
            price:'',
            additionalServices:'',
            rules: '',
            ownerId: '',
            hiddenSchedule: false,
            shownInfo: true,
        }
        this.showSchedule = this.showSchedule.bind(this);
        this.cancelShips = this.cancelShips.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
        this.changeNumOfPeopleHandler = this.changeNumOfPeopleHandler.bind(this);

    }
    componentDidMount() {
        let activeShip = JSON.parse(localStorage.getItem('activeShip'))

        let appointments = ShipsFreeAppointmentService.findShipFreeAppointmentsByCottageId(activeShip.id).then((res) => {
            this.setState({ appointments: res.data });
        })

        this.setState({
            id: activeShip.id,
            shipName: activeShip.name,
            address: activeShip.address,
            description: activeShip.description,
            rating: activeShip.rating,
            numberOfRooms: activeShip.numberOfRooms,
            rules: activeShip.rules,
            ownerId: activeShip.ownerId
        })

    }
    changeNumOfPeopleHandler = (event) => {
        this.setState({ numberOfPeople: event.target.value });
    }
    changeStartTime = (event) => {
        this.setState({ startingDate: event.target.value });
    }
    changeEndTime = (event) => {
        this.setState({ endingDate: event.target.value });
    }
    showSchedule(id){
        ShipsFreeAppointmentService.findShipFreeAppointmentsById(id).then(res=>{
            localStorage.setItem('activeShipAppointment', JSON.stringify(res.data));
        })
  
        let activeShipAppointment = JSON.parse(localStorage.getItem('activeShipAppointment'));

        this.setState({
            hiddenSchedule: true,
            shownInfo: false,
            price: activeShipAppointment.price,
            additionalServices: activeShipAppointment.additionalServices
        })

    }
    cancelShips(){
        this.setState({
            hiddenSchedule:false,
            shownInfo:true
        })
    }
    schedule(){
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeShip = JSON.parse(localStorage.getItem('activeShip'));
        
        let newAppointment = ({clientId: activeUser.id, shipId: activeShip.id, startingDate: this.state.startingDate, endingDate: this.state.endingDate , numberOfPeople: this.state.numberOfPeople, additionalServices: this.state.additionalServices  ,price: this.state.price })
        console.log('newAppointment => ' + JSON.stringify(newAppointment));
            
        
        ShipsAppointmentService.createShipAppointment(newAppointment);
        this.props.history.push(`/clientscheduledships`);        
    }
   
    render() {
        return (
            <div>
                { this.state.shownInfo?
                <label style={{ fontSize: '45px', position: 'absolute', top: '70px', left: '47%' }}> {this.state.shipName} </label>
                :null}
                { this.state.shownInfo?
                <div style={{ position: 'absolute', top: '190px', left: '70px' }}>
                    <label>Owner name:</label>
                    <input style={{ position: 'absolute', left: '160px' }}>{ }</input>
                    <button style={{ position: 'absolute', left: '380px', height: '30px', width: '180px' }}>See owners info  </button>
                </div>
                :null}
                { this.state.shownInfo?
                <div style={{ position: 'absolute', left: '70px', top: '250px', width: '150px', height: '400px' }}>
                    <label style={{ position: 'absolute', top: '0px' }}> Address: </label>
                    <label style={{ position: 'absolute', top: '90px' }}> Description: </label>
                    <label style={{ position: 'absolute', top: '260px' }}> Rating: </label>

                    <label style={{ position: 'absolute', top: '360px' }}> Rules: </label>

                </div>
                :null}
                { this.state.shownInfo?
                <div style={{ position: 'absolute', top: '250px', left: '230px', width: '400px', height: '400px' }} >
                    <input style={{ position: 'absolute', top: '0px' }} name="address" className="form-control" value={this.state.address} onChange={this.changeAddressHandler} />
                    <textarea style={{ position: 'absolute', top: '80px', width: '395px', height: '160px' }} value={this.state.description}></textarea>
                    <input style={{ position: 'absolute', top: '250px' }} name="rating" className="form-control" value={this.state.rating} onChange={this.changeRatingHandler} />
                    <input style={{ position: 'absolute', top: '350px' }} name="rules" className="form-control" value={this.state.rules} onChange={this.changeRulesHandler} />
                </div>
:null}
                { this.state.shownInfo?
                <div style={{ position: 'absolute', left: '700px', top: '180px', width: '750px', height: '480px' }} >
                    <table style={{ position: 'absolute', top: '0px', left: '0px', width: '746px' }}>
                        <thead>
                            <tr>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Price</th>
                                <th>Number of people</th>
                                <th>Additional services</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appointments.map(
                                    appointments =>
                                        <tr key={appointments.id}>
                                            <td>{appointments.startingDate} </td>
                                            <td>{appointments.endingDate}</td>
                                            <td>{appointments.price} </td>
                                            <td>{appointments.numberOfPeople}</td>
                                            <td>{appointments.additionalServices} </td>
                                            <td><button onClick={()=>this.showSchedule(appointments.id)}>SCHEDULE</button></td>

                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                :null}
                {this.state.hiddenSchedule ?
                    <div className='container-xl' style={{ position: 'absolute', top: '120px', left: '450px', backgroundColor: 'lightblue', width: '700px', height: '600px', borderStyle: 'dotted', borderRadius: '3%' }}>
                        <div>
                            <label style={{ position: 'absolute', top: '20px', left: '260px', fontWeight: 'bold', fontSize: '50px' }}> Schedule </label>
                        </div>
                        <div style={{ position: 'absolute', top: '120px', width: '300px' }}>
                            <label style={{ position: 'absolute', top: '50px', fontSize: '18px', }}>Ship name</label>
                            <label style={{ position: 'absolute', top: '100px', fontSize: '18px' }}>Choose start time</label>
                            <label style={{ position: 'absolute', top: '150px', fontSize: '18px' }}>Choose end time</label>
                            <label style={{ position: 'absolute', top: '200px', fontSize: '18px' }}>Insert number of people</label>
                        </div>
                        <div style={{ position: 'absolute', top: '120px', right: '0px', width: '300px' }}>
                            <input value={this.state.shipName} type="text" list="allcottages" style={{ position: 'absolute', top: '50px', right: '0px', width: '247px' }} />
                            <input type="date" onChange={this.changeStartTime} style={{ position: 'absolute', top: '100px', right: '0px', }} />
                            <input type="date" onChange={this.changeEndTime} style={{ position: 'absolute', top: '150px', right: '0px', width: '247px' }}></input>
                            <input onChange={this.changeNumOfPeopleHandler} style={{ position: 'absolute', top: '200px', right: '0px', width: '247px' }}></input>
                        </div>
                        <div style={{ width: '200px', height: '80px', position: 'absolute', top: '271px', left: '250px' }}>
                            <label style={{ color: 'red', position: 'absolute', right: '2px' }}>{this.state.numOfDaysError}</label>
                            <label style={{ color: 'red', position: 'absolute', right: '2px', top: '50px' }}>{this.state.numOfPeopleError}</label>
                        </div>
                        <div style={{ position: 'absolute', top: '400px', left: '0px' }}>
                            <button style={{ position: 'absolute', left: '200px', width: '100px', height: '50px', backgroundColor: 'silver' }} onClick={() => this.schedule()}> Schedule</button>
                            <button style={{ position: 'absolute', left: '380px', width: '100px', height: '50px' }} onClick={this.cancelShips} >Cancel</button>
                        </div>
                    </div>
                    : null}




            </div>
        );
    }
}

export default Clientshipprofilecomponent;
