import axios from 'axios';
import React, { Component } from 'react';
import AdventureService from '../services/AdventureService';

class ClientAdventuresComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            adventures: []

        }
        this.viewAdventure = this.viewAdventure.bind(this);
        }
    viewAdventure(id) {
        AdventureService.getAdventureById(id).then(res=>{
            localStorage.setItem('activeAdventure',JSON.stringify(res.data));
        })
        this.props.history.push(`/clientadventureprofile`);
    }
    
    search(search) {
        //this.setState({seach: this.state.seach})
        axios.get("http://localhost:8080/api/v1/adventures/name/" + search).then((res) => {
            this.setState({ adventures: res.data });
        });
    }
    componentDidMount() {
        
        AdventureService.getAdventures().then((res) => {
            this.setState({ adventures: res.data });
        });           
        
    }

    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
    }
    render() {
        return (
            <div>
            
            <button style={{position:'absolute', top:'100px', left:'1200px'}} className='loginbtn'>Schedule</button>
            
                <br />
                <input style={{position:'absolute',top:'100px'}} name="name" value={this.state.search} onChange={this.changeSearchHandler}></input>
                <button style={{position:'absolute',top:'100px',left:'310px', height:'35px'}} onClick={() => this.search(this.state.search)} className="loginbtn">Search</button>


                <h2 style={{position:'absolute',top:'70px',left:'45%'}} className="text-center">Adventures</h2>

                <div className="row">
                    <table style={{position:'absolute', left:'0px',top:'140px'}} className="table table-striped table-borderd">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Description</th>
                                <th>Max number of people</th>
                                <th>Rules of conduct</th>
                                <th>Terms of reservation</th>


                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.adventures.map(
                                    adventures =>
                                        <tr key={adventures.id}>
                                            <td>{adventures.name} </td>
                                            <td>{adventures.address}</td>
                                            <td>{adventures.description}</td>
                                            <td>{adventures.maxPeople}</td>
                                            <td>{adventures.rulesOfConduct}</td>
                                            <td>{adventures.termsOfReservation}</td>

                                                <td><button onClick={() => this.viewAdventure(adventures.id)} className="loginbtn">View</button></td>
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

export default ClientAdventuresComponent;