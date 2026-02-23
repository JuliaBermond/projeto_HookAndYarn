import classes from './ErrorMessage.module.css'

const ErrorMessage = () => {
  return (
    <div className={classes.container}>
      <img src='./tangled_yarn.png'/>
      <p>Oops! Something went wrong. Please refresh the page or try again later.</p>
    </div>
  );
}

export default ErrorMessage;