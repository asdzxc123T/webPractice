import React, { useState } from "react";

// VanillaJS/jQuery
//      HTML에 이벤트쪽 서포트 하자
//      변화가 덜한 사이트에 유리
//      이벤트가 발생하면 그 시점의 값을 CSS선택자 써서(id/class) 받아와서...

// React
//      HTML DOM객체 자체를 OOP로 구현하자
//      변화가 잦은 사이트에 유리(VDOM)
//      state(객체의 멤버변수)에 값을 상시연동

// Dog에게 name이 있었듯이
// LjwInput에 txt이
const LjwInput = () => {
    const [txt, setTxt] = useState("");

    return (
        <div>
            <h1>{txt}</h1>
            <input
                value={txt} // txt의 값을 input 내용에 연동
                onChange={(e) => { // input 내용 바뀔 때마다
                    // e.target 이벤트가 발생한 그거
                    setTxt(e.target.value); // 바뀐 그 내용을 txt에 연동
                }}
            />
        </div>
    );
};

export default LjwInput;
