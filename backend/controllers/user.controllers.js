import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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
        res.status(500).json('server error',+error);   
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
        res.status(500).json('server error',+error);  
    }
}

