import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3002");

const LjwAjaxMini = () => {
    const [snackName, setSnackName] = useState("");
    const [snackPrice, setSnackPrice] = useState("");
    const [snacks, setSnacks] = useState([]);
    const snackTrs = snacks.map((s, i) => {
        return (
            <tr>
                <td>{s.no}</td>
                <td>{s.name}</td>
                <td>{s.price}</td>
                <td>
                    <button
                        onClick={() => {
                            axios
                                .get(
                                    `http://localhost:3001/may22.delete?no=${s.no}`
                                )
                                .then(() => {
                                    socket.emit("updateTable", {
                                        no: s.no,
                                    });
                                }
                            );
                        }}
                    >
                        삭제
                    </button>
                </td>
            </tr>
        );
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/may22.get?page=1`).then((res) => {
            setSnacks(res.data);
        });

        socket.on("updateTableConfirm", (x) => {
            axios.get(`http://localhost:3001/may22.get?page=1`).then((res) => {
                setSnacks(res.data);
            });
        });

        return () => {
            socket.off("updateTableConfirm");
        };
    }, []);

    const reg = () => {
        axios
            .get(
                `http://localhost:3001/may22.reg?name=${snackName}&price=${snackPrice}`
            )
            .then((res) => {
                if (res.data) {
                    socket.emit("updateTable", {
                        name: snackName,
                        price: snackPrice,
                    });
                }
            });
        setSnackName("");
        setSnackPrice("");
    };

    return (
        <>
            이름 :{" "}
            <input
                value={snackName}
                onChange={(e) => {
                    setSnackName(e.target.value);
                }}
            />{" "}
            <br />
            가격 :{" "}
            <input
                value={snackPrice}
                onChange={(e) => {
                    setSnackPrice(e.target.value);
                }}
            />{" "}
            <br />
            <button onClick={reg}>등록</button>
            <hr />
            <table border={1}>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>가격</th>
                </tr>
                {snackTrs}
                <table>
                    <tr>
                    </tr>
                </table>
            </table>
        </>
    );
};

export default LjwAjaxMini;
