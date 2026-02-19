import { Router } from "express";
import { getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:username", getUser);


export default userRouter;
