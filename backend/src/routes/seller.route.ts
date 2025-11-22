import express, { type RequestHandler } from 'express';
import { sellerRequest } from '../controllers/seller.controllers.js';

const sellerRouter = express.Router();

sellerRouter.post('/add-request', sellerRequest as RequestHandler);

export default sellerRouter;