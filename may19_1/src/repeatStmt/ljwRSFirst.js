import React from "react";

const LjwRSFirst = () => {
    const gogo = () => {
        // 기존 for/while문 당연히
        let arrr = [345, 46, 73456, 12];
        // arrr을 탐색, 뭐 하나 만날 때마다 콜백함수 호출
        // 배열.map((값, 인덱스) => {});
        arrr.map((n, i) => {
            alert(i + " : " + n);
        });
    };
    return <button onClick={gogo}>LjwRsFirst</button>;
};

export default LjwRSFirst;
