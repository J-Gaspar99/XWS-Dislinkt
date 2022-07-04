import React, { Component } from 'react';
import CottageService from '../services/CottageService';
import validator from 'validator';


class Clientschedulecottagecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cottages: [],
            cottageNames: [],
            hiddenTable: false,
            shownContainer: true,
            numOfDaysError: '',
            numOfPeopleError:'',
            numOfDays: '',
            numOfPeople: ''

        }
        this.cancelCottages = this.cancelCottages.bind(this);
        this.changeNumOfDaysHandler = this.changeNumOfDaysHandler.bind(this);
        this.changeNumOfPeopleHandler = this.changeNumOfPeopleHandler.bind(this);
        
    }
    changeNumOfDaysHandler = (event) => {
        this.setState({ numOfDays: event.target.value });
    }
    changeNumOfPeopleHandler= (event) => {
        this.setState({ numOfPeople: event.target.value });
    }
    validate = () => {
        let  numOfDaysError= '';
        let numOfPeopleError= '';

        if(!validator.isNumeric(this.state.numOfDays)) {
            numOfDaysError='must be number*'
        }
        if(validator.isEmpty(this.state.numOfDays)) {
            numOfDaysError='required*'
        }

        if(!validator.isNumeric(this.state.numOfPeople)) {
            numOfPeopleError='must be number*'
        }
        if(validator.isEmpty(this.state.numOfPeople)) {
            numOfPeopleError='required*'
        }

        if (numOfDaysError || numOfPeopleError){
            this.setState({numOfDaysError,numOfPeopleError});
            return false;
        }
        
        return true;
    }


    cancelCottages() {
        this.props.history.push('/cottages');
    }
    revealHiddenTable(){

        const isValid= this.validate();
        
        if(isValid){
        this.setState({
            hiddenTable:true,
            shownContainer:false
        })
    }
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/api/v1/cottages')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                
                cottageNames: result
              });
            },
           
            
          )
      }
    render() {
        return (
            <div>
                
                <datalist id="allcottages">
                          {
                              this.state.cottageNames.map(
                                cottageNames=>
                                  <option>{cottageNames.name}</option>
                              )
                          }                                                          
                 </datalist>

                {this.state.shownContainer ?
                    <div className='container-xl' style={{ position: 'absolute', top: '120px', left: '450px', backgroundColor: 'lightblue', width: '700px', height: '600px', borderStyle:'dotted',borderRadius:'3%' }}>
                        <div>
                            <label style={{ position: 'absolute', top: '20px', left: '260px', fontWeight: 'bold', fontSize: '50px' }}> Schedule </label>
                        </div>
                        <div style={{ position: 'absolute', top: '120px', width: '300px' }}>
                            <label style={{ position: 'absolute', top: '50px', fontSize: '18px', }}>Choose name</label>
                            <label style={{ position: 'absolute', top: '100px', fontSize: '18px' }}>Choose start time</label>
                            <label style={{ position: 'absolute', top: '150px', fontSize: '18px' }}>Choose end time</label>
                            <label style={{ position: 'absolute', top: '200px', fontSize: '18px' }}>Insert number of people</label>
                        </div>
                        <div style={{ position: 'absolute', top: '120px', right: '0px', width: '300px' }}>
                            <input type="text" list="allcottages" style={{ position: 'absolute', top: '50px', right: '0px', width: '247px' }} />
                            <input type="datetime-local" style={{ position: 'absolute', top: '100px', right: '0px', }} />
                            <input type="datetime-local" style={{ position: 'absolute', top: '150px', right: '0px', width: '247px' }}></input>
                            <input onChange={this.changeNumOfPeopleHandler} value={this.state.numOfPeople} style={{ position: 'absolute', top: '200px', right: '0px', width: '247px' }}></input>
                        </div>
                        <div style={{ width:'200px',height:'80px', position:'absolute',top:'271px',left:'250px'}}>
                            <label style={{color:'red', position:'absolute',right:'2px'}}>{this.state.numOfDaysError}</label>
                            <label style={{color:'red', position:'absolute',right:'2px', top:'50px'}}>{this.state.numOfPeopleError}</label>
                        </div>
                        <div style={{ position: 'absolute', top: '400px', left: '0px' }}>
                            <button style={{ position: 'absolute', left: '200px', width: '100px', height: '50px', backgroundColor: 'silver' }} onClick={()=>this.revealHiddenTable()}> Schedule</button>
                            <button style={{ position: 'absolute', left: '380px', width: '100px', height: '50px' }} onClick={this.cancelCottages} >Cancel</button>
                        </div>
                    </div>
                    : null
                }
                {
                    this.state.hiddenTable ?
                        <div>
                            <div className="row">
                                <table className="table table-striped table-borderd" style={{ position: 'absolute', top: '200px', left: '0px' }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Description</th>
                                            <th>Number of rooms</th>
                                            <th>Rating</th>
                                            <th>Rules</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            this.state.cottages.map(
                                                cottages =>
                                                    <tr key={cottages.id}>
                                                        <td>{cottages.name} </td>
                                                        <td>{cottages.address}</td>
                                                        <td>{cottages.description} </td>
                                                        <td>{cottages.numberOfRooms}</td>
                                                        <td>{cottages.rating} </td>
                                                        <td>{cottages.rules} </td>

                                                        <td><button className="loginbtn">Schedule</button></td>

                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                            </div>


                        </div>
                        : null
                }
            </div>
        );
    }
}

export default Clientschedulecottagecomponent;
