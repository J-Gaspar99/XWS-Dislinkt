import React, { useState } from "react";
import axios from 'axios';

export default function UploadImage() {
  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");
  const [baseImage4, setBaseImage4] = useState("");
  const [baseImage5, setBaseImage5] = useState("");

 function img1(){
  let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
  axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{setBaseImage1(response.data.image1)}); 
  return baseImage1;
 }

 function img2(){
  let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
  axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{setBaseImage2(response.data.image2)});
  return baseImage2;
 }

 function img3(){
  let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
  axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{setBaseImage3(response.data.image3)});
  return baseImage3;
 }

 function img4(){
  let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
  axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{setBaseImage4(response.data.image4)});
  return baseImage4;
 }

 function img5(){
  let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
  axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{setBaseImage5(response.data.image5)})
  return baseImage5;
 }

  return (
    <div className="App">
      
      
      <br></br>
      <img src={img1()} height="200px" />
      <br></br>
      <img src={img2()} height="200px" />
      <br></br>
      <img src={img3()} height="200px" />
      <br></br>
      <img src={img4()} height="200px" />
      <br></br>
      <img src={img5()} height="200px" />
      
    </div>
  );
}