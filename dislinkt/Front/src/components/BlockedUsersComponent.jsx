import React, { Component } from 'react';

import axios from 'axios';
class BlockedUsersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: []
        }


    }
    

   unblock(id){
        axios.delete("http://localhost:8090/block/" + id );
        alert("User unblocked.");
    }
    componentDidMount() {

        axios.get("http://localhost:8090/block").then((res) => {
            this.setState({ blocks: res.data });

        });


    }
    render() {
        return (
            <div>


                <div> <br /><br /><br /><br /><br /><br /><br /><br />
                    
                    <h2 className="text-center">Blocked users</h2>

                    <div className="row">
                        <table >
                            <thead>
                                <tr>

                                    <th>User name</th>
                                    

                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.blocks.map(
                                        blocks =>
                                            <tr key={blocks.id}>
                                                <td>{blocks.blockedUserName}</td>
                                                

                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.unblock(blocks.id)} className="loginbtn">Unblock</button>
                                                    
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

export default BlockedUsersComponent;