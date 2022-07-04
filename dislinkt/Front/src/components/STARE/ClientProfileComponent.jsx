import React, { Component } from 'react';


class ClientProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: "",
            address: '',
            city: '',
            country: '',
            phoneNumber: '',
            type: '',
            userPoints:'',
            userCategory:''
        }
        this.clientUpdate=this.clientUpdate.bind(this);
        this.deletePforile=this.deletePforile.bind(this);
    }
    componentDidMount() {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let activeUserPoints = JSON.parse(localStorage.getItem('activeUserPoints'))
        
        this.setState({
            id: activeUser.id,
            email: activeUser.email,
            password: activeUser.password,
            firstName: activeUser.firstName,
            lastName: activeUser.lastName,
            dateOfBirth: activeUser.dateOfBirth,
            address: activeUser.address,
            city: activeUser.city,
            country: activeUser.country,
            phoneNumber: activeUser.phoneNumber,
            type: activeUser.type,
            userPoints: activeUserPoints.points,
            userCategory: activeUserPoints.userCategory
        });

    }
   clientUpdate(id){
       this.props.history.push(`/clientupdateprofile/${id}`);
   }
   deletePforile(){
       this.props.history.push("/clientdeleteprofile")
   }
    render() {
        return (
            <div>

            
                <div className='container-xxl' style={{backgroundColor:'lightblue',borderRadius:'4%',border: '3px solid #111111', width:'1200px', height:'650px', position:'absolute',left:'160px'}}>
                <text style={{ position: 'absolute', fontSize:'45px', top: '25px', left: '12%' }}> My profile </text>

                    <div style={{backgroundColor:'lightcyan', border: '3px solid #111111',borderRadius:'30%',position:'absolute',top:'50px',left:'660px', width:'400px', height:'150px'}}>
                        <h4 className='text-center'>Category:</h4>                       
                        <div>
                            <label style={{position:'absolute',top:'50px',left:'20%'}}>My category</label>
                            <label style={{position:'absolute',top:'100px',left:'20%'}}>My points</label>
                        </div>
                        <div>
                            <input readOnly="true" contentEditable="false" style={{position:'absolute',top:'50px',left:'50%'}} value={this.state.userCategory}></input>
                            <input readOnly="true" contentEditable="false" style={{position:'absolute',top:'100px',left:'50%',width:'100px'}} value={this.state.userPoints} ></input>
                        </div>  
                    </div>
                    <div style={{position:'absolute', top:'150px', left:'150px'}} >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC" alt="" width="347" height="270"></img>
                    </div>

                    <div style={{position:'absolute',top:'450px'}}>
                        <div style={{position:'absolute', left:'150px', width:'150px'}}>
                            <label style={{position:'absolute',top:'0px'}}> Email: </label>
                            <label style={{position:'absolute',top:'50px'}}> Password: </label>
                            <label style={{position:'absolute',top:'100px'}}> Phone number: </label>
                        </div>
                        <div style={{position:'absolute', left:'295px'}}>
                            <input style={{position:'absolute',top:'0px'}} readOnly="true" contentEditable="false" value={this.state.email} ></input>
                            <input style={{position:'absolute',top:'50px'}} readOnly="true" contentEditable="false" name="password" value={this.state.password} />
                            <input style={{position:'absolute',top:'100px'}} readOnly="true" contentEditable="false" name="phonenumber" value={this.state.phoneNumber} />
                        </div>
                    </div>

                    <div style={{position:'absolute',top:'216px',left:'700px'}}>
                        <div style={{position:'absolute', width:'150px'}}>
                            <label style={{position:'absolute',top:'0px'}}> First name: </label>
                            <label style={{position:'absolute',top:'50px'}}> Last name: </label>
                            <label style={{position:'absolute',top:'100px'}}> Date of birth: </label>
                            <label style={{position:'absolute',top:'150px'}}> Adress: </label>
                            <label style={{position:'absolute',top:'200px'}}> City: </label>
                            <label style={{position:'absolute',top:'250px'}}> Country: </label>
                           
                        </div>
                        <div style={{position:'absolute', left:'130px'}}>
                            <input style={{position:'absolute',top:'0px'}} readOnly="true" contentEditable="false" name="firstname" value={this.state.firstName} />
                            <input style={{position:'absolute',top:'50px'}} readOnly="true" contentEditable="false" name="lastname" value={this.state.lastName} />
                            <input style={{position:'absolute',top:'100px'}} readOnly="true" contentEditable="false" name="dateofbirth" value={this.state.dateOfBirth} />
                            <input style={{position:'absolute',top:'150px'}} readOnly="true" contentEditable="false" name="adress" value={this.state.address} />
                            <input style={{position:'absolute',top:'200px'}} readOnly="true" contentEditable="false" name="city" value={this.state.city} />
                            <input style={{position:'absolute',top:'250px'}} readOnly="true" contentEditable="false" name="country" value={this.state.country} />
                            
                        </div>
                    </div>
                    <div style={{position:'absolute', top:'540px', left:'700px'}}>
                        <button onClick={()=> this.clientUpdate(this.state.id)} style={{position:'absolute', width:'150px', height:'50px'}} > Update Account </button>      
                        <button onClick={this.deletePforile} style={{position:'absolute', left:'165px' ,width:'150px', height:'50px'}}> Delete Account </button>               
                    </div>
                </div>
             



                



            </div>
        )
    }
}


export default ClientProfileComponent;