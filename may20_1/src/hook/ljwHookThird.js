import React, { useEffect, useReducer, useState } from "react";

const changeColor = (before, colorr) => {
    return {...before, color: colorr};
};

// useEffect : 생성자
const LjwHookThird = () => {
    const [css1, setCss1] = useState({
        backgroundColor: "red",
        color: "white",
    });
    const [css2, setCss2] = useReducer(changeColor, {
        backgroundColor: "yellow",
        color: "blue",
    });

    // 처음 나올 때 두번씩 나왔던 거는 index.js에 있는 strictMode 때문
    // useEffect(() => {
    //     alert("aa");
    // }); // LjwHookThird가 화면상에 변화 생길 때마다(렌더링 될 때마다)
    // // (처음 나올 때, 글자가 적히고, css가 바뀌고, ...)
    
    // useEffect(() => {
    //     alert("aa");
    // }, []); // LjwHookThird가 처음 나올 때(첫 렌더링 때)

    // useEffect(() => {
    //     alert("aa");
    // }, [css1]); // LjwHookThird가 처음 나올 때(첫 렌더링 때) + css1 값 바뀔 때마다

    // useEffect(() => {
    //     alert("aa");
    //     return () => { // 소멸자
    //         alert("bb"); // LjwHookThird가 화면에서 사라질 때
    //     }
    // }, []);
    

    return (
        <>
            <input
                style={css1}
                value={css1.color}
                onChange={(e) => {
                    setCss1({ ...css1, color: e.target.value });
                }}
            />{" "}
            <br />
            <input
                style={css2}
                value={css2.color}
                onChange={(e) => {
                    setCss2(e.target.value);
                }}
            />
        </>
    );
};

export default LjwHookThird;
