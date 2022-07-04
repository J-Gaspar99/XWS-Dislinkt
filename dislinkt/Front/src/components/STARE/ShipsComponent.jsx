import React, { Component } from 'react';
import ShipService from '../services/ShipService'

class ShipsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            ships:[]
        }
        
    }
    
    deleteShip(id){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        
        ShipService.deleteShip(id,activeUser.type).then(res=>{
                this.setState({ships: this.state.ships.filter(ship=>ship.id !==id)});
                
        });
        window.location.reload();
    }
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "admin" || activeUser.type == "main_admin" ){
        ShipService.getShips(activeUser.type).then((res)=>{
                 this.setState({ships: res.data});
         });
        }  
        
        else{this.logout(); alert("Unauthorised access")}
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
                                            
                                            <td><button onClick={()=>this.deleteShip(ships.id)} className="loginbtn">Delete</button></td>
                                            
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

export default ShipsComponent;
