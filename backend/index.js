import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

const app = express();

dotenv.config();
app.use(express.json());

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

// API endpoints
app.use('/api/user',userRouter);

