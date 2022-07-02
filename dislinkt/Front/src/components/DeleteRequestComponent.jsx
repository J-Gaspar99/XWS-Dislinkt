import React, { Component } from 'react';


class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state={
           email: '',
           password: ''
            
        }
        
        
    }
    send(){
        
        localStorage.removeItem('activeUser')
        this.props.history.push(`/login`);
  
    }
    changeRequestHandler = (event) => {
        this.setState({request: event.target.value});
    }
    
    render() {
        return (
            <div><br/><br/><br/><br/>
                <div className="container">
                    
                    <div className="logindiv">
                        <h3 className="text-center"> WRITE A REQUEST </h3>
                
                        <form id="myForm">
                            <div className="form-group">
                            <input name="request" type="text" value={this.state.request} onChange={this.changeRequestHandler}/>
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.send()}> Send</button></div>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
                
                
            </div>
        );
    }
}

export default LoginComponent;