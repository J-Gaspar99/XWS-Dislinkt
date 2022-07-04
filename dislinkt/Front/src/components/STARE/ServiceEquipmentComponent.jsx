import React, { Component } from 'react';

class ServiceEquipmentComponent extends Component {
    render() {
        return (
            <div>
                <div className="menu">
                

                <button className="menubtnLog" onClick={this.loguot} >Logout</button>
            </div>
                <h1>Zavisi kako nam je ovo u bazi, pa cemo jos videti sta cemo sa ovim </h1>
            </div>
        );
    }
}

export default ServiceEquipmentComponent;