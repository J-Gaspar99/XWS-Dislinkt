import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import background from './images/back.jpg';

import RegistratedHeaderComponent from './components/RegistratedHeaderComponent';

import RegistrationComponent from './components/RegistrationComponent';

import Unautentifieduserheader from './components/UnautentifiedUserHeader';

import LoginComponent from './components/LoginComponent';
import UserProfileComponent from './components/UserProfileComponent';
import CreateCompanyComponent from './components/CreateCompanyComponent';



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
  return( <RegistratedHeaderComponent/>)
}

  
}


function App() {
  
  return (

    <div style={backStyle}> 
      
        <Router>
          
         {headerDefinition() } 
          <div className="container">
            <Switch> 
        
            <Route path = "/" exact component={LoginComponent}></Route>
              
              <Route path = "/register" component={RegistrationComponent}></Route>
              <Route path = "/login"  component={LoginComponent}></Route>
              <Route path = "/userprofile"  component={UserProfileComponent}></Route>
              <Route path = "/createcompany"  component={CreateCompanyComponent}></Route>

              </Switch>
          </div>
                                
        </Router>
     
     
    </div>
    
  );
}

export default App;
