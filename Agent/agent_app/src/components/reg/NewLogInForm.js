import Card from '../ui/Card';
import classes from './NewRegForm.module.css';

function NewLogInForm() {
  function submitHandler(event) {
    event.preventDefault();

    
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='text' required id='username' />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='text' required id='password' />
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewLogInForm;