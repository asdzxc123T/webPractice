import React, { useState } from "react";

const LjwRSFourth = () => {
    const [snacks, setSnacks] = useState([
        { name: "칙촉", price: 4000 },
        { name: "쿠크다스", price: 4500 },
        { name: "단백질바", price: 5000 },
    ]);
    // 배열 정렬 : 이해불가하겠지만 bubblesort같은 걸까...
    // const sortedSnacks = snacks.sort(); // 기본형급, 오름차순
    const sortedSnacks = snacks.sort((s1, s2) => {
        if (s1.name > s2.name) {
            return 1; // 1이면 오름차순, -1이면 내림차순
        }
        return -1;
    }); // 객체급 or 기본형급이지만 다른 순서

    const snackTrs = snacks.map((s, i) => (
        <tr>
            <td>{s.name}</td>
            <td>{s.price}</td>
        </tr>
    ));
    return <table border={1}>{snackTrs}</table>;
};

export default LjwRSFourth;
