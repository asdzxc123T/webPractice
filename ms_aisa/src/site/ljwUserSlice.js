import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    psa: "",
    loggedIn: false
};
const ljwUserSlice = createSlice({
    name: "lus",
    initialState,
    reducers: {
        changeUser: (curState, action) => {
            curState.id = action.payload;
        },
        changePsa: (curState, action) => {
            curState.psa = action.payload;
        },
        toggleLoggedIn: (curState) => {
            curState.loggedIn = !curState.loggedIn;
        }
    },
});

export const { changeUser, changePsa, toggleLoggedIn } = ljwUserSlice.actions;

export default ljwUserSlice.reducer;
