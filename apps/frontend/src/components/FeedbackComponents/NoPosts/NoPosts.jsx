import classes from "./NoPosts.module.css";

const NoPosts = ({ message }) => {
  let defaultMessage = `No posts yet!`;

  return (
    <div className={classes.container}>
      <div className={classes.messageWrapper}>
        <p className={classes.message}>{message ?? defaultMessage}</p>

        <img
          src="/favicon.png"
          title="handmade icons"
        />
      </div>
    </div>
  );
};

export default NoPosts;
