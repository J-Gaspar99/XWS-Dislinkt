import { Route , Switch} from 'react-router-dom';


import AllCompaniesPage from './pages/AllCompanies';
import LogInPage from './pages/LogIn';

import Layout from './components/layout/Layout';
import RegistrationPage from './pages/Registration';
import CompanyRegPage from './pages/CompanyReg';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <LogInPage />
        </Route>
        <Route path='/registration'>
          <RegistrationPage />
        </Route>
        <Route path='/companyregistration'>
          <CompanyRegPage />
        </Route>
        <Route path='/allcompanies'>
          <AllCompaniesPage />
        </Route>
        <Route path='/login'>
          <LogInPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
