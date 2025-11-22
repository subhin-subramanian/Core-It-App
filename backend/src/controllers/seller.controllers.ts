import type { Request, Response } from "express";
import { sellerRqst } from "../models/seller.model.js"
import type { ApiResponse } from "../types/response.js";

export const sellerRequest = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    const sellerDetails ={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        userId:req.body.userId || '',
        address:req.body.address,
        banking_details:{
        Bank_Name:req.body.Bank_Name || '',
        Bank_branch:req.body.Bank_branch || '',
        Bank_accnt_no:req.body.Bank_accnt_no || '',
        Bank_code:req.body.Bank_code || ''
        },
        pdt_details:req.body.pdt_details
    }
    const newSeller = new sellerRqst(sellerDetails);
    try {
        await newSeller.save();
        res.status(201).json({success:true, message:'New seller request added'});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});      
    }
}
