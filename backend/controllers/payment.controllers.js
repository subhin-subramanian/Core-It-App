import { instance } from '../index.js'

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

