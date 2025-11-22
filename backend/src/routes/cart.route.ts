import express, { type RequestHandler } from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { add, getCart, remove, update } from '../controllers/cart.controllers.js';

const cartRouter = express.Router();

cartRouter.post('/add/:userId', verifyToken as RequestHandler ,add as RequestHandler );
cartRouter.get('/get-cart/:userId', verifyToken as RequestHandler ,getCart as RequestHandler );
cartRouter.put('/update/:userId', verifyToken as RequestHandler ,update as RequestHandler );
cartRouter.delete('/remove/:userId', verifyToken as RequestHandler ,remove as RequestHandler );

export default cartRouter;
