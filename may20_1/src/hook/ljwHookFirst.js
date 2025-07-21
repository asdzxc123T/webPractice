import React, { useState } from "react";

// React : JS OOP library + VDOM
// 객체를 만들려면 class가 필요
//      -> React 측에서 class보다 function쪽을 권장

// 객체(class)
//      속성(멤버변수)
//      액션(메소드)
//      객체가 만들어질 때 어쩌고(생성자)
//      -> 저런 것들이 함수에 있을 수 있나?
//      -> React측에서 Hook이라는 걸 제공해줘서 저런 느낌 나게

// useState : 멤버변수 + 멤버변수 값을 바꿀 수 있는 메소드(setter)
const LjwHookFirst = () => {
    // const [멤버변수명(getter를 겸하는), setter메소드명] = useState(기본값)
    const [counter, setCounter] = useState(0);

    return (
        <>
            <h1>{counter}</h1>
            <button
                onClick={() => {
                    setCounter(counter + 1);
                }}
            >
                버튼
            </button>
        </>
    );
};

export default LjwHookFirst;
