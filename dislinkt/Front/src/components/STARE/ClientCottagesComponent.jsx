import React, { Component } from 'react';
import { Fade } from 'react-bootstrap';
import CottageService from '../services/CottageService';


class ClientCottagesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cottages: [],
        }
   
    }
   
    cottageProfile(id){
        CottageService.getCottageById(id).then(res=>{
            localStorage.setItem('activeCottage', JSON.stringify(res.data));
        })
        this.props.history.push('/clientcottageprofile')
        
    }
    componentDidMount() {

        CottageService.getCottages().then((res) => {
            this.setState({ cottages: res.data });
        });

        
    }
   
    render() {
        return (
            <div>
            


                <div style={{ height: '50px', width: '400px', position: 'absolute', top: '165px', left: '140px' }}>
                    <text style={{ position: 'absolute',top:'5px' }} >Search by:</text>
                    <select style={{ position: 'absolute', left: '95px', height: '30px' }}>
                        <option>Name</option>
                        <option>Addres</option>
                        <option>Owner</option>
                        <option>Rating</option>
                    </select>
                    <input style={{ position: 'absolute', left: '200px' }}></input>
                </div>

                <h2 style={{position:'absolute',top:'100px',left:'45%'}}>Cottages</h2>
                

                <div className="row">
                    <table className="table table-striped table-borderd" style={{ position: 'absolute', top: '200px', left: '0px' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Description</th>
                                <th>Number of rooms</th>
                                <th>Rating</th>
                                <th>Rules</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody onClick=''>
                            {
                                this.state.cottages.map(
                                    cottages =>
                                        <tr key={cottages.id}>
                                            <td>{cottages.name} </td>
                                            <td>{cottages.address}</td>
                                            <td>{cottages.description} </td>
                                            <td>{cottages.numberOfRooms}</td>
                                            <td>{cottages.rating} </td>
                                            <td>{cottages.rules} </td>
                                         <td><button onClick={() => this.cottageProfile(cottages.id)} className="loginbtn">SEE</button></td>
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

export default ClientCottagesComponent;