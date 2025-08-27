import { instance } from '../index.js';
import crypto from 'crypto';
import User from '../models/user.model.js';

// Function to process payments
export const processPayment = async (req,res) => {

    const options = {
        amount : Number(req.body.amount*100),
        currency:"INR"
    }

    const order = await instance.orders.create(options);

    res.status(200).json({success:true,order})
}

// Function to get the Razorpay key
export const getKey = async(req,res) => {
    res.status(200).json({key:process.env.RAZOR_PAY_KEY})
}

// Function to verify payment
export const verification = async(req,res) => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET).update(body.toString()).digest('hex');

    if(expectedSignature === razorpay_signature){
        return res.redirect(`http://localhost:5173/payment_success?reference=${razorpay_payment_id}`)
    }else{
        res.status(400).json({success:false});
    }
}

// Functions for subscription payment

// Function for creating a new subscription
export const createSubscription = async (req,res)=>{
    const {planType} = req.body;  
    let plan_id,plan_cycle;
    if (planType === 'basic'){
        plan_id = process.env.PLAN_ID_MONTHLY;
        plan_cycle = 1;
    }else if (planType === 'standard'){
        plan_id = process.env.PLAN_ID_HALFYEARLY;
        plan_cycle = 6;
    }else if (planType === 'premium'){
        plan_id = process.env.PLAN_ID_YEARLY;
        plan_cycle = 12;
    }else{
        return res.status(400).json({message:'No plan selected'})
    }

    try {
        const subscription = await instance.subscriptions.create({
            plan_id,
            customer_notify:1,
            total_count:plan_cycle,
        });
        res.status(201).json(subscription);       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Subscription creation failed'})
    }
}

// Function for subscription payment verification
export const subVerification = async(req,res) => {
    console.log(req.body);
    
    const {razorpay_payment_id,razorpay_subscription_id,razorpay_signature} = req.body;

    const body = razorpay_payment_id + "|" +  razorpay_subscription_id ;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET).update(body.toString()).digest('hex');
    console.log(expectedSignature);

    if(expectedSignature === razorpay_signature){
        await User.findByIdAndUpdate(req.body.userId,{subscription:true});
        return res.status(201).json({success:true,reference:razorpay_payment_id});
    }else{
        res.status(400).json({success:false});
    }
}


