import React, { Component } from 'react';
import IncomeService from '../services/IncomeService';
class MainIncomeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
           incomeFromReservations:'',
           percentageOfReservations:''
        }
        this.changeIncomeHandler = this.changeIncomeHandler.bind(this);
        this.changePercentageHandler = this.changePercentageHandler.bind(this);
        this.adminprofile = this.adminprofile.bind(this);
        this.logout= this.logout.bind(this); 
        this.income= this.income.bind(this);
        this.addadmin= this.addadmin.bind(this);
        this.regreq= this.regreq.bind(this);

        this.cottageowners=this.cottageowners.bind(this);
        this.cottages=this.cottages.bind(this);
        this.shipowners=this.shipowners.bind(this);
        this.ships=this.ships.bind(this);
        this.fishinginstructors=this.fishinginstructors.bind(this);
        this.clients=this.clients.bind(this);
        this.admins=this.admins.bind(this);

        this.change=this.change.bind(this);
        
    }
    
    
    change(){
       
        let income = {percentageOfReservations: this.state.percentageOfReservations,
            incomeFromReservations:this.state.incomeFromReservations}
        console.log('income =>' + JSON.stringify(income));

        IncomeService.updateIncome(1,income);
        
    }
    changeIncomeHandler = (event) => {
        this.setState({incomeFromReservations: event.target.value});
    }
    changePercentageHandler = (event) => {
        this.setState({percentageOfReservations: event.target.value});
    }
    adminprofile(){
        this.props.history.push('/mainadminprofile');
    }
    addadmin(){
        this.props.history.push('/addadmin');
    }
    regreq(){
        this.props.history.push('/mainregistrationrequests');
    }
    income(){
        this.props.history.push('/mainincome');
    }
    cottageowners(){
        this.props.history.push('/maincottageowners');
    }
    cottages(){
        this.props.history.push('/maincottages');
    }
    shipowners(){
        this.props.history.push('/mainshipowners');
    }
    ships(){
        this.props.history.push('/mainships');
    }
    fishinginstructors(){
        this.props.history.push('/mainfishinginstructors');
    }
    clients(){
        this.props.history.push('/mainclients');
    }
    admins(){
        this.props.history.push('/alladmins');
    }
    logout(){
        localStorage.removeItem('activeUser')
        this.props.history.push(`/login`);
    }

    componentDidMount(){
       IncomeService.getIncomeById(1).then((res) => {
            let income = res.data;
            this.setState({
                incomeFromReservations: income.incomeFromReservations,
                percentageOfReservations: income.percentageOfReservations
                
            });
        });
    }
    render() {
        return (
            <div>
                <div className="menu">
                <button onClick={this.adminprofile} > Profile</button>
                
                <button onClick={this.regreq}> Registration requests</button>
                <button onClick={this.income}> Income </button>
                <button onClick={this.cottageowners}> Cottage owners </button>
                <button onClick={this.cottages}> Cottages </button>
                <button onClick={this.shipowners}> Ship owners </button>
                <button onClick={this.ships}> Ships </button>
                <button onClick={this.fishinginstructors}> Fishing instructors </button>
                <button onClick={this.clients}> Clients </button>
                <button onClick={this.admins}> Admins </button>

                <button className="menubtnLog" onClick={()=>this.logout()} >Logout</button>
                </div>

                <div className="container">
                    
                    <div className="incomediv">
                        <h3 className="text-center"> INCOME DATA </h3>
                
                        <form>
                            <div className="form-group">
                                <label> Income from reservations:  </label>
                                <input  name="incomeFromReservations" className="form-control" value={this.state.incomeFromReservations} onChange={this.changeIncomeHandler}/>
                                <br/> <br/> 
                                <label> Percentage of reservations: </label>
                                <input  name="percentageOfReservations" className="form-control" value={this.state.percentageOfReservations} onChange={this.changePercentageHandler}/>
                                    
                                <div className="center"><button className="changepercentagebtn" onClick={()=>this.change()}>Change percentage</button></div>
                            </div>
                        </form>
                     </div>    
                </div>
            </div>
        );
    }
}

export default MainIncomeComponent;