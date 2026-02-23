import { motion } from "framer-motion";
import classes from "./Button.module.css";

const Button = ({ children, isClickable = true, ...props }) => {
  return (
    <motion.button
      className={classes.button}
      whileHover={isClickable ? { scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;


