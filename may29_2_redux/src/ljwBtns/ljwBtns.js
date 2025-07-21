import React from "react";
import { useDispatch } from "react-redux";
import { bigger, smaller } from "../ljwSizeSlice";

// dispatcher : state를 바꿔줄 존재
const LjwBtns = () => {
    const d = useDispatch();
    return (
        <>
            <button
                onClick={() => {
                    // d(slice쪽 reducer 함수 이름)
                    d(bigger());
                }}
            >
                크게
            </button>
            <button
                onClick={() => {
                    d(smaller());
                }}
            >
                작게
            </button>
        </>
    );
};

export default LjwBtns;
