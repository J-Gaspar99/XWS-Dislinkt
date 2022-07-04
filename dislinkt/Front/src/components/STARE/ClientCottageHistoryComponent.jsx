import React, { Component } from 'react';

class ClientCottageHistoryComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            cottages:[]
        }
     
     }
    render() {
        return (
            <div>
 <h2 className='text-center'>Visited Cottages</h2>
                <div style={{position:'absolute',width:'1300px',top:'150px'}}>
                    <table className = "table table-striped table-borderd" >
                            <thead>
                                <tr>
                                    <th>Date</th>                                    
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Duration</th>
                                    <th>Address</th>   
                                    <th>Cottage owner</th>                      
                                    <th>Rating</th>                                    
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cottages.map(
                                        cottages =>
                                        <tr key= {cottages.id}>
                                            <td>{cottages.address}</td>
                                            <td>{cottages.description} </td>
                                            <td>{cottages.name} </td>
                                            <td>{cottages.rating} </td>
                                            
                                            <td><button onClick={()=>this.deleteShip(cottages.id)} className="loginbtn">Rate</button></td>
                                            
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

export default ClientCottageHistoryComponent;
