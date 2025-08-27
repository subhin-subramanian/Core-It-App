import express from 'express';
import { createSubscription, getKey, processPayment, subVerification, verification } from '../controllers/payment.controllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/process',processPayment);
paymentRouter.get('/get-key',getKey);
paymentRouter.post('/verification',verification);
paymentRouter.post('/subscription/create',createSubscription);
paymentRouter.post('/subscription/verification',subVerification);

export default paymentRouter;