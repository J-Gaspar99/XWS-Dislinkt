import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import background from './images/back.jpg';

import HeaderComponent from './components/HeaderComponent';
import HomePageCommponent from './components/HomePageCommponent';
import RegistrationComponent from './components/RegistrationComponent';
import LoginComponent from './components/LoginComponent';
import ProfilesComponent from './components/ProfilesComponent';
import ViewProfileComponent from './components/ViewProfileComponent';
import ViewPostsComponent from './components/ViewPostsComponent';
import UserProfileComponent from './components/UserProfileComponent';
import UserPostsComponent from './components/UserPostsComponent';
import CreatePostComponent from './components/CreatePostComponent';



import Unautentifieduserheader from './components/UnautentifiedUserHeader';
import LoggedProfileComponent from './components/LoggedProfileComponent';

const backStyle = {
  width: '100%',
  height: '938px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover' 
};


function headerDefinition(){

  if(localStorage.getItem('activeUser')==null){
    return(<Unautentifieduserheader/>)
  }
else{
  return( <HeaderComponent/>)
}

  
}


function App() {
  
  return (

    <div style={backStyle}> 
      
        <Router>
          
         {headerDefinition() } 
          <div className="container">
            <Switch> 
        
            <Route path = "/" exact component={HomePageCommponent}></Route>
              <Route path = "/login" exact component={LoginComponent}></Route>
              <Route path = "/register" component={RegistrationComponent}></Route>
      
              <Route path = "/login" component={LoginComponent}></Route>
              <Route path = "/homepage" component={HomePageCommponent} ></Route>
              <Route path = "/profiles" component={ProfilesComponent} ></Route>
              <Route path = "/viewprofile" component={ViewProfileComponent} ></Route>
              <Route path = "/viewposts" component={ViewPostsComponent} ></Route>
              <Route path = "/userprofile" component={UserProfileComponent} ></Route>
              <Route path = "/userposts" component={UserPostsComponent} ></Route>
              <Route path = "/loggedprofile" component={LoggedProfileComponent} ></Route>
              



              </Switch>
          </div>
                                
        </Router>
     
     
    </div>
    
  );
}

export default App;
