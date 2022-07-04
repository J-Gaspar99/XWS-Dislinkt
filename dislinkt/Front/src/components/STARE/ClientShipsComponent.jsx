import React, { Component } from 'react';
import ShipService from '../services/ShipService'

class ClientShipsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            ships:[]
        }
        
    }
    componentDidMount(){
        ShipService.getShips().then((res)=>{
                 this.setState({ships: res.data});
         });
     } 
    viewShip(id){
        ShipService.getShipById(id).then(res=>{
            localStorage.setItem('activeShip',JSON.stringify(res.data));
        })
        this.props.history.push('/clientshipprofile')
    }
    render() {
        return (
            <div>
          
                <br/><br/><br/><br/><br/><br/>
                <h1 className="text-center">Ships</h1>

                    <div className="row">
                        <table className = "table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>Description</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                            
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ships.map(
                                        ships =>
                                        <tr key= {ships.id}>
                                            <td>{ships.address}</td>
                                            <td>{ships.description} </td>
                                            <td>{ships.name} </td>
                                            <td>{ships.rating} </td>
                                            
                                            <td><button onClick={()=>this.viewShip(ships.id)} className="loginbtn">View</button></td>
                                            
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

export default ClientShipsComponent;
