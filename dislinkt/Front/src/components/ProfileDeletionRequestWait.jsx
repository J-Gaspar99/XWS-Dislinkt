import React, { Component } from 'react';

class Profiledeletionrequestwait extends Component {
    constructor(props) {
        super(props)


        this.returnHome = this.returnHome.bind(this);
    }
    returnHome(){
        this.props.history.push('/homepage')
    }
    proceed(){ 
        localStorage.clear();
        this.props.history.push('/login')
    }
   
    render() {
        return (
            <div>
                <br /><br />

                <div className="container">

                    <div style={{ position: 'relative', top: '50px' }} className="registrationwaitdiv">
                        <h3 className="text-center"> INFORMATION </h3>


                        <div style={{ height: '400px' }} className="form-group">

                            <h3 style={{ position: 'absolute', top: '150px' }}>Wait for administrator to confirm your deletion.</h3><br />
                            <button style={{ position: 'absolute', top: '300px' }} className="proceedbtn" onClick={this.proceed()}><h3>Proceed to login page.</h3></button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profiledeletionrequestwait;
