import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
// import cartReducer from "../slices/cartSlice"
import taskReducer from "../slices/TaskSlice"
import viewTaskReducer from "../slices/viewTaskSlice";


const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    // cart:cartReducer,
    task:taskReducer,
    viewTask:viewTaskReducer
})

export default rootReducer