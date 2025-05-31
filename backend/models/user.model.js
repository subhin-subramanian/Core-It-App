import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid"
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    cart:[
        {
            _id:false,
            id:String,
            quantity:Number,
        }
    ],
    del_Address:{
        name:String,
        email:String,
        country:String,
        street_address:String,
        city:String,
        region:String,
        post_code:String,
        phone:Number,
    },
    subscription:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;