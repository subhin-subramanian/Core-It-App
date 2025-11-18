import User from "../models/user.model.js";

// Function to add items to the cart
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

// Function to get a cart for rendering
export const getCart = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You can't access this cart");
    }
    try{
         const user = await User.findById(req.params.userId);
         if(!user) return res.status(403).json('Cart not found');
         res.status(200).json(user.cart);
    }catch{
         res.status(500).json('Server Error'+error);
    }
}

// Function to update quantity of items in the cart
export const update = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to access this cart");
    }
    try {
        const user = await User.findById(req.params.userId);    
        const itemIndex = user.cart.findIndex(item=>item.id == req.body.id);
        user.cart[itemIndex].quantity = req.body.qty;
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json('Server Error'+error);
    }
}

// Function to delete items in the cart
export const remove = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json("You're not allowed to delete items in this cart");
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $pull:{cart:{id:req.body.id}}
        },{new:true});
        res.status(200).json(updatedUser.cart);
    } catch (error) {
        res.status(500).json('Server Error'+error); 
    }
}    