import express from 'express';
import { sellerRequest } from '../controllers/seller.controllers.js';

const sellerRouter = express.Router();

sellerRouter.post('/add-request',sellerRequest);

export default sellerRouter;