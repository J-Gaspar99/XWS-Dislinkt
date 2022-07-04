import React, { Component } from 'react';

class Clientadvenutreshistorycomponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            adventures:[]
        }
     
     }
    render() {
        return (
            <div>
                 <h2 className='text-center'>Visited Adventures</h2>
                <div style={{position:'absolute',width:'1300px',top:'150px'}}>
                    <table className = "table table-striped table-borderd" >
                            <thead>
                                <tr>
                                    <th>Date</th>                                    
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Duration</th>
                                    <th>Instructor name</th>                        
                                    <th>Rating</th>                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.adventures.map(
                                        adventures =>
                                        <tr key= {adventures.id}>
                                            <td>{adventures.address}</td>
                                            <td>{adventures.description} </td>
                                            <td>{adventures.name} </td>
                                            <td>{adventures.rating} </td>
                                            
                                            <td><button onClick={()=>this.deleteShip(adventures.id)} className="loginbtn">Rate</button></td>
                                            
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

export default Clientadvenutreshistorycomponent;
