import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import path from 'path';
import uploadRouter from './routes/upload.route.js';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cart.route.js';
import sellerRouter from './routes/seller.route.js';
import paymentRouter from './routes/payment.route.js';
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Loading environment variables
dotenv.config({path: path.join(__dirname, '.env')});

// Middlewares
app.use(express.json({limit:"10mb"}));
app.use(cors());  // Required after deployment
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// API endpoints
app.use('/api/user',userRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/cart',cartRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/payment',paymentRouter);



// Frontend static rendering 
app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('/*name', (req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'));
});

// DataBase Connection
if (!process.env.MONGO) {
    throw new Error("MONGO_URL is missing in .env");
}else{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log('Database connected');
    }).catch((error)=>{
        console.log('Database error: '+error);
    })
};

// Port settings
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});
