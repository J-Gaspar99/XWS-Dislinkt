import React, { Component } from 'react';


class ServiceProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            title: '',
            address: '',
            description:'',
            biography:'',
            maxpersons: '',
            cancellation:''
            
            
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeBiographyHandler = this.changeBiographyHandler.bind(this);
        this.changeMaxPersonsHandler = this.changeMaxPersonsHandler.bind(this);
        this.changeCancellationHandler = this.changeCancellationHandler.bind(this);

        this.update=this.update.bind(this);
        this.pictures=this.pictures.bind(this);
        this.reservations=this.reservations.bind(this);
        this.rules=this.rules.bind(this);
        this.equipment=this.equipment.bind(this);
        this.prices=this.prices.bind(this);
        
    }
        update(){
            this.props.history.push('/serviceprofile');
        }
        pictures(){
            this.props.history.push('/servicepictures');
        }
        reservations(){
            this.props.history.push('/servicereservations');
        }
        rules(){
            this.props.history.push('/servicerules');
        }
        equipment(){
            this.props.history.push('/serviceequipment');
        }
        prices(){
            this.props.history.push('/serviceprice');
        }
        changeTitleHandler = (event) => {
            this.setState({email: event.target.value});
        }
        changeAddressHandler = (event) => {
            this.setState({email: event.target.value});
        }
        changeDescriptionHandler = (event) => {
            this.setState({email: event.target.value});
        }
        changeBiographyHandler = (event) => {
            this.setState({email: event.target.value});
        }
        changeMaxPersonsHandler = (event) => {
            this.setState({email: event.target.value});
        }
        changeCancellationHandler = (event) => {
            this.setState({email: event.target.value});
        }
        render() {
        return (
            <div>
                <div className="menu">
                

                <button className="menubtnLog" onClick={this.loguot} >Logout</button>
                </div>
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Title: </label>
                                <input name="title" className="form-control" value={this.state.title} onChange={this.changeTitleHandler}/>
                                <label> Address: </label>
                                <input name="adress" className="form-control" value={this.state.adress} onChange={this.changeAdressHandler}/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                <label> Instructor biography: </label>
                                <input name="biography" className="form-control" value={this.state.biography} onChange={this.changeBiographyHandler}/>

                                <label> Maximum number of persons: </label>
                                <input name="maxpersons" className="form-control" value={this.state.maxpersons} onChange={this.changeMaxPersonsHandler}/>
                                <label> Cancellation policy: </label>
                                <input name="cancellation" className="form-control" value={this.state.cancellation} onChange={this.changeCancellationHandler}/>
                                
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={this.update}>Update</button></div>
                    <div className="servicemore1">
                    <button className="servicebtn" onClick={this.pictures}>See pictures</button>
                    <button className="servicebtn" onClick={this.reservations}>See free reservations</button>
                    <button className="servicebtn" onClick={this.rules}>See rules of conduct</button>
                    </div>
                    <div className="servicemore2">
                    <button className="servicebtn" onClick={this.equipment}>See equipment included</button>
                    <button className="servicebtn" onClick={this.prices}>See prices</button>
                    </div>


                </div>
            </div>
        );}
    
}

export default ServiceProfileComponent;
