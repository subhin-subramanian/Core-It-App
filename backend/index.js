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

const app = express();

// For image uploading
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
app.use(express.json());
app.use(cookieParser());

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

