import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // subscriptionId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Subscription',
    //     required:true
    // },
    requests:[{
        _id:false,
        GPU:String, 
        PSU:String, 
        cpu:String, 
        motherboard:String, 
        ram:String, 
        ram_size:String, 
        storage:String, 
        casing:String, 
        cooling:String, 
        software:String, 
        email:String,
    }]  
},{timestamps:true});

const quoteRqsts = mongoose.model('QuoteRqsts',quoteSchema);

export default quoteRqsts;
