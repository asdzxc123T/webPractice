import React, { useState } from "react";
import "./snackBBS.css";

// 프로그래밍 분야에서
//      array : 수정 불가능한 거
//      list : 수정 가능한 거
// Python : list
// JS : array

const SnackBBS = () => {
    const [snacks, setSnacks] = useState([]);
    const [tempSnack, setTempSnack] = useState({ name: "", price: "" });

    const snackTrs = snacks.map((s, i) => {
        return (
            <tr
                className="dataTr"
                onClick={() => {
                    del(s.name);
                }}
            >
                <td align="center">{s.name}</td>
                <td align="right">{s.price}원</td>
            </tr>
        );
    });

    const changeTempSnackName = (e) => {
        setTempSnack({ ...tempSnack, name: e.target.value });
    };
    const changeTempSnackPrice = (e) => {
        setTempSnack({ ...tempSnack, price: e.target.value });
    };
    const del = (name) => {
        setSnacks(snacks.filter((snack) => snack.name !== name));
    };
    const reg = () => {
        // JS 배열에 추가
        //      배열[i] = ???
        //      배열.concat(???) : 추가된 배열을 리턴
        setSnacks(snacks.concat(tempSnack)); // setSnacks([...snacks, tempSnack]);
        setTempSnack({ name: "", price: "" });
    };

    return (
        <div id="snackArea">
            이름 :{" "}
            <input
                className="txtTypeInput"
                value={tempSnack.name}
                onChange={changeTempSnackName}
            />
            <br />
            가격 :{" "}
            <input
                className="txtTypeInput"
                value={tempSnack.price}
                onChange={changeTempSnackPrice}
            />
            <br />
            <button onClick={reg}>등록</button>
            <hr />
            <table id="snackBBSTbl" border={1}>
                <tr>
                    <th>이름</th>
                    <th>가격</th>
                </tr>
                {snackTrs}
            </table>
        </div>
    );
};

export default SnackBBS;
