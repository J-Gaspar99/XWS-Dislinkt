import React, { Component } from 'react';
import UserService from '../services/UserService';

class Clientupdateprofile extends Component {
    constructor(props){
        super(props)
        this.state={ 
            id: this.props.match.params.id,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: "",
            address: '',
            city: '',
            country: '',
            phoneNumber: '',
            type: ''

        }

        this.updateAccount=this.updateAccount.bind(this);
        this.cancelUpdate=this.cancelUpdate.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);

        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
    }
    componentDidMount(){
        UserService.getUserById(this.state.id).then((res)=> {
            let client = res.data;
            this.setState({
                email: client.email,
                password: client.password,
                firstName: client.firstName,
                lastName: client.lastName,
                dateOfBirth: client.dateOfBirth,
                address: client.address,
                city: client.city,
                country: client.country,
                phoneNumber: client.phoneNumber,
                type: client.type
            });
        });
    }
    
    changeFirstNameHandler = (event) => {

        this.setState({ firstName: event.target.value });
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });

    }
    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }
    changeCountryHandler = (event) => {
        this.setState({ country: event.target.value });
    }
    changeDateOfBirthHandler = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }
    changePhoneNumberHandler = (event) => {

        this.setState({ phoneNumber: event.target.value });
    }
    updateAccount = (e) => {
        e.preventDefault();
        let client = { id: this.state.id, email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address,dateOfBirth: this.state.dateOfBirth ,city: this.state.city, country: this.state.country, phoneNumber: this.state.phoneNumber, type: this.state.type, reason: this.state.reason }
        console.log('client => ' + JSON.stringify(client));

  
        localStorage.setItem('activeUser',JSON.stringify(client));


        UserService.updateUser(client,this.state.id).then( res => {
            this.props.history.push('/clientprofile');
        })

        
    }
    cancelUpdate(){
        this.props.history.push("/clientprofile")
    }
    render() {
        return (
            <div>
                <div className='container-xxl' style={{ border: '3px solid #111111', borderRadius:'5%', width: '700px', height: '650px', backgroundColor:'lightgray', position: 'absolute', left: '27%' }}>
                    <text style={{ position: 'absolute', fontSize: '45px', top: '25px', left: '33%' }}> Update data </text>
                    <div style={{ width: '180px', height: '500px', position:'absolute', left:'150px',top:'-90px' }}>
                        <label style={{ position: 'absolute', top: '230px', fontSize: '23px' }}> First name: </label>
                        <label style={{ position: 'absolute', top: '280px', fontSize: '23px' }}> Last name: </label>
                        <label style={{ position: 'absolute', top: '330px', fontSize: '23px' }}> Address: </label>
                        <label style={{ position: 'absolute', top: '380px', fontSize: '23px' }}> City: </label>
                        <label style={{ position: 'absolute', top: '430px', fontSize: '23px' }}> Country: </label>
                        <label style={{ position: 'absolute', top: '480px', fontSize: '23px' }}> Phone number: </label>
                        <label style={{ position: 'absolute', top: '530px', fontSize: '23px' }}> Date of Birth: </label>
                    </div>

                    <div style={{ width: '220px', height: '500px', position: 'absolute', top: '-48px', right: '120px' }}>
                        <input style={{ position: 'absolute', top: '185px' }} placeholder="FirstName" name="firstName" className="form-control" onChange={this.changeFirstNameHandler} />
                        <input style={{ position: 'absolute', top: '235px' }} placeholder="LastName" name="lastName" className="form-control" onChange={this.changeLastNameHandler} />
                        <input style={{ position: 'absolute', top: '285px' }} placeholder="Address" name="address" className="form-control" onChange={this.changeAddressHandler} />
                        <input style={{ position: 'absolute', top: '335px' }} placeholder="City" name="city" className="form-control" onChange={this.changeCityHandler} />
                        <input style={{ position: 'absolute', top: '385px' }} placeholder="Country" name="country" className="form-control" onChange={this.changeCountryHandler} />
                        <input style={{ position: 'absolute', top: '435px' }} placeholder="PhoneNumber" name="phoneNumber" className="form-control" onChange={this.changePhoneNumberHandler} />
                        <input type="date" style={{ position: 'absolute', top: '490px', width: '220px' }} name="dateOfBirth" onChange={this.changeDateOfBirthHandler} />
                    </div>

                    <div style={{position: 'absolute', top: '520px', left: '0px'}}>
                        <button onClick={this.updateAccount} style={{width:'150px',height:'60px', position: 'absolute',  left: '150px' ,backgroundColor:'lightgreen'}}>Update</button>
                        <button onClick={this.cancelUpdate}  style={{width:'150px',height:'60px', position: 'absolute',  left: '380px'}} >Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Clientupdateprofile;
