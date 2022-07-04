import React, { Component } from 'react';


class RegistrationWaitComponent extends Component {
    constructor(props) {
        super(props)

        this.proceed = this.proceed.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }
    proceed() {
        this.props.history.push('/login'); //treba da ide na index str ondnosno na login page koji je na localhostu 
    }
    returnHome() {
        this.props.history.push('/homepage')
    }
    render() {

        return (
            <div><br /><br /><br /><br /><br /><br />

                <div className="container">

                    <div style={{ position: 'relative', top: '50px' }} className="registrationwaitdiv">
                        <h3 className="text-center"> INFORMATION </h3>


                        <div style={{ height: '400px' }} className="form-group">

                            <h3 style={{ position: 'absolute', top: '150px' }}>Wait for administrator to confirm your registration.</h3><br />
                            <button style={{ position: 'absolute', top: '300px' }} className="proceedbtn" onClick={this.proceed}><h3>Then proceed to login page.</h3></button>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default RegistrationWaitComponent;