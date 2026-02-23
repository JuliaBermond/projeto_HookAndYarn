import { Link } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./Tag.module.css";

const Tag = ({
  name,
  isClickable = false,
  excludeButton = false,
  ...props
}) => {
  if (!isClickable || excludeButton) {
    return <span className={classes.tag}>{name}</span>;
  }

  return (
    <Link to={`/app/posts/tags/${name.toLowerCase()}`}>
      <Button className={classes.tag} {...props}>
        {name}
      </Button>
    </Link>
  );
};

export default Tag;