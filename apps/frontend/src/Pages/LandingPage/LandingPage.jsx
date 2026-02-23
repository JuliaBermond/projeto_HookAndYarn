import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <motion.main
        className={classes.hero}
        animate={{
          backgroundPosition: ["50% 50%", "60% 40%", "50% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        
        <section className={classes.overlay}>
          <div className={classes.about}>
            <h1>Hook and Yarn</h1>
            <p>Your site for search, post and share your crochet creations! </p>
          </div>
          <nav className={classes.actions}>
            <Link to={"/auth/register"}>
              <Button>Sign Up</Button>
            </Link>
            <Link to={"/auth/login"}>
              <Button>Login</Button>
            </Link>
          </nav>
        </section>
      </motion.main>
    </>
  );
};

export default LandingPage;
