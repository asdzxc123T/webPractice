import React, { useState } from "react";

const LjwRSThird = () => {
    const [nnn, setNnn] = useState([56, 11, 22, 567, 678]);

    // 배열 필터링
    //      배열 차례대로 탐색, 뭐 하나 만날 때마다 콜백함수
    //      콜백함수 속에서 조건문 써서 true값 리턴되는 것만 살아남음음
    const nnn2 = nnn.filter((n) => n % 2 === 0);

    const datas = nnn2.map((n, i) => (
        <marquee behavior="alternate">{n}</marquee>
    ));

    return <div>{datas}</div>;
};

export default LjwRSThird;
