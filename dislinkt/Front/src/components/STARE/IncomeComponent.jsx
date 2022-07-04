import React, { Component } from 'react';
import IncomeService from '../../services/IncomeService';
import axios from 'axios';

class IncomeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
           incomeFromReservations:'',
           percentageOfReservations:'',
           sistemIncome:'',
           adventureAppointments:[],
           cottageAppointments:[],
           shipAppointments:[],
           startingDate:"2022-01-01"
        }
        //this.changeIncomeHandler = this.changeIncomeHandler.bind(this);
        this.changePercentageHandler = this.changePercentageHandler.bind(this);
        
        this.change=this.change.bind(this);
        
    }
    
    
    change(){
       
        let income = {percentageOfReservations: this.state.percentageOfReservations,
            incomeFromReservations:this.state.incomeFromReservations}
        console.log('income =>' + JSON.stringify(income));

        IncomeService.updateIncome(1,income);
        
    }
    /*changeIncomeHandler = (event) => {
        this.setState({incomeFromReservations: event.target.value});
    }*/
    changePercentageHandler = (event) => {
        this.setState({percentageOfReservations: event.target.value});
    }


    CalculateIncomeFromReservations(){
            
        axios.get("http://localhost:8080/api/v1/adventurehistoryappointments/type/admin").then((res2)=>{
            this.setState({adventureAppointments:res2.data});
        });

        axios.get("http://localhost:8080/api/v1/cottagehistoryappointments").then((res3)=>{
            this.setState({cottageAppointments:res3.data});
        });

        axios.get("http://localhost:8080/api/v1/shiphistoryappointments").then((res3)=>{
            this.setState({shipAppointments:res3.data});
        });


        console.log(this.state.adventureAppointments);
        console.log(this.state.cottageAppointments);
        console.log(this.state.shipAppointments);


        var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //Januar je 0
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
    
            
    
        let sumAdventure =0;
        for(let i = 0; i < this.state.adventureAppointments.length; i++) {    //prolaz kroz sve iz baze za adventure
                               
            if(this.state.adventureAppointments[i].startingDate >= this.state.startingDate && this.state.adventureAppointments[i].endingDate<= this.state.today){sumAdventure=sumAdventure+this.state.adventureAppointments[i].price}  
    
        }
        let sumCottage =0;
        for(let i = 0; i < this.state.cottageAppointments.length; i++) {    //prolaz kroz sve iz baze za cottage
                               
            if(this.state.cottageAppointments[i].startingDate >= this.state.startingDate && this.state.cottageAppointments[i].endingDate<= this.state.today){sumCottage=sumCottage+this.state.cottageAppointments[i].price}  
    
        }
        let sumShip =0;
        for(let i = 0; i < this.state.shipAppointments.length; i++) {    //prolaz kroz sve iz baze za ship 
                               
            if(this.state.shipAppointments[i].startingDate >= this.state.startingDate && this.state.shipAppointments[i].endingDate<= this.state.today){sumShip=sumShip+this.state.shipAppointments[i].price}  
    
        }
        let sum = sumAdventure + sumCottage + sumShip;
          
        this.setState({incomeFromReservations:sum});

        let sistemIncome = sum/100 * this.state.percentageOfReservations;

        this.setState.sistemIncome = sistemIncome;
     
    }
    
    logout(){
       
        localStorage.clear();
        this.props.history.push(`/login`);
       
    }
    componentDidMount(){
        let activeUser =  JSON.parse(localStorage.getItem('activeUser'))
        if (activeUser.type == "admin" || activeUser.type == "main_admin" ){
          IncomeService.getIncomeById(1,activeUser.type).then((res) => {
                let income = res.data;
                this.setState({
                   
                    percentageOfReservations: income.percentageOfReservations
                    
                });
            });

           
            console.log(this.state.percentageOfReservations);

        this.CalculateIncomeFromReservations();
        }  
        
        else{this.logout(); alert("Unauthorised access")}

        }
    
    render() {
        return (
                <div className="container">
                    
                    <div className="incomediv">
                        <h3 className="text-center"> INCOME DATA </h3>
                
                        <form>
                            <div className="form-group">
                                <label> Income from reservations:  </label>
                                <input  name="incomeFromReservations" className="form-control" defaultValue={this.state.incomeFromReservations} />
                                
                                <label> Percentage of reservations: </label>
                                <input  name="percentageOfReservations" className="form-control" value={this.state.percentageOfReservations} onChange={this.changePercentageHandler}/>
                                
                                <label> Sistem income: </label>
                                <input  name="sistemIncome" className="form-control" defaultValue={this.state.sistemIncome} />     
                                <div className="center"><button className="changepercentagebtn" onClick={()=>this.change()}>Change percentage</button></div>
                            </div>
                        </form>
                     </div>    
                </div>
            
        );
    }
}

export default IncomeComponent;





