import React, { Component } from 'react';
import axios from 'axios';

class AdventureStatisticsComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            endingDate:'',
            startingDate:'',
            grade:'',
            earnings:'',
            adventureId:'',
            appointments:[],
            grades:[],
            
        }
       
        this.changeStartingDateHandler = this.changeStartingDateHandler.bind(this);
        this.changeEndingDateHandler = this.changeEndingDateHandler.bind(this);
       
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
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser.type == "fishing_instructor" )
        {
        
            let activeAdventure =  JSON.parse(localStorage.getItem('activeAdventure'));

            axios.get("http://localhost:8080/api/v1/adventurehistoryappointments/adventure/fishing_instructor/" + activeAdventure.id).then((res)=>{
                this.setState({appointments: res.data});
            }) ;

            
                axios.get("http://localhost:8080/api/v1/grades/typeandid/fishing_instructor/adventure/fishing_instructor/"+activeAdventure.id).then((res2)=>{
                    this.setState({grades: res2.data});

                    this.CalculateGrade();
                 })
        }
        else{this.logout(); alert("Unauthorised access")} 
    }
        
    

    render() {
        return (
            <div>
               
                
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

export default AdventureStatisticsComponent;