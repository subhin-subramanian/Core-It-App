import sellerRqst from "../models/seller.model.js"


export const sellerRequest = async(req,res)=>{
    console.log(req.body);
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
        res.status(200).json('New seller request added');
    } catch (error) {
         res.status(500).json({error:'server error',details:error.message});      
    }
}
