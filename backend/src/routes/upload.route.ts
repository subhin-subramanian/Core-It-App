import express, { type Request, type Response } from 'express';
import cloudinary from '../utils/cloudinary.js';
import type { ApiResponse } from '../types/response.js';

const router = express.Router();

router.post('/', async(req:Request, res:Response<ApiResponse>) : Promise<void> => {
    try {
        const {image} = req.body;
        if(!image) {
            res.status(400).json({success:false, message: 'No image provided'});
            return
        }    
        const result = await cloudinary.uploader.upload(image,{folder: 'Core_It_Solutions'});
        res.status(200).json({success:true, datafromBknd:result.secure_url});
    } catch (error:any) {
        res.status(500).json({success:false, message:'server error', datafromBknd:error.message});
    }
})

export default router;
