import React, { Component } from 'react';

import axios from 'axios';
class OffersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offers: []
            

        }


        this.view = this.view.bind(this);
  
    }


    view(id) {
        
        axios.get("http://localhost:8092/joboffer/" + id).then((res) => {
            localStorage.setItem('activeOffer', JSON.stringify(res.data));
            this.props.history.push('/offerprofile');

        });


    }

    componentDidMount() {

        axios.get("http://localhost:8092/joboffer").then((res) => {
            this.setState({ offers: res.data });

        });


    }
    render() {
        return (
            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />
                    
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
                                    

                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.offers.map(
                                        offers =>
                                            <tr key={offers.id}>
                                                <td>{offers.companyName}</td>
                                                <td>{offers.position}</td>
                                                <td>{offers.description}</td>
                                                <td>{offers.dailyActivities}</td>
                                                <td>{offers.preconditions}</td>

                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.view(offers.id)} className="loginbtn">View</button>
                                                   
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

export default OffersComponent;