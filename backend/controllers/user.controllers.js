import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import quoteRqsts from '../models/quoteRqst.model.js';

// Function to handle the backend of signing up
export const signUp = async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username === '' || password === '' || email === ''){
        return res.status(400).json('All fields are required');
    }
    const hashedPasword = bcryptjs.hashSync(password,10);
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(401).json('User already exists, try with different email')
    }
    // Creating new user
    const newUser = new User({username,email,password:hashedPasword});
    try {
        await newUser.save();
        res.status(200).json("New user created");
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}

// Function to handle the backend of signing in
export const signIn = async(req,res)=>{
    const {username,password} = req.body;
     if(!username || !password || username === '' || password === ''){
        return res.status(400).json('All fields are required');
    }
    try {
        const validUser = await User.findOne({username});
        if(!validUser){
            return res.status(402).json('wrong credentials');
        }
        const validpassword = bcryptjs.compareSync(password,validUser.password)
        if(!validpassword){
            return res.status(402).json('wrong credentials');
        }
        // Token creation
        const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json({rest});
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}

// Function to handle signing out from an account
export const signOut = async(req,res)=>{
    try {
        res.clearCookie('access_token').status(200).json("You're signout");
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}

// Function to edit the profile details 
export const editProfile = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to edit this profile");
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
        const {password,...rest} = editedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}

// Function to add the delivery address of a user
export const addDelAdd = async(req,res)=>{
    const {name,email,country,street_address,city,region,post_code,phone} = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
              del_Address:{name,email,country,street_address,city,region,post_code,phone}
            }
        },{new:true});
        if(!user) return res.status(402).json('user not found');
        res.status(200).json('Delivery address added');
    } catch (error) {
       res.status(500).json({error:'server error',details:error.message});
    } 
}

// Function to get the delivery address of a user
export const getDelAdd = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to access this delivery address");
    }
    try {
        const user = await User.findById(req.params.userId);
        if(!user) return res.status(405).json('User not found');
        res.status(200).json(user.del_Address);
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}

// Function to save quote request to Database
export const quoteRequest = async(req,res)=>{   
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
            res.status(200).json('Request Submitted');
        }else{
            const newUserId = new quoteRqsts({userId:req.body.userId,requests:[request]});
            await newUserId.save();
            res.status(200).json('Request Submitted')
        }     
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    } 
}

// Function to delete an account
export const deleteAccount = async (req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to edit this profile");
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("Account deleted successfully");
    } catch (error) {
        res.status(500).json({error:'server error',details:error.message});
    }
}


