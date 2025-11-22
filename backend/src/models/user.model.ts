import { Schema, model, Document } from "mongoose";

//Defining the typescript interfaces
export interface CartItem {
    id:string;
    quantity:number;
}

export interface DeliveryAddress {
    name: string;
    email: string;
    country: string;
    street_address: string;
    city: string;
    region: string;
    post_code: string;
    phone: number;
}

export interface IUser extends Document {
    username:string;
    email:string;
    password:string;
    profilePic?:string;
    isAdmin:boolean;
    cart: CartItem[];
    del_Address: DeliveryAddress;
    subscription: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Defining the mongoose schemas
// Cart sub-schema
const cartItemSchema = new Schema<CartItem>({
    id: { type: String, required: true },
    quantity: { type: Number, default: 1 }
}, { _id: false });

// Delivery address sub-schema
const deliveryAddressSchema = new Schema<DeliveryAddress>({
    name: String,
    email: String,
    country: String,
    street_address: String,
    city: String,
    region: String,
    post_code: String,
    phone: Number,
}, { _id: false });

//Main User Schema
const userSchema = new Schema<IUser>({
    username: { type:String, required:true},
    email: { type:String, required:true},
    password: { type:String, required:true},
    profilePic: {
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid"
    },
    isAdmin: {type:Boolean, default:false },
    cart:{
        type: [cartItemSchema],
        default: []
    },
    del_Address:{
        type: deliveryAddressSchema,
        default: {}
    },
    subscription:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

export const User = model<IUser>('User',userSchema);
