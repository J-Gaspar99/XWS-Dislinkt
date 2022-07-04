import React, { Component } from 'react';
import axios from 'axios';

class ShipStatisticsComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            endingDate:'',
            startingDate:'',
            grade:'',
            earnings:'',
            shipId:'',
            appointments:[],
            grades:[],
            
        }
       
        this.changeStartingDateHandler = this.changeStartingDateHandler.bind(this);
        this.changeEndingDateHandler = this.changeEndingDateHandler.bind(this);
       
 

     
       
    }
    profile()
    {
        
        this.props.history.push(`/shipownerprofile`);

    }

    shipprofile()
    {
        
        this.props.history.push(`/shipprofileso`);

    }
    ships()
    {
        
        this.props.history.push(`/shipownerships`);

    }
    viewRooms(){
        this.props.history.push(`/allrooms`);
    }



    changeStartingDateHandler = (event) => {
        this.setState({startingDate: event.target.value});
    }
    changeEndingDateHandler = (event) => {
        this.setState({endingDate: event.target.value});
    }
    
    
   

    logout(){
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }

    Calculate(){
        let sum =0;
        for(let i = 0; i < this.state.appointments.length; i++) {    //prolaz kroz sve iz baze
                               
            if(this.state.appointments[i].startingDate >= this.state.startingDate && this.state.appointments[i].endingDate <= this.state.endingDate){sum=sum+this.state.appointments[i].price}  
            
            

        }
          
        this.setState({ earnings:sum})
    }
    
    CalculateGrade(){
        let sum =0;
        
        for(let i = 0; i < this.state.grades.length; i++) {    //prolaz kroz sve iz baze
                               
           sum=sum+this.state.grades.grade;
        }

        let avg=sum/this.state.grades.length;
        this.setState({ grade:avg})
    }

    componentDidMount(){
        
        
        let activeShip =  JSON.parse(localStorage.getItem('activeShip'));
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))

        if (activeUser.type != "ship_owner"){this.logout(); alert("Unauthorised access")}
        else{

        axios.get("http://localhost:8080/api/v1/shiphistoryappointments/ship/ship_owner/" + activeShip.id).then((res)=>{
            this.setState({appointments: res.data});
        }) ;

        
            axios.get("http://localhost:8080/api/v1/grades/typeandid/ship_owner/ship/"+activeShip.id).then((res2)=>{
                this.setState({grades: res2.data});

                this.CalculateGrade();
       })
    }
    }
        
    

    render() {
        return (
            <div>
               <div className="menu">
               <button onClick={()=>this.profile()}>Profile</button>
               <button onClick={()=>this.ships()}>My ships</button>
               <button onClick={()=>this.shipprofile()}>Ship profile</button>

               
               

               
               <button className="menubtnLog"  onClick={()=>this.logout()}>Logout</button>
            </div>
                
                <div className="registrationdiv">
                    <br/><br/>
                                <label> Average grade: </label>
                                <input name="numberOfPeople" className="form-control" value={this.state.numberOfPeople} />
                                <label> Select starting date (earnings): </label>
                                <input type="date" name="startingDate" className="form-control" value={this.state.startingDate} onChange={this.changeStartingDateHandler}/>
                                <label> Select ending date (earnings): </label>
                                <input type="date"  name="endingDate" className="form-control" value={this.state.endingDate} onChange={this.changeEndingDateHandler}/>
                                
                                <label> Total earnings during period: </label>
                                <input name="numberOfPeople" className="form-control" value={this.state.earnings} />
                                
                                
                                
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.Calculate()}>Calculate</button></div>
                                
                                
                                

                </div>
            </div>

        )   ;
    }
}

export default ShipStatisticsComponent;