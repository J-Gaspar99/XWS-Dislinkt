import React, { Component } from 'react';

class ChangePasswordComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            password: ''
        }
        
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.change = this.change.bind(this);
        
    }
    change(){
        
        this.props.history.push('/adminprofile');
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }
    render() {
        
        return (
            <div>
                <br/><br/><br/><br/>
                <div className="container">
                    
                    <div className="logindiv">
                        <h3 className="text-center"> CHANGE PASSWORD </h3>
                
                        <form>
                            <div className="form-group">
                                <label> Password: </label>
                                <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                   <br/> 
                                <div className="center"><button className="loginbtn" onClick={this.change}>Change</button></div>
                            </div>
                        </form>
                    </div>    
                            
                </div>
            </div>
        );
    }
}

export default ChangePasswordComponent;