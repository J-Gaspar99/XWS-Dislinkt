import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div>Agent Aplikacija</div>
      <nav>
        <ul>
          <li>
            <Link to='/allcompanies'>All Companies</Link>
          </li>
          <li>
            <Link to='/companyregistration'>Company Registration</Link>
          </li>
          <li>
            <Link to='/registration'>Registration</Link>
          </li>
          <li>
            <Link to='/login'>LogIn</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;