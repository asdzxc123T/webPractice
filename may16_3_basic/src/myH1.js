// 객체(component)를 만들려면 -> 클래스
// -> react측에서 클래스보다는 함수형 Component를 권장하는 쪽으로 바뀜

// rafce
import React, { useState } from "react";

// JSX(JavaScript Xml)
//      HTML이 아님, HTML 비슷하게 생긴 XML
//      무조건 하나가 리턴되어야 -> <></>
//      DOM객체 풀세트 형태여야
//          원래 풀세트 아닌 것들 -> <태그명 />
//      낙타체
//      속성 값 자리에
//          "값" : 쌩 값
//          {JS문법}

// CSS
//      JS객체 형태로
//      속성명이 낙타체
const MyH1 = () => {
    const [css, setCss] = useState({
        color: "black",
        backgroundColor: "white",
    });
    const [bgc, setbgc] = useState("white");
    const [c, setc] = useState("black");

    const changeColor = (e) => {
        setc(e.target.value);
    };

    const changeBackColor = (e) => {
        setbgc(e.target.value);
    };

    const changeH1Color = () => {
        setCss({
            color: c,
            backgroundColor: bgc,
        });
    };

    return (
        <>
            <h1 style={css}>ㅋㅋㅋ</h1>
            배경색 : <input value={bgc} onChange={changeBackColor} />
            <br />
            글자색 : <input value={c} onChange={changeColor} />
            <br />
            <button onClick={changeH1Color}>h1 색깔 바꾸기</button>
        </>
    );
};

export default MyH1;
