import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        loading:false,
        error:null
    },
    reducers:{
        signInStart:(state)=>{
            state.error = null;
            state.loading = true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        editProfileStart:(state)=>{
            state.error = null;
            state.loading = false;
        },
        editProfileSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        editProfileFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
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
        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {signInSuccess,signInFailure,signInStart,editProfileStart,editProfileSuccess,editProfileFailure,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOutStart,signOutSuccess,signOutFailure} = userSlice.actions;
export default userSlice.reducer;