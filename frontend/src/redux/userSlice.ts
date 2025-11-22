import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IUser } from "../types/types";

interface UserState {
    currentUser: IUser | null;
    loading: boolean;
    error: string | {message:string} | null; 
}
const initialState : UserState = {
    currentUser : null,
    loading : false,
    error : null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.error = null;
            state.loading = true;
        },
        signInSuccess:(state,action : PayloadAction<IUser>)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure:(state,action : PayloadAction<string>)=>{
            state.error = action.payload;
            state.loading = false;
        },
        editProfileStart:(state)=>{
            state.error = null;
            state.loading = false;
        },
        editProfileSuccess:(state,action : PayloadAction<IUser>)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        editProfileFailure:(state,action : PayloadAction<string>)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signOutFailure:(state,action : PayloadAction<string>)=>{
            state.error = action.payload;
            state.loading = false;
        },    
        signOutSuccess:(state)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },   
        deleteUserStart:(state)=>{
            state.error = null;
            state.loading = true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserFailure:(state,action : PayloadAction<string>)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateSubscription:(state,action : PayloadAction<boolean>)=>{
            if(state.currentUser){
                state.currentUser.subscription = action.payload;
            }
        }
    }
});

export const {signInSuccess,signInFailure,signInStart,editProfileStart,editProfileSuccess,editProfileFailure,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOutStart,signOutSuccess,signOutFailure,updateSubscription} = userSlice.actions;
export default userSlice.reducer;