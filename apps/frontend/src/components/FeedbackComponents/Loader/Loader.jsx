import { ClipLoader } from "react-spinners";
import classes from './Loader.module.css'

const Loader = ({...props}) => {
  return (
    <div className={classes.container}>
      <ClipLoader {...props} />
    </div>
  );
};

export default Loader;
