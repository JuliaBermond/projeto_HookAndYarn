import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import loginPage from "/loginPage.webp";
import registerPage from "/registerPage.jpg";

import classes from "./AuthLayout.module.css";

const AuthLayout = () => {
  const location = useLocation();

  let imageSideBackground = location.pathname.includes("/login")
    ? loginPage
    : registerPage;

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.imageSide}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageSideBackground})`,
        }}
      />

      <div className={classes.formSide}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthLayout;
