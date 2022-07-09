import Card from '../ui/Card';
import classes from './NewRegForm.module.css';

import { useRef } from 'react';

function NewCompanyRegForm(props) {
  const titleInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const pibInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPib = pibInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      email: enteredEmail,
      address: enteredAddress,
      pib: enteredPib,
      description: enteredDescription,
    };

    props.onAddCompany(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Company Name</label>
          <input type='text' required id='title' />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Company Email</label>
          <input type='text' required id='email' />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Company Address </label>
          <input type='text' required id='address' />
        </div>
        <div className={classes.control}>
          <label htmlFor='pib'>PIB</label>
          <input type='text' required id='pib' />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Company Description</label>
          <textarea id='description' required rows='5'></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Company</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCompanyRegForm;