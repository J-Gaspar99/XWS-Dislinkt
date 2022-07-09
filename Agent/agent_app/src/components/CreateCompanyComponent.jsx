import React, { Component } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

class CreateCompanyComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            name:'',
            description:'',
            culture:'',
            phone:'',
            email:'',
            webAdress: '',
            owner:'',
            isEnabled:''
            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCultureHandler = this.changeCultureHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeWebAdressHandler = this.changeWebAdressHandler.bind(this);
       
 

        this.create=this.create.bind(this);
        
    }
    create(){
        //CREATE COMPANY
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let newCompany ={
            name:this.state.name,
            description:this.state.description,
            culture:this.state.culture,
            phone:this.state.phone,
            email: this.state.email,
            webAdress:this.state.webAdress,
            owner: activeUser.id,
            isEnabled: "false"
        }

        //alert(newCompany.name);
        axios.post("http://localhost:8092/company",newCompany).then((res) => {
           console.log(res.data);
            }); 
        

            
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
    changeWebAdressHandler = (event) => {
        this.setState({webAdress: event.target.value});
    }
    
    

    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className="registrationdiv">
                        <h3 className="text-center"> CREATE COMPANY </h3>
                
                        <form>
                            <div className="form-group">
                                <label> Name: </label>
                                <input  name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                <label> Description: </label>
                                <input  name="desc" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        
                                <label> Culture: </label>
                                <input  name="cul" className="form-control" value={this.state.culture} onChange={this.changeCultureHandler}/>
                                <label> Phone: </label>
                                <input  name="phone" className="form-control" value={this.state.phone} onChange={this.changePhoneHandler}/>
        
                                <label> Email: </label>
                                <input  name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                <label> Web addres: </label>
                                <input  name="web" className="form-control" value={this.state.webAdress} onChange={this.changeWebAdressHandler}/>
                               
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.create()}>Register</button></div>
                                <br/>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
            </div>
        );
    }
}

export default CreateCompanyComponent;