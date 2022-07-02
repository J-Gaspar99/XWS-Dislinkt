import axios from 'axios';
import React, { Component } from 'react';
import FishingInstructorService from '../services/FishingInstructorService';

class FishingInstructorsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            fishingInstructors:[]
        }
        
    }
    deleteFishingInstructor(id){
        FishingInstructorService.deleteFishingInstructor(id).then(res=>{
                this.setState({fishingInstructors: this.state.fishingInstructors.filter(fishinginstructor=>fishinginstructor.id !==id)});
                this.props.history.push("/fishinginstructors"); // refresh ne radi nzm zasto
        });
    }
    componentDidMount(){
        axios.get("http://localhost:8080/api/v1/users/type/fishing_instructor").then((res)=>{
            this.setState({fishingInstructors: res.data});
    });
    }
    
    render() {
        return (
            
            <div>
                
                <br/><br/><br/><br/><br/><br/>
                <h2 className="text-center">Fishing instructors</h2>

                    <div className="row">
                        <table className = "table table-striped table-borderd">
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
                                    this.state.fishingInstructors.map(
                                        fishingInstructors =>
                                        <tr key= {fishingInstructors.id}>
                                            <td>{fishingInstructors.email}</td>
                                            <td>{fishingInstructors.firstName} </td>
                                            <td>{fishingInstructors.lastName} </td>
                                            <td>{fishingInstructors.address} </td>
                                            <td>{fishingInstructors.city} </td>
                                            <td>{fishingInstructors.country} </td>
                                            <td>{fishingInstructors.phoneNumber} </td>
                                            
                                            
                                            
                                            <td><button onClick={()=>this.deleteFishingInstructor(fishingInstructors.id)} className="loginbtn">Delete</button></td>
                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                
            </div>
            
        );
    }
}

export default FishingInstructorsComponent;