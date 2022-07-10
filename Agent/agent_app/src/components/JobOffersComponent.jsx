import React, { Component } from 'react';

import axios from 'axios';
class JobOffersComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            
           jobs: []
            
        }
     
        
    }

    
   
 
    componentDidMount(){
        
        axios.get("http://localhost:8092/joboffer").then((res)=>{
            this.setState({jobs: res.data}); });

           
    } 

    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
               
                    <h2 className="text-center">Job offers</h2>
                    
                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                <th>Company</th>
                                    <th>Position</th>
                                    <th>Description</th>
                                    <th>Daily activities</th>
                                    <th>Preconditions</th>
                                    
                                    
                                    
                                    

                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.jobs.map(
                                        jobs =>
                                        <tr key= {jobs.id}>
                                            <td>{jobs.companyName}</td>
                                            <td>{jobs.position}</td>
                                            <td>{jobs.description}</td>
                                            <td>{jobs.dailyActivities}</td>
                                            <td>{jobs.preconditions}</td>
                                            
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

export default JobOffersComponent;