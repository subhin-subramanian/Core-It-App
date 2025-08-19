import { instance } from '../index.js'
import crypto from 'crypto';

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

