// state : 상태
// reducer : 상태 + 액션 입력받아서 새로운 상태 리턴하는(사실상 바꿔준) 함수
// action : 액션
// slice : reducer + action

// rxslice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fontSize: 30,
};

const ljwSizeSlice = createSlice({
    name: "lssHHHH", // 어차피 이 이름으로 안 부름
    initialState,
    reducers: {
        bigger: (curState) => {
            curState.fontSize += 10;
        },
        smaller: (curState) => {
            curState.fontSize -= 10;
        },
    },
});

export const { bigger, smaller } = ljwSizeSlice.actions;

export default ljwSizeSlice.reducer;
