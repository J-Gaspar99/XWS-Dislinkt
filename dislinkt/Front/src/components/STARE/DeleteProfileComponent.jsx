import React, { Component } from 'react';
import ProfileDeletionRequestService from '../services/ProfileDeletionRequestService';

class DeleteProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            userType: '',
            reason:'',
            user_email:''
        }

        this.cancelDelition=this.cancelDelition.bind(this)
        this.requestDeletion=this.requestDeletion.bind(this)
        this.changeReqsonHendler=this.changeReqsonHendler.bind(this)
    }
    
    changeReqsonHendler = (event) =>{
        this.setState({reason: event.target.value})
        
    }
    requestDeletion = (e) => {
        e.preventDefault();
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let request = {userId: activeUser.id, reason: this.state.reason, userType:activeUser.type,userEmail:activeUser.email}
        console.log('request => ' + JSON.stringify(request));

        ProfileDeletionRequestService.createProfileDeletionRequest(request,activeUser.type).then(res=>{
            this.props.history.push('/profiledeletionrequestwait')
        });
    }
    cancelDelition(){
        this.props.history.push("/login");
    }
    render() {
        return (
            <div>
                <text style={{ position: 'absolute', fontSize: '45px', top: '100px', left: '42%' }}> Delete Account </text>
                <text style={{position:'absolute',top:'200px', fontSize:'20px'}}>Please tell us why do you want to delete account: </text>
                <textarea onChange={this.changeReqsonHendler} style={{position:'absolute', width:'800px', height:'400px', top:'250px'}}></textarea>

                <div style={{position: 'absolute', top: '400px', left: '850px'}}>
                        <button onClick={this.requestDeletion} style={{width:'150px',height:'60px', position: 'absolute',  left: '200px' ,backgroundColor:'peachpuff'}}>Delete</button>
                        <button onClick={this.cancelDelition} style={{width:'150px',height:'60px', position: 'absolute',  left: '380px'}}  >Cancel</button>
                    </div>
            </div>
        );
    }
}

export default DeleteProfileComponent;
