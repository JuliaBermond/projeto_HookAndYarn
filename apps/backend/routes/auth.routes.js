import { Router } from 'express'
import { createUser, login, logout, getMe } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth/auth.js';

const authRouter = Router();

authRouter.post("/register", createUser);
authRouter.post('/login', login); 
authRouter.post('/logout', logout);
authRouter.get('/me', authMiddleware, getMe);


export default authRouter;