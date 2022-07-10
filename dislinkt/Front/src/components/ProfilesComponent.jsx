import React, { Component } from 'react';

import axios from 'axios';
class ProfilesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            profiles: [],
            search :''
        }
        

        this.view = this.view.bind(this);
        this.search = this.search.bind(this);
        
        
    }
    view(id){
      
        axios.get("http://localhost:8081/user/" + id).then(response => {
            localStorage.setItem('activeProfile', JSON.stringify(response.data));
        })

        let activeProfile = JSON.parse(localStorage.getItem('activeProfile'));
        console.log (activeProfile);
        if (activeProfile.publicity==1){
            this.props.history.push('/viewprofile');
        } 
        else {
            alert("Profile that you trying to view is private. Please login and follow the profile if you still want to view it.")
        }


    }
 
    
    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
        

    }
    search(username) {
        
        axios.get("http://localhost:8081/user/username/" + username).then((res) => {
            this.view(res.data.id)
        });
    } 
    componentDidMount(){
        
        axios.get("http://localhost:8081/user").then((res)=>{
                this.setState({profiles: res.data});
                
        });
        
    
    } 
    render() {
        return (
            <div>
               

                <div> <br/><br/><br/><br/><br/><br/><br/><br/>
                <input style={{position:'absolute',top:'154px'}} name="name" value={this.state.search} onChange={this.changeSearchHandler}></input>
                <button style={{position:'absolute',top:'150px',left:'440px'}} onClick={() => this.search(this.state.search)} className="loginbtn">Search</button>
                
                    <h2 className="text-center">Profiles</h2>

                    <div className="row">
                     <table >
                            <thead>
                                <tr>
                                
                                    <th>User name</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    
                                    <th>Action</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.profiles.map(
                                        profiles =>
                                        <tr key= {profiles.id}>
                                            <td>{profiles.userName}</td>
                                            <td>{profiles.firstName}</td>
                                            <td>{profiles.lastName}</td>
                                           
                                            <td>
                                                <button style={{marginLeft:"10px"}} onClick={()=>this.view(profiles.id)} className="loginbtn">View</button>
                                                
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

export default ProfilesComponent;