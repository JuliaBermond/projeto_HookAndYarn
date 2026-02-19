import { Router } from "express";

import { authMiddleware } from "../middlewares/auth/auth.js";
import authRouter from "./auth.routes.js";
import postRouter from "./post.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", authMiddleware,  postRouter);
// router.use("/posts", postRouter);



export default router;
