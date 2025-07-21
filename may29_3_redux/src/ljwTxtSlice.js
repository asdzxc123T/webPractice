import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    txt: "ㅋㅋㅋ",
};
// 붕어빵
const ljwTxtSlice = createSlice({
    name: "lts",
    initialState,
    reducers: {
        changeTxt: (curState, action) => {
            // action.payload : dispatcher쪽에서 보내준 거
            curState.txt = action.payload;
        },
    },
});

// export한 거를
export const { changeTxt } = ljwTxtSlice.actions;

export default ljwTxtSlice.reducer;
