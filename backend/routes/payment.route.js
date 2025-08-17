import express from 'express';
import { getKey, processPayment } from '../controllers/payment.controllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/process',processPayment);
paymentRouter.get('/get-key',getKey);

export default paymentRouter;