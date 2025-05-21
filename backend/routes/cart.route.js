import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { add } from '../controllers/cart.controllers.js';

const cartRouter = express.Router();

cartRouter.post('/add/:userId',verifyToken,add);

export default cartRouter;
