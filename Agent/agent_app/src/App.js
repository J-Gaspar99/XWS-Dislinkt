import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import background from './images/back.jpg';

import RegistratedHeaderComponent from './components/RegistratedHeaderComponent';

import RegistrationComponent from './components/RegistrationComponent';

import UnautentifiedUserHeader from './components/UnautentifiedUserHeader';

import LoginComponent from './components/LogInComponent';
import UserProfileComponent from './components/UserProfileComponent';
import CreateCompanyComponent from './components/CreateCompanyComponent';
import AdminHeaderComponent from './components/AdminHeaderComponent';
import OwnerHeaderComponent from './components/OwnerHeaderComponent';
import CompanyProfileComponent from './components/CompanyProfileComponent';
import CompaniesComponent from './components/CompaniesComponent';
import JobOffersComponent from './components/JobOffersComponent';



const backStyle = {
  width: '100%',
  height: '938px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover' 
};


function headerDefinition(){

  if(localStorage.getItem('activeUser')==null){
    return(<UnautentifiedUserHeader/>)
  }
else{
  let activeUser = JSON.parse(localStorage.getItem('activeUser'))

  switch (activeUser.uloga) {
    case 1: return( <AdminHeaderComponent/>)
      break;
    case 2: return(<RegistratedHeaderComponent/>)
      break;
    case 3:  return(<OwnerHeaderComponent/>)
      break;
      case '' :    return(<h1>WRONG</h1>)
      break;
    default: 
      break;

  }
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
              <Route path = "/companyprofile"  component={CompanyProfileComponent}></Route>
              <Route path = "/companies"  component={CompaniesComponent}></Route>
              <Route path = "/joboffers"  component={JobOffersComponent}></Route>


              </Switch>
          </div>
                                
        </Router>
     
     
    </div>
    
  );
}

export default App;
