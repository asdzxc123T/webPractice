import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    isEmpty,
    lessThan,
    notContains,
    notEqual,
} from "../../../../ljw/ljwValidChecker";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3002");

const Info = () => {
    const id = useSelector((s) => s.lus.id);

    const [info, setInfo] = useState({
        prevPassword: "",
        password: "",
        passwordConfirm: "",
        bYear: "1970",
        bMonth: "01",
        bDay: "01",
    });

    const infoFD = new FormData();
    infoFD.append("id", id);
    infoFD.append("prevPassword", info.prevPassword);
    infoFD.append("password", info.password);
    infoFD.append("bYear", info.bYear);
    infoFD.append("bMonth", info.bMonth);
    infoFD.append("bDay", info.bDay);
    const n = useNavigate();

    const validCheck = () => {
        if (info.prevPassword === info.password) {
            alert("같은 PW");
            setInfo({ ...info, password: "", passwordConfirm: "" });
            return false;
        }
        if (
            isEmpty(info.password) ||
            lessThan(info.password, 4) ||
            notEqual(info.password, info.passwordConfirm) ||
            notContains(info.password, "1234567890")
        ) {
            alert("PW?");
            setInfo({ ...info, password: "", passwordConfirm: "" });
            return false;
        }
        return true;
    };

    const changeInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const changeInfoConfirm = () => {
        if (validCheck()) {
            axios
                .post("http://localhost:3001/user.info.change", infoFD, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then((res) => {
                    if (res.data.result === "성공") {
                        alert("정보 수정 성공");
                        n("/");
                    } else {
                        alert(res.data.result);
                        setInfo({
                            ...info,
                            prevPassword: "",
                            password: "",
                            passwordConfirm: "",
                        });
                    }
                });
        }
    };

    const leave = () => {
        if (window.confirm("진짜 탈퇴?")) {
            axios
                .get(
                    `http://localhost:3001/user.leave?token=${sessionStorage.getItem(
                        "myJWT"
                    )}`
                )
                .then((res) => {
                    if (res.data.result === "성공") {
                        alert("탈퇴 성공");
                        n("/");
                        socket.emit("updateTable", {});
                        socket.emit("expiredToken", { id: id });
                    } else {
                        alert(JSON.stringify(res.data));
                    }
                });
        }
    };

    useEffect(() => {
        axios
            .get(
                `http://localhost:3001/get.info?token=${sessionStorage.getItem(
                    "myJWT"
                )}`
            )
            .then((res) => {
                if (res.data.result === "성공") {
                    setInfo({
                        ...info,
                        bYear: res.data.bYear,
                        bMonth: res.data.bMonth,
                        bDay: res.data.bDay,
                    });
                } else {
                    alert(res.data.result);
                }
            });

        socket.on("expiredTokenConfirm", (x) => {
            if (id === x.id) {
                n("/");
            }
        });

        return () => {
            socket.off("expiredTokenConfirm");
        };
    }, []);

    return (
        <>
            <table align="center">
                <tr>
                    <td align="center">
                        <input value={id} readOnly />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input
                            placeholder="이전 비밀번호 입력"
                            value={info.prevPassword}
                            name="prevPassword"
                            onChange={changeInfo}
                            autoComplete="off"
                            type="password"
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input
                            placeholder="비밀번호"
                            value={info.password}
                            name="password"
                            onChange={changeInfo}
                            autoComplete="off"
                            type="password"
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input
                            placeholder="비밀번호 확인"
                            value={info.passwordConfirm}
                            name="passwordConfirm"
                            onChange={changeInfo}
                            autoComplete="off"
                            type="password"
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        생일 :{" "}
                        <select
                            value={info.bYear}
                            name="bYear"
                            onChange={changeInfo}
                        >
                            <option>1970</option>
                            <option>1971</option>
                            <option>1972</option>
                            <option>1973</option>
                            <option>1974</option>
                            <option>1975</option>
                            <option>1976</option>
                            <option>1977</option>
                            <option>1978</option>
                            <option>1979</option>
                            <option>1980</option>
                            <option>1981</option>
                            <option>1982</option>
                            <option>1983</option>
                            <option>1984</option>
                            <option>1985</option>
                            <option>1986</option>
                            <option>1987</option>
                            <option>1988</option>
                            <option>1989</option>
                            <option>1990</option>
                            <option>1991</option>
                            <option>1992</option>
                            <option>1993</option>
                            <option>1994</option>
                            <option>1995</option>
                            <option>1996</option>
                            <option>1997</option>
                            <option>1998</option>
                            <option>1999</option>
                            <option>2000</option>
                            <option>2001</option>
                            <option>2002</option>
                            <option>2003</option>
                            <option>2004</option>
                            <option>2005</option>
                            <option>2006</option>
                            <option>2007</option>
                            <option>2008</option>
                            <option>2009</option>
                            <option>2010</option>
                            <option>2011</option>
                            <option>2012</option>
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                        년{" "}
                        <select
                            value={info.bMonth}
                            name="bMonth"
                            onChange={changeInfo}
                        >
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        월{" "}
                        <select
                            value={info.bDay}
                            name="bDay"
                            onChange={changeInfo}
                        >
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                        일
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button onClick={changeInfoConfirm}>정보 수정</button>
                        &nbsp;
                        <button onClick={leave}>탈퇴</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Info;
