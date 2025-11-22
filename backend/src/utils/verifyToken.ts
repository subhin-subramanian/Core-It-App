import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { ApiResponse } from '../types/response.js';

interface ReqUserDetails extends Request {
    user?:string | JwtPayload;
}

export const verifyToken = (req:ReqUserDetails, res:Response<ApiResponse>, next:NextFunction) : void => {
    const token = req.cookies.access_token;
    if(!token){
        res.status(400).json({success:false, message:'Wrong credentials'});
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET as string,(err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined)=>{
        if(err){
            (res.status(401).json({success:false, message:'Unauthorized'}));
            return;
        }
        req.user=user;
        next();
    })
}