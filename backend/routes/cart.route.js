import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { add, getCart, remove, update } from '../controllers/cart.controllers.js';

const cartRouter = express.Router();

cartRouter.post('/add/:userId',verifyToken,add);
cartRouter.get('/get-cart/:userId',verifyToken,getCart);
cartRouter.put('/update/:userId',verifyToken,update);
cartRouter.delete('/remove/:userId',verifyToken,remove);

export default cartRouter;
