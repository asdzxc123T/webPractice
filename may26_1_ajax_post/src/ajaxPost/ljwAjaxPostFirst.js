import React, { useState } from "react";
import axios from "axios";

// GET
//      요청파라메터가 주소에
// POST
//      요청파라메터가 내부적으로 -> GET방식보다는 보안 우수
//      로그인 때/체크박스/파일/기타 보안을 좀 신경써야 하는 거

const LjwAjaxPostFirst = () => {
    const [xy, setXy] = useState({ x: "", y: "" });
    const [calculateResult, setCalculateResult] = useState({
        hab: 0,
        cha: 0,
        gob: 0,
        moks: 0,
    });

    const changeXy = (e) => {
        setXy({ ...xy, [e.target.name]: e.target.value });
    };

    const fd = new FormData();
    fd.append("x", xy.x); // fd.append("요청파라메터명", 값);
    fd.append("y", xy.y);

    const calculate = () => {
        // axios.get(요청주소(P까지 다), {headers:{이름:값, ...}}).then(콜백함수);
        // axios.post(요청주소, FormData객체, {headers:{이름:값, ...}}).then(콜백함수);
        // axios.post(요청주소, FormData객체, {headers:{이름:값, ...}, withCredentials:true}).then(콜백함수);
        axios
            .post(`http://195.168.9.29:3001/calculate.do.post`, fd, {
                withCredentials: true,
            })
            .then((res) => {
                setCalculateResult(res.data);
            });
    };

    return (
        <div>
            x <input value={xy.x} name="x" onChange={changeXy} />
            <br />y <input value={xy.y} name="y" onChange={changeXy} />
            <br />
            <button onClick={calculate}>계산</button>
            <hr />
            <table>
                <tr>
                    <td>{calculateResult.hab}</td>
                    <td>{calculateResult.cha}</td>
                    <td>{calculateResult.gob}</td>
                    <td>{calculateResult.moks}</td>
                </tr>
            </table>
        </div>
    );
};

export default LjwAjaxPostFirst;
