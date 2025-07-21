import axios from "axios";
import React, { useState } from "react";

// e0bd46d9aea988808701f213a835bd46
const LjwAjaxSecond = () => {
    const REST_API_KEY = "e0bd46d9aea988808701f213a835bd46";
    const [searchTxt, setSearchTxt] = useState("");
    const [books, setBooks] = useState([]);
    const bookTrs = books.map((b, i) => {
        return (
            <tr>
                <td>
                    <img src={b.thumbnail} alt="zzz" />
                </td>
                <td>{b.title}</td>
                <td>{b.price}원</td>
            </tr>
        );
    });

    const search = () => {
        // axios.get(요청주소, {headers: {이름:값, ...}}).then(콜백함수);
        axios
            .get(`https://dapi.kakao.com/v3/search/book?query=${searchTxt}`, {
                headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
            })
            .then((res) => {
                // 1. 파싱해서 []로 만들자
                // let ar = res.data.documents;
                // for (let i = 0; i < ar.length; i++) {
                //     const b = ar[i];
                //     const b2 = {t : b.title, p : b.price};
                // }
                // 2. []만 찾아놓고 반복문 돌 때 필요한 것만
                setBooks(res.data.documents);
            });
        setSearchTxt("");
    };
    return (
        <>
            <input
                value={searchTxt}
                onChange={(e) => {
                    setSearchTxt(e.target.value);
                }}
            />
            <button onClick={search}>검색</button>
            <hr />
            <table border={1}>
                <tr>
                    <th>사진</th>
                    <th>제목</th>
                    <th>가격</th>
                </tr>
                {bookTrs}
            </table>
        </>
    );
};

export default LjwAjaxSecond;
