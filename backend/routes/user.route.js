import express from 'express';
import { editProfile, signIn, signOut, signUp } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const userRouter = express.Router();

userRouter.post('/sign-up',signUp);
userRouter.post('/sign-in',signIn);
userRouter.post('/sign-out',signOut);
userRouter.put('/edit/:userId',verifyToken,editProfile);

export default userRouter;