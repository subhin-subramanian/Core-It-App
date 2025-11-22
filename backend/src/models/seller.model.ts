import { model, Schema, type Document } from "mongoose";

//Defining typescript interfaces
export interface BankingDetails {
    Bank_Name: string,
    Bank_branch: string,
    Bank_accnt_no: string,
    Bank_code: string,  
}

export interface ISeller extends Document {
    name: string;
    email: string;
    phone: string;
    userId: string;
    address: string;
    banking_details: BankingDetails;
    pdt_details: string;
}

// Defining the mongoose schemas
const bankingDetailsSchema = new Schema<BankingDetails>({
    Bank_Name: { type: String, required: true },
    Bank_branch: { type: String, required: true },
    Bank_accnt_no: { type: String, required: true },
    Bank_code: { type: String, required: true },
}, { _id: false });

const sellerSchema = new Schema<ISeller>({
    name: { type:String, required:true},
    email: { type:String, required:true},
    phone: { type:String, required:true},
    userId: { type:String},
    address: { type:String, required:true},
    banking_details: bankingDetailsSchema,
    pdt_details: { type:String, required:true},
},{timestamps:true});

export const sellerRqst = model<ISeller>('SellerRqsts',sellerSchema);

