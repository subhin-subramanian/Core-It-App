import express from 'express';
import { addDelAdd, deleteAccount, editProfile, getDelAdd, quoteRequest, signIn, signOut, signUp } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const userRouter = express.Router();

userRouter.post('/sign-up',signUp);
userRouter.post('/sign-in',signIn);
userRouter.post('/sign-out',signOut);
userRouter.put('/edit/:userId',verifyToken,editProfile);
userRouter.post('/del-address/add/:userId',addDelAdd);
userRouter.get('/del-address/get/:userId',verifyToken,getDelAdd);
userRouter.post('/quote-rqst',quoteRequest);
userRouter.delete('/delete/:userId',verifyToken,deleteAccount);

export default userRouter;