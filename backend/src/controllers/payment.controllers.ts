import { instance } from '../utils/razorpay.js'
import crypto from 'crypto';
import { User } from '../models/user.model.js';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/response.js';

// Function to process payments
export const processPayment = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {

    const options = {
        amount : Number(req.body.amount*100),
        currency:"INR"
    }

    const order = await instance.orders.create(options);

    res.status(200).json({success:true,datafromBknd:order})
}

// Function to get the Razorpay key
export const getKey = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    res.status(200).json({success:true, datafromBknd:process.env.RAZOR_PAY_KEY})
}

// Function to verify payment
export const verification = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET as string).update(body.toString()).digest('hex');

    if(expectedSignature === razorpay_signature){
        return res.redirect(`http://localhost:5173/payment_success?reference=${razorpay_payment_id}`)
    }else{
        res.status(400).json({success:false, message:"Razorpay signature error"});
    }
}

// Functions for subscription payment

// Function for creating a new subscription
export const createSubscription = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    const {planType} = req.body;  
    let plan_id:string, plan_cycle:number;
    if (planType === 'basic'){
        plan_id = process.env.PLAN_ID_MONTHLY as string;
        plan_cycle = 1;
    }else if (planType === 'standard'){
        plan_id = process.env.PLAN_ID_HALFYEARLY as string;
        plan_cycle = 6;
    }else if (planType === 'premium'){
        plan_id = process.env.PLAN_ID_YEARLY as string;
        plan_cycle = 12;
    }else{
        res.status(400).json({success:false,message:'No plan selected'});
        return;
    }

    try {
        const subscription = await instance.subscriptions.create({
            plan_id,
            customer_notify:1,
            total_count:plan_cycle,
        });
        res.status(201).json({success:true, datafromBknd:subscription});       
    } catch (error:any) {
        console.log(error.message);
        res.status(500).json({success:false,message:'Subscription creation failed',datafromBknd:error.message})
    }
}

// Function for subscription payment verification
export const subVerification = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    console.log(req.body);
    
    const {razorpay_payment_id,razorpay_subscription_id,razorpay_signature} = req.body;

    const body = razorpay_payment_id + "|" +  razorpay_subscription_id ;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET as string).update(body.toString()).digest('hex');
    console.log(expectedSignature);

    if(expectedSignature === razorpay_signature){
        await User.findByIdAndUpdate(req.body.userId,{subscription:true});
        res.status(201).json({success:true,reference:razorpay_payment_id});
        return;
    }else{
        res.status(404).json({success:false,message:"User not found"});
    }
}


