import React, { Component } from 'react';

class Clientshipshistorycomponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            ships:[]
        }
     
     }
    render() {
        return (
            <div >                
                <h2 className='text-center'>Visited Ships</h2>
                <div style={{position:'absolute',width:'1300px',top:'150px'}}>
                    <table className = "table table-striped table-borderd" >
                            <thead>
                                <tr>
                                    <th>Date</th>                                    
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Duration</th>
                                    <th>Ship owner</th>                         
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

export default Clientshipshistorycomponent;
