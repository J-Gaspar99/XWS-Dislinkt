import React, { Component } from 'react';



class HomePageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.register=this.register.bind(this);
        this.login=this.login.bind(this);
        this.pprofile=this.profiles.bind(this);
    }
    register(){
        this.props.history.push('/register');
    }
    login(){
        this.props.history.push('/login');
    }
    profiles(){
        this.props.history.push('/profiles');
    }
    render() {
        return (
            <div>


                <div style={{  display:'flex', height:'18rem', flexDirection: "row", gap:"40px", alignItems:'baseline',justifyContent:'space-evenly', position:'relative', top:'200px' }}>
                   

                    <div class="card text-center" style={{ width: "18rem", height: "18rem", backgroundColor: 'transparent', border: '3px solid #111111',borderRadius:'5%' }}>
                     <br/><br/>
                     <h1 align="center"> WELCOME </h1>   
                     <h1 align="center"> TO </h1>  
                     <h1 align="center"> DISLINKT </h1>  
                       
                    </div>

                    

                </div>



            </div>
        );
    }
}

export default HomePageComponent