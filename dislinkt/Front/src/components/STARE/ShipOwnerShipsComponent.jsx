import axios from 'axios';
import React, { Component } from 'react';

class ShipOwnerShipsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ships: []
        }

    }
    profile() {

        this.props.history.push(`/shipownerprofile`);

    }
    logout() {
        localStorage.clear();
        this.props.history.push(`/login`);

    }
    addship() {


        this.props.history.push(`/addship`);
    }


    viewShip(id) {
        axios
            .get("http://localhost:8080/api/v1/ships/ship_owner/" + id)
            .then(response => {
                localStorage.setItem('activeShip', JSON.stringify(response.data));
                this.props.history.push('/shipprofileso');
            });


    }

    deleteShip(id) {
        axios.delete("http://localhost:8080/api/v1/ships/ship_owner/" + id);
        window.location.reload();
    }

    componentDidMount() {

        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        localStorage.clear();
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        if (activeUser.type != "ship_owner") { this.logout(); alert("Unauthorised access") }
        else {
            axios.get("http://localhost:8080/api/v1/ships/owner/ship_owner/" + activeUser.id).then((res) => {
                this.setState({ ships: res.data });
            });
        }

    }
    render() {
        return (
            <div>
                <div className="menu">

                    <button onClick={() => this.profile()}>Profile</button>
                    <button>My ships</button>
                    <button className="menubtnLog" onClick={() => this.logout()}>Logout</button>
                </div>

                <div> <br /><br /><br /><br /><br /><br /><br /><br />
                    <button onClick={() => this.addship()} className="loginbtn" > Add ship </button>

                    <h2 className="text-center">Ships</h2>



                    <div className="row">
                        <table >
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Length</th>
                                    <th>Nubmer of engines</th>
                                    <th>Horse power</th>
                                    <th>Top speed</th>
                                    <th>Navigation</th>
                                    <th>Address</th>
                                    <th>Description</th>
                                    <th>Capacity</th>
                                    <th>Rules</th>
                                    <th>Fishing equipment</th>
                                    <th>ACTION</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ships.map(
                                        ships =>
                                            <tr key={ships.id}>
                                                <td>{ships.name}</td>
                                                <td>{ships.type}</td>
                                                <td>{ships.length}</td>
                                                <td>{ships.numberOfEngines}</td>
                                                <td>{ships.hp}</td>
                                                <td>{ships.topSpeed}</td>
                                                <td>{ships.navigation}</td>
                                                <td>{ships.address}</td>
                                                <td>{ships.description}</td>
                                                <td>{ships.capacity}</td>
                                                <td>{ships.rules}</td>
                                                <td>{ships.fishingEquipment}</td>


                                                <td>
                                                    <button onClick={() => this.viewShip(ships.id)} className="loginbtn">View</button>
                                                    <button onClick={() => this.deleteShip(ships.id)} className="loginbtn">Delete</button>
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

export default ShipOwnerShipsComponent;