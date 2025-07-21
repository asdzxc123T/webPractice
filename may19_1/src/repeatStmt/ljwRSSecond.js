import React, { useState } from "react";

// vanillaJS/jQuery
//      파싱 -> 반복문 -> tr/td 만들어서 -> 존재하던 table에 append

// React
//      파싱 -> 반복문 -> tr/td 만들어서 return하는 걸 변수에 저장
const LjwRSSecond = () => {
    const [abcd, setAbcd] = useState(["a", "dfs", "zxcvzx", "v"]);

    // const datas = abcd.map((v, i) => {
    //     return <div>{v}</div>;
    // });
    const datas = abcd.map((v, i) => <div>{v}</div>)

    return <div>{datas}</div>;
};

export default LjwRSSecond;
