import { motion } from "framer-motion";
import { PiYarn } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";

import { useLogOut } from "../../../hooks/useAuth";
import classes from "./MainNavBarLayout.module.css";

const MainNavBarLayout = () => {
  const { mutate } = useLogOut();
  return (
    <>
      <nav className={classes.navBar}>
        <div className={classes.navContainer}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/app" className={classes.logo}>
              <PiYarn className={classes.yarn} />
              <span>Hook And Yarn</span>
              <PiYarn className={classes.yarn} />
            </Link>
          </motion.div>

          <ul className={classes.actionButtons}>
            <li>
              <Link to="/app/posts/create">Share your pattern</Link>
            </li>
            <li>
              <Link to="/app/my-posts">My Patterns</Link>
            </li>
            <li>
              <button onClick={() => mutate()}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <main className={classes.pageContent}>
        <Outlet />
      </main>
    </>
  );
};

export default MainNavBarLayout;
