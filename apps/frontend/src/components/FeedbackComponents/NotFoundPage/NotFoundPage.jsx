import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = ({ isUserNotFoundError = false }) => {
  return (
    <main
      className={`${classes.wrapper} ${
        !isUserNotFoundError ? classes.withBackground : ""
      }`}
    >
      <div className={classes.card}>
        <h1>404</h1>
        <h2>Page not found</h2>

        <p>
          Sorry, the page you are looking for doesn’t exist or was moved.
        </p>

        <Link to="/app">
          <Button>Go back home</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
