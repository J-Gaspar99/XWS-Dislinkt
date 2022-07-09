import React, { useState } from "react";
import axios from 'axios';

export default function UploadImage() {
    const [baseImage1, setBaseImage1] = useState("");
    

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage1(base64);
  };

  
  


  function Add(){

    //TODO
    let activePost =  JSON.parse(localStorage.getItem('activePost'));
    axios.get("http://localhost:8087/image/postid/"+activePost.id).then(response =>{let imageId =response.data.id

    
      let images={
          id:imageId,         
          postId:activePost.id,
          image1:baseImage1,
          
      }
    axios.put("http://localhost:8087/image/"+imageId,images);
    window.alert("Suecessfull upload")
  });
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

    </div>
  );
}