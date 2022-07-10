import { act } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';

class CompanyProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            id:this.props.match.params.id,
            name:'',
            description:'',
            culture:'',
            phone:'',
            email:'',
            webAddress: '',
            ownerId:'',
            isEnabled:''
            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCultureHandler = this.changeCultureHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeWebAddressHandler = this.changeWebAddressHandler.bind(this);
    
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    changeCultureHandler = (event) => {
        this.setState({culture: event.target.value});
    }
    changePhoneHandler = (event) => {
        this.setState({phone: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    changeWebAddressHandler = (event) => {
        this.setState({webAddress: event.target.value});
    }
    update(){
        let activeCompany =  JSON.parse(localStorage.getItem('activeCompany'));

        let updatedCompany = {

            id:activeCompany.id,
            name:this.state.name,
            description:this.state.description,
            culture:this.state.culture,
            phone:this.state.phone,
            email:this.state.email,
            webAddress:this.state.webAddress,
            ownerId:activeCompany.ownerId,
            isEnabled:activeCompany.isEnabled,
           
        };
        //alert(updatedCompany.name); 
        axios.put("http://localhost:8092/company/"+ activeCompany.id,updatedCompany).then((res)=>{
            localStorage.setItem('activeCompany', JSON.stringify(res.data));
            window.location.reload(false);

        });
            


    }
    

    componentDidMount() {

        
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));

        axios.get("http://localhost:8092/company/ownerid/" + activeUser.id).then((res) => {
            localStorage.setItem('activeCompany', JSON.stringify(res.data));
        });
        
        let activeCompany = JSON.parse(localStorage.getItem('activeCompany'));

        this.setState({
            
            name: activeCompany.name,
            description: activeCompany.description,
            culture: activeCompany.culture,
            phone: activeCompany.phone,
            email: activeCompany.email,
            webAddress: activeCompany.webAddress
            
        });

    }

    render() {
        return (
            <div>
                <div className="container">

                    <div className="registrationdiv">
                        <h3 className="text-center"> COMPANY PROFILE </h3>

                        <form>
                            <div className="form-group">
                                <label> Name: </label>
                                <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} /><br/>
                                <label> Description: </label>
                                <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} /><br/>

                                <label> Culture: </label>
                                <input name="culture" className="form-control" value={this.state.culture} onChange={this.changeCultureHandler} /><br/>
                                <label> Phone: </label>
                                <input name="phone" className="form-control" value={this.state.phone} onChange={this.changePhoneHandler} /><br/>
                                <label> Email: </label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} /><br/>
                                
                                <label> Web address: </label>
                                <input name="web" className="form-control" value={this.state.webAddress} onChange={this.changeWebAddressHandler} /><br/>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.update()}>Update</button></div>

                                
                                <br/>
                            </div>
                        </form>

                    </div>




                </div>
            </div>
        );
    }
}

export default CompanyProfileComponent;