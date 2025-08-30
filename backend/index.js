import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import uploadRouter from './routes/upload.route.js';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cart.route.js';
import sellerRouter from './routes/seller.route.js';
import Razorpay from 'razorpay';
import paymentRouter from './routes/payment.route.js';
import cors from 'cors';

const app = express();

dotenv.config(); // Loading environment variables

//setup for __dirname and __filename
// This is necessary because __dirname and __filename are not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json({limit:"10mb"}));

app.use(cors());  // Required after deployment

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

// Port settings
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});

// DataBase Connection
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Database connected');
}).catch((error)=>{
    console.log('Database error: '+error);
})

// Serving uploaded images statically
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// API endpoints
app.use('/api/user',userRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/cart',cartRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/payment',paymentRouter);

export const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET
});
