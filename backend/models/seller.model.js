import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    userId:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    banking_details:{
        Bank_Name:String,
        Bank_branch:String,
        Bank_accnt_no:String,
        Bank_code:String,
    },
    pdt_details:{
        type:String,
        required:true
    }
},{timestamps:true});

const sellerRqst = mongoose.model('SellerRqsts',sellerSchema);
export default sellerRqst;

