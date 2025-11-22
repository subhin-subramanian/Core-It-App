import express, { type RequestHandler } from 'express';
import { addDelAdd, deleteAccount, editProfile, getDelAdd, quoteRequest, signIn, signOut, signUp } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const userRouter = express.Router();

userRouter.post('/sign-up', signUp as RequestHandler);
userRouter.post('/sign-in', signIn as RequestHandler);
userRouter.post('/sign-out', signOut as RequestHandler);
userRouter.put('/edit/:userId', verifyToken as RequestHandler,editProfile as RequestHandler);
userRouter.post('/del-address/add/:userId', addDelAdd as RequestHandler);
userRouter.get('/del-address/get/:userId', verifyToken as RequestHandler,getDelAdd as RequestHandler);
userRouter.post('/quote-rqst', quoteRequest as RequestHandler);
userRouter.delete('/delete/:userId', verifyToken as RequestHandler,deleteAccount as RequestHandler);

export default userRouter;