import React, { Component } from 'react';

import axios from 'axios';
class CompaniesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           companies: []
           
            
        }
     
        
    }
    
    allow(id){
        //Change company isEnabled from false to true

        //naci kompaniju sa id
        axios.get("http://localhost:8092/company/" + id).then((res)=>{
            localStorage.setItem('activeCompany', JSON.stringify(res.data));
        });
        
        
        
        let activeCompany =  JSON.parse(localStorage.getItem('activeCompany'));
        
        let updatedCompany = {
            
            name:activeCompany.name,
            description:activeCompany.description,
            culture:activeCompany.culture,
            phone:activeCompany.phone,
            email:activeCompany.email,
            webAddress:activeCompany.webAddress,
            isEnabled: true
              
        };
        

        axios.put("http://localhost:8092/company/"+ activeCompany.id, updatedCompany).then(response => {
            //console.log(response.data);
        });

            //VLASNIKU KOMAPNIJE TREBA PROMENITI ULOGU DA BUDE ZAPRAVO VLASNIK
            axios.get("http://localhost:8092/user/" + activeCompany.ownerId).then((res)=>{
                
                let updatedOwner = {
                    id:res.data.id,
                    username:res.data.username,
                    password:res.data.password,
    
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    email: res.data.email,
                    uloga: 3,
                      
                };
                axios.put("http://localhost:8092/user/"+ res.data.id, updatedOwner);

            });
            window.location.reload(false);

            
    }

    deny(id){
        
        axios.delete("http://localhost:8092/company/"+ id);
        window.location.reload(false);

    }
    
 
    componentDidMount(){
        
        axios.get("http://localhost:8092/company/isenabled/false" ).then((res)=>{
            this.setState({companies: res.data}); });

            console.log(this.state.companies);
    } 

    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">Company requests</h2>
                    
                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Culture</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Web address</th>
                                    
                                    <th>Action</th>
                                    

                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.companies.map(
                                        companies =>
                                        <tr key= {companies.id}>
                                            <td>{companies.name}</td>
                                            <td>{companies.description}</td>
                                            <td>{companies.culture}</td>
                                            <td>{companies.phone}</td>
                                            <td>{companies.email}</td>
                                            <td>{companies.webAdress}</td>
                                            
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.allow(companies.id)} className="loginbtn">Allow</button>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.deny(companies.id)} className="loginbtn">Deny</button>
                                                
                                            </td>
                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompaniesComponent;