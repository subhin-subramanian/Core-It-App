import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { quoteRqsts } from '../models/quoteRqst.model.js';
import type { ApiResponse } from '../types/response.js';
import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../types/authenticatedReq.js';

// Function to handle the backend of signing up
export const signUp = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    const {username,email,password}=req.body;
    if(!username || !email || !password || username === '' || password === '' || email === ''){
        res.status(400).json({success:false, message: 'All fields are required'});
    }
    const hashedPasword = bcryptjs.hashSync(password,10);
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(409).json({success: false,message: "User already exists, try with different email"});
    }
    // Creating new user
    const newUser = new User({username,email,password:hashedPasword});
    try {
        await newUser.save();
        res.status(201).json({success:false, message: "New user created"});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to handle the backend of signing in
export const signIn = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    const {username,password} = req.body;
     if(!username || !password || username === '' || password === ''){
        res.status(400).json({success:false, message: 'All fields are required'});
    }
    try {
        const validUser = await User.findOne({username});
        if(!validUser){
            res.status(404).json({success:false, message:'wrong credentials'});
            return;
        }
        const validpassword = bcryptjs.compareSync(password,validUser.password)
        if(!validpassword){
            res.status(404).json({success:false, message:'wrong credentials'});
            return;
        }
        // Token creation
        const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET as string, {expiresIn: "15m"});
        const {password:pass,...rest} = validUser.toObject();
        res.status(200).cookie('access_token',token,{httpOnly:true}).json({success:true, message: "SignIn success", datafromBknd:rest});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to handle signing out from an account
export const signOut = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    try {
        res.clearCookie('access_token').status(200).json({success:true, message:"You're signout"});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to edit the profile details 
export const editProfile = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to edit this profile"});
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10);
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePic:req.body.profilePic
            }
        },{new:true});
        if(!editedUser){
            res.status(400).json({success:false, message:"Couldn't update the user"});
            return;
        }
        const {password,...rest} = editedUser.toObject();
        res.status(200).json({success:true, message:'Profile Updated successfully', datafromBknd:rest});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to add the delivery address of a user
export const addDelAdd = async(req:Request, res:Response<ApiResponse>) : Promise<Response | void> => {
    const {name,email,country,street_address,city,region,post_code,phone} = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
              del_Address:{name,email,country,street_address,city,region,post_code,phone}
            }
        },{new:true});
        if(!user) return res.status(404).json({success:false, message:'user not found'});
        res.status(201).json({success:true, message:'Delivery address added'});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to get the delivery address of a user
export const getDelAdd = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(403).json({success:false, message:"You're not allowed to access this delivery address"});
        return;
    }
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            res.status(404).json({success:false, message:'User not found'});
            return;
        }       
        res.status(200).json({success:true, datafromBknd:user.del_Address});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to save quote request to Database
export const quoteRequest = async(req:Request, res:Response<ApiResponse>) : Promise<void> => {  
    const request = {
        GPU:req.body.GPU || '', 
        PSU:req.body.PSU || '', 
        cpu:req.body.cpu || '', 
        motherboard:req.body.motherboard || '', 
        ram:req.body.ram || '', 
        ram_size:req.body.ram_size || '', 
        storage:req.body.storage || '', 
        casing:req.body.casing || '', 
        cooling:req.body.cooling || '', 
        software:req.body.software || '', 
        email:req.body.email || '',
    }
    try {
        const existingUserId = await quoteRqsts.findOne({userId:req.body.userId});
        if(existingUserId){
            existingUserId.requests.push(request);
            await existingUserId.save();
            res.status(201).json({success:true, message:'Request Submitted'});
        }else{
            const newUserId = new quoteRqsts({userId:req.body.userId,requests:[request]});
            await newUserId.save();
            res.status(201).json({success:true, message:'Request Submitted'});
        }     
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}

// Function to delete an account
export const deleteAccount = async(req:AuthenticatedRequest, res:Response<ApiResponse>) : Promise<void> => {
    if(!req.user || req.user.id !== req.params.userId){
        res.status(401).json({success:false, message:"You're not allowed to edit this profile"});
        return;
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(204).json({success:false, message:"Account deleted successfully"});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
}


