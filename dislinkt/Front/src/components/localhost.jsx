import React, { Component } from 'react';


class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state={
           email: '',
           password: ''
            
        }
        
        
    }
    log(){
        
           
            this.props.history.push('/login');
       
        
    }
       
        
    
componentDidMount(){
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeCottage');
    localStorage.removeItem('activeRoom');

}

  
    render() {
        return (
            <div><br/><br/><br/><br/>
                <div className="container">
                    
                    <div className="logindiv">
                        <h3 className="text-center"> WELCOME </h3>
                
                        <form id="myForm">
                            <div className="form-group">
                                
                                <br/>
                                <div className="center"><button className="loginbtn" onClick={()=>this.log()}> TO LOGIN</button></div>
                            </div>
                        </form>
                            
                    </div>
                   
                    
                    
                
                </div> 
                
                
            </div>
        );
    }
}

export default LoginComponent;