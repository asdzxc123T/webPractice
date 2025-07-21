import React, { useEffect, useState } from "react";
import hmdcs from "./home.module.css";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3002");

const Home = () => {
    const id = useSelector((s) => s.lus.id);
    const loggedIn = useSelector((s) => s.lus.loggedIn);

    const [comment, setComment] = useState({ name: "", comment: "" });
    const [comments, setComments] = useState([]);

    const commentsTbls = comments.map((c, i) => {
        return (
            <table
                align="center"
                style={{
                    width: "90%",
                    border: "black solid 1px",
                    marginTop: "5px",
                }}
            >
                <tr>
                    <th
                        align="center"
                        style={
                            id === c.id
                                ? {
                                      color: "blue",
                                      backgroundColor: "lightgray",
                                  }
                                : { backgroundColor: "lightgray" }
                        }
                    >
                        <img
                            alt=""
                            src={`http://localhost:3001/image.get?image=${c.image}`}
                            width={50}
                            height={50}
                        />
                        <br />
                        {c.name}
                        {c.name === c.id ? "" : "(익명)"}
                    </th>
                </tr>
                <tr>
                    <td className={hmdcs.commentTd} align="center">
                        {c.comment}
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        {c.date}
                        {" "}
                        {id === c.id ? (
                            <>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        axios
                                            .get(
                                                `http://localhost:3001/comment.del?&no=${c.no}`
                                            )
                                            .then((res) => {
                                                if (
                                                    res.data.result === "성공"
                                                ) {
                                                    socket.emit(
                                                        "updateTable",
                                                        {}
                                                    );
                                                }
                                            });
                                    }}
                                >
                                    삭제
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                        {c.name !== c.id ? (
                            <>
                                <button
                                    onClick={() => {
                                        if (window.confirm("익명의 메시지 삭제?")) {
                                            axios
                                                .get(
                                                    `http://localhost:3001/comment.del?&no=${c.no}`
                                                )
                                                .then((res) => {
                                                    if (
                                                        res.data.result ===
                                                        "성공"
                                                    ) {
                                                        socket.emit(
                                                            "updateTable",
                                                            {}
                                                        );
                                                    }
                                                });
                                        }
                                    }}
                                >
                                    삭제
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </td>
                </tr>
            </table>
        );
    });
    const changeComment = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    };

    const commentFD = new FormData();
    commentFD.append("id", id);
    commentFD.append("name", comment.name);
    commentFD.append("comment", comment.comment);
    const regComment = () => {
        if (comment.name === "" || comment.comment === "") {
            alert("닉네임, 메모 입력");
        }
        else {
            axios
                .post(`http://localhost:3001/comment.reg`, commentFD, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then(() => {
                    socket.emit("updateTable", {});
                    if (loggedIn) {
                        setComment({ ...comment, comment: "" });
                    } else {
                        setComment({ name: "", comment: "" });
                    }
                });
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/comment.get").then((res) => {
            setComments(res.data.comments);
        });
        socket.on("updateTableConfirm", (x) => {
            axios.get("http://localhost:3001/comment.get").then((res) => {
                setComments(res.data.comments);
            });
        });

        return () => {
            socket.off("updateTableConfirm");
        };
    }, []);

    useEffect(() => {
        setComment({ ...comment, name: id });
    }, [loggedIn]);

    return (
        <>
            <table width={"100%"}>
                <tr>
                    <th
                        align="center"
                        style={{ backgroundColor: "lightgray", padding: "5px" }}
                    >
                        메모 남기기
                    </th>
                </tr>
                <tr>
                    <td>
                        {loggedIn ? (
                            <input
                                name="name"
                                value={comment.name}
                                style={{
                                    marginBottom: "3px",
                                    marginLeft: "30px",
                                }}
                                readOnly
                            />
                        ) : (
                            <input
                                name="name"
                                value={comment.name}
                                onChange={changeComment}
                                placeholder="닉네임(최대 20자)"
                                autoComplete="off"
                                maxLength={20}
                                style={{
                                    marginBottom: "3px",
                                    marginLeft: "30px",
                                }}
                            />
                        )}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <textarea
                            name="comment"
                            value={comment.comment}
                            onChange={changeComment}
                            placeholder="글 입력(최대 200자)"
                            autoComplete="off"
                            maxLength={200}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <button onClick={regComment}>등록</button>
                    </td>
                </tr>
            </table>
            <hr />
            {commentsTbls}
        </>
    );
};

export default Home;
