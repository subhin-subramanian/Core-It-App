import express from 'express';
import { addDelAdd, editProfile, getDelAdd, signIn, signOut, signUp } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const userRouter = express.Router();

userRouter.post('/sign-up',signUp);
userRouter.post('/sign-in',signIn);
userRouter.post('/sign-out',signOut);
userRouter.put('/edit/:userId',verifyToken,editProfile);
userRouter.post('/del-address/add/:userId',addDelAdd);
userRouter.get('/del-address/get/:userId',verifyToken,getDelAdd);

export default userRouter;