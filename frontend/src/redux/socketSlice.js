import {createSlice} from "@reduxjs/toolkit";
const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state, action)=>{
            // Don't store socket in Redux state
            state.socket = null;
        }
    }
});
export const {setSocket} = socketSlice.actions;
export default socketSlice.reducer;