import React, { Component } from 'react';
import UserService from '../services/UserService';
import axios from 'axios';
class AllAdminsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            admins: []
        }
        
        //this.editAdmin=this.editAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);

        
        
    }
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

    addadmin(){
        this.props.history.push('/addadmin');
    }
    deleteAdmin(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
       UserService.deleteUser(id,activeUser.type).then(res=>{
                this.setState({admins: this.state.admins.filter(admin=>admin.id !==id)});
               
        });
        window.location.reload();
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        if (activeUser.type == "main_admin" )
        {
        axios.get("http://localhost:8080/api/v1/users/type/admin" ).then((res)=>{
                this.setState({admins: res.data});
        });
    } 
    else{this.logout(); alert("Unauthorised access")} 
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                    <button onClick={()=>this.addadmin()} className="loginbtn" > Add admin </button>
         
                    <h2 className="text-center">Admins</h2>

               

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>Email</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Phone number</th>
                                    <th>Action</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.admins.map(
                                        admins =>
                                        <tr key= {admins.id}>
                                            <td>{admins.email}</td>

                                            <td>{admins.firstName}</td>
                                            <td>{admins.lastName}</td>
                                            <td>{admins.address}</td>
                                            <td>{admins.city}</td>
                                            <td>{admins.country}</td>
                                            <td>{admins.phoneNumber}</td>
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.deleteAdmin(admins.id)} className="loginbtn">Delete</button>
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

export default AllAdminsComponent;