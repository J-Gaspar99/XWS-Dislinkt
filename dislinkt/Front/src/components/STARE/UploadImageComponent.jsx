import React, { useState } from "react";
import axios from 'axios';

export default function UploadImage() {
    const [baseImage1, setBaseImage1] = useState("");
    const [baseImage2, setBaseImage2] = useState("");
    const [baseImage3, setBaseImage3] = useState("");
    const [baseImage4, setBaseImage4] = useState("");
    const [baseImage5, setBaseImage5] = useState("");

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage1(base64);
  };

  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage2(base64);
  };

  const uploadImage3 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage3(base64);
  };

  const uploadImage4 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage4(base64);
  };

  const uploadImage5 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage5(base64);
  };


  function Add(){
    let activeCottage =  JSON.parse(localStorage.getItem('activeCottage'));
    axios.get("http://localhost:8080/api/v1/images/type/cottage_owner/cottage/"+activeCottage.id).then(response =>{let imageId =response.data.id

    
      let images={
          id:imageId,
          type:"cottage",
          idOfType:activeCottage.id,
          image1:baseImage1,
          image2:baseImage2,
          image3:baseImage3,
          image4:baseImage4,
          image5:baseImage5,
      }
    axios.put("http://localhost:8080/api/v1/images/cottage_owner/"+imageId,images);
    window.alert("Suecessfull upload")
  })
  }


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="App">
      <input type="file"onChange={(e) => {uploadImage1(e);}}/>
      <br/>
      <div className="center"><button className="loginbtn" onClick={()=>Add()}>Add</button></div>
      <br></br>
      <img src={baseImage1} height="200px" />

      <input type="file"onChange={(e) => {uploadImage2(e);}}/>
      <br/>
      
      <br></br>
      <img src={baseImage2} height="200px" />

      <input type="file"onChange={(e) => {uploadImage3(e);}}/>
      <br/>
      
      <br></br>
      <img src={baseImage3} height="200px" />

      <input type="file"onChange={(e) => {uploadImage4(e);}}/>
      <br/>
      
      <br></br>
      <img src={baseImage4} height="200px" />

      <input type="file"onChange={(e) => {uploadImage5(e);}}/>
      <br/>
     
      <br></br>
      <img src={baseImage5} height="200px" />
      
    </div>
  );
}