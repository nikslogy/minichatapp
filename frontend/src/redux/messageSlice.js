import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []  // Initialize as empty array
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload || []; // Ensure it's always an array
        },
        addMessage: (state, action) => {
            state.messages = [...(state.messages || []), action.payload];
        }
    }
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;