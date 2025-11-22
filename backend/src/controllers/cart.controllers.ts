import type { Response } from "express";
import { User } from "../models/user.model.js";
import type { AuthenticatedRequest } from "../types/authenticatedReq.js";
import type { ApiResponse } from "../types/response.js";

// Function to add items to the cart
export const add = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to access this cart"});
        return;
    }
    try {
        const user = await User.findById(req.params.userId); 
        if(!user){
            res.status(404).json({success:false, message:"User not found"});
            return;
        }
        const itemIndex = user.cart.findIndex(item=>item.id == req.body.cardId);
        if(itemIndex > -1){
            user.cart[itemIndex].quantity += 1;
        }else{
            user.cart.push({id:req.body.cardId,quantity:1});
        }
        await user.save();
        res.status(201).json({success:true, message:'cart updated'});  
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to get a cart for rendering
export const getCart = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to access this cart"});
        return;
    }
    try{
         const user = await User.findById(req.params.userId);
         if(!user){
            res.status(404).json({success:false, message:"Cart not found"});
            return;
        }
         res.status(200).json({success:true, datafromBknd:user.cart});
    }catch (error:any){
         res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to update quantity of items in the cart
export const update = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to access this cart"});
        return;
    }
    try {
        const user = await User.findById(req.params.userId);  
        if(!user){
            res.status(404).json({success:false, message:"User not found"});
            return;
        }  
        const itemIndex = user.cart.findIndex(item=>item.id == req.body.id);
        user.cart[itemIndex].quantity = req.body.qty;
        await user.save();
        res.status(201).json({success:true, datafromBknd:user.cart});
    }catch (error:any){
         res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to delete items in the cart
export const remove = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to delete items in this cart"});
        return;
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $pull:{cart:{id:req.body.id}}
        },{new:true});
        res.status(201).json({success:true, datafromBknd:updatedUser?.cart});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}    