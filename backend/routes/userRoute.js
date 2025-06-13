import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from '../controllers/userController.js';

const userRouter = express.Router();

//PUBLIC LINKS
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//PRIVATE LINKS protect using auth middles ware
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile',authMiddleware, updateProfile);
userRouter.put('/password',authMiddleware, updatePassword);


export default userRouter;