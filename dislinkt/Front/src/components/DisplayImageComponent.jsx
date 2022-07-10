import React, { useState } from "react";
import axios from 'axios';

export default function DsiplayImage() {
  const [baseImage1, setBaseImage1] = useState("");
  

 function img1(){
  let activePost =  JSON.parse(localStorage.getItem('activePost'));
  axios.get("http://localhost:8087/image/postid/"+activePost.id).then(response =>{setBaseImage1(response.data.image1)}); 
  return baseImage1;
 }

 

  return (
    <div className="App">
      
      
      <br></br>
      <img src={img1()} height="200px" />
      
      
    </div>
  );
}