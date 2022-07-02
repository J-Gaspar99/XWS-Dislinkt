import React, { Component } from 'react'

class ShipProfileComponent extends Component {
    render() {
        return (
            <div>
                <div>
                    <input readOnly="true" value="KLARIJA" contentEditable="false" style={{ width: "350px", outline: "none", textAlign: "center", fontSize: "50px", position: "relative", left: "480px", backgroundColor: "transparent", borderColor: 'transparent' }}></input>
                    <text style={{ fontSize: "30px", position: "relative", left: "-350px" }}> Rating: </text>
                    <input readOnly="true" value="4.2" contentEditable="false" style={{ boxShadow: "none", outline: "none", width: "70px", contentEditable: "false", backgroundColor: "transparent", top: "2px", borderColor: "transparent", fontSize: "30px", position: "relative", left: "-350px" }}></input>
                </div>
                <div style={{ position: "relative", top: "-50px", left: "950px", width: "100px" }}>
                    <text style={{ fontSize: "30px" }}> Owner: </text>
                </div>
                <div style={{ position: "relative", top: "-98px", left: "1150px", width: "150px" }}>
                    <input readOnly="true" value="Aca Faca" contentEditable="false" style={{ boxShadow: "none", outline: "none", backgroundColor: "transparent", borderColor: "transparent", fontSize: "30px" }} ></input>
                </div>

                <div style={{ backgroundColor: "lightblue", borderRadius:'5%' , textAlign: "center", borderStyle: "solid", position: "relative", left: "450px", top: "-100px", height: "550px", width: "400px" }}>
                    
                    <text style={{ fontSize: "27px" }}> Description </text>
                    <br></br>
                    
                    <br></br>
                        
                    <textarea readOnly="true" style={{outline: "none", width: "360px", height: "150px" }}> This is the best ship in the whole world. He is named in honor of small village near Srpska Crnja. Today, this village is called Radojevo, but it is stupid name for a ship.</textarea>
                    <br></br>
                    <div style={{  textAlign: "left", height: "300px" }}>
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "20px" }}>Type:</text>
                        <input readOnly="true" value="Yacht" style={{outline: "none", position: "relative", top: "20px", left: "193px", width: "150px" }}></input>
                        <br></br>
       
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "30px" }}>Capacity:</text>
                        <input readOnly="true" value="15 People" style={{outline: "none", position: "relative", top: "25px", left: "159px", width: "150px" }}></input>
                        <br></br>
          
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "40px" }}>Lenght:</text>
                        <input readOnly="true" value="10 metar" style={{outline: "none", position: "relative", top: "35px", left: "173px", width: "150px" }}></input>
                        <br></br>
           
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "50px" }}>Maximal speed:</text>
                        <input readOnly="true" value="100 km/h" style={{ outline: "none",position: "relative", top: "45px", left: "102px", width: "150px" }}></input>
                        <br></br>
           
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "60px" }}>Number of engines:</text>
                        <input readOnly="true" value="3" style={{outline: "none", position: "relative", top: "60px", left: "64px", width: "150px" }}></input>
                        <br></br>
             
                        <text style={{ fontSize: "20px", position: "relative", left: "10px", top: "70px" }}>Engines power:</text>
                        <input readOnly="true" value="70 hp" style={{outline: "none", position: "relative", top: "70px", left: "105px", width: "150px" }}></input>

                    </div>
                </div>

                <div>

                </div>

            </div>


        )
    }
};


export default ShipProfileComponent;