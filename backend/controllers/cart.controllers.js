import User from "../models/user.model.js";


export const add = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to access this cart");
    }
    try {
        const user = await User.findById(req.params.userId);    
        const itemIndex = user.cart.findIndex(item=>item.id == req.body.cardId);
        if(itemIndex > -1){
            user.cart[itemIndex].quantity += 1;
        }else{
            user.cart.push({id:req.body.cardId,quantity:1});
        }
        await user.save();
        res.status(200).json('cart updated');
    } catch (error) {
        res.status(500).json('Server Error'+error);
    }
}