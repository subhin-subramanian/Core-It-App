import { model, Schema, type Document, type Types } from "mongoose";

// Defining typescript interfaces
export interface IQuoteRequest {
    GPU?: string; 
    PSU?: string; 
    cpu?: string; 
    motherboard?: string; 
    ram?: string; 
    ram_size?: string; 
    storage?: string; 
    casing?: string; 
    cooling?: string; 
    software?: string; 
    email?: string;
}

export interface IQuote extends Document {
    userId: Types.ObjectId;
    requests: IQuoteRequest[];
}

const quoteSchema = new Schema<IQuote>({
    userId:{
        type:Schema.Types.ObjectId,
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

export const quoteRqsts = model<IQuote>('QuoteRqsts',quoteSchema);

