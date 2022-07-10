import React, { Component } from 'react';
import axios from 'axios';
import{Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import {DataManager,WebApiAdaptor} from '@syncfusion/ej2-data';
class FishingInstructorScheduleComponent extends Component{
    remoteData = new DataManager({
        url:'http://localhost:3000/api/v1/adventurefreeappointments',
        adaptor: new WebApiAdaptor,
        crossDomain:true,
        fields:{
            startTime: {name:'StartingTime'},
            endTime: {name:'EndingTime'}
        }
    })
    
    
    
   componentDidMount(){
    
    
    }
    
    render(){
        return <ScheduleComponent currentView='Month' selectedDate={new Date(2022, 0, 1)} eventSettings={{ dataSource: this.data }}
            eventSettings={{dataSource:this.remoteData}}>
            <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
            </ScheduleComponent>
    }
}
export default FishingInstructorScheduleComponent;