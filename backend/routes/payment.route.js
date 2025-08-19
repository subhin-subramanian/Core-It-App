import express from 'express';
import { getKey, processPayment, verification } from '../controllers/payment.controllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/process',processPayment);
paymentRouter.get('/get-key',getKey);
paymentRouter.post('/verification',verification);

export default paymentRouter;