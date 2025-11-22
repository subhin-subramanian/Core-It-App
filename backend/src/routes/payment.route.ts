import express, { type RequestHandler } from 'express';
import { createSubscription, getKey, processPayment, subVerification, verification } from '../controllers/payment.controllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/process', processPayment as RequestHandler);
paymentRouter.get('/get-key', getKey as RequestHandler);
paymentRouter.post('/verification', verification as RequestHandler);
paymentRouter.post('/subscription/create', createSubscription as RequestHandler);
paymentRouter.post('/subscription/verification', subVerification as RequestHandler);

export default paymentRouter;