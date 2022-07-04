import React, { Component } from 'react';

class ServicePicturesComponent extends Component {
    render() {
        return (
            <div>
                <div className="menu">
                

                    <button className="menubtnLog" onClick={this.loguot} >Logout</button>
                </div>
                <h1> Napraviti galeriju </h1>
            </div>
        );
    }
}

export default ServicePicturesComponent;