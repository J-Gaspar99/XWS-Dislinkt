import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import background from './images/back.jpg';

import HeaderComponent from './components/HeaderComponent';

import RegistrationComponent from './components/RegistrationComponent';

import Unautentifieduserheader from './components/UnautentifiedUserHeader';

import LoginComponent from './components/LogInCOmponent';



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
        
            <Route path = "/" exact component={LoginComponent}></Route>
              
              <Route path = "/register" component={RegistrationComponent}></Route>
      
              

              </Switch>
          </div>
                                
        </Router>
     
     
    </div>
    
  );
}

export default App;
