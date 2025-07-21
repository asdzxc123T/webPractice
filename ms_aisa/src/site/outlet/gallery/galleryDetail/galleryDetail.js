import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import gdmdcs from "./galleryDetail.module.css";

const socket = io("http://localhost:3002");

const GalleryDetail = () => {
    const id = useSelector((s) => s.lus.id);
    const no = useParams();
    const [thread, setThread] = useState({
        title: "",
        id: "",
        desc: "",
        image: "",
    });
    const [reply, setReply] = useState("");
    const [replyCount, setReplyCount] = useState(0);
    const [replies, setReplies] = useState([]);

    const n = useNavigate();

    const changeReply = (e) => {
        setReply(e.target.value);
    };

    const replyTbls = replies.map((r, i) => {
        return (
            <table
                style={{
                    width: "100%",
                    border: "black solid 2px",
                    marginTop: "5px",
                }}
            >
                <tr style={{ backgroundColor: "lightgray" }}>
                    <td style={{ padding: "5px" }}>
                        <img
                            src={`http://localhost:3001/image.get?image=${r.image}`}
                            alt=""
                            width={20}
                            height={20}
                        />{" "}
                        {r.id}
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "8px" }} className={gdmdcs.textTd}>
                        {r.desc}
                    </td>
                </tr>
                <tr>
                    <td align="right" style={{ fontSize: "10pt" }}>
                        {r.date}{" "}
                        {id === r.id ? (
                            <button
                                onClick={() => {
                                    if (window.confirm("진짜 삭제?")) {
                                        axios
                                            .get(
                                                `http://localhost:3001/reply.delete?no=${r.no}`
                                            )
                                            .then((res) => {
                                                if (
                                                    res.data.result === "성공"
                                                ) {
                                                    alert("삭제 성공");
                                                    socket.emit(
                                                        "updateDetail",
                                                        { no: no.no }
                                                    );
                                                } else {
                                                    alert(
                                                        JSON.stringify(res.data)
                                                    );
                                                }
                                            });
                                    }
                                }}
                            >
                                삭제
                            </button>
                        ) : (
                            ""
                        )}
                    </td>
                </tr>
            </table>
        );
    });

    const deleteThread = () => {
        if (window.confirm("진짜 삭제?")) {
            axios
                .get(`http://localhost:3001/thread.delete?no=${no.no}`)
                .then((res) => {
                    if (res.data.result === "성공") {
                        alert("삭제 성공");
                        n("/gallery.go");
                    } else {
                        alert(JSON.stringify(res.data));
                    }
                });
        }
    };

    const replyFD = new FormData();
    replyFD.append("id", id);
    replyFD.append("gno", no.no);
    replyFD.append("desc", reply);

    const regReply = () => {
        axios
            .post("http://localhost:3001/reply.reg", replyFD, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data.result === "성공") {
                    socket.emit("updateDetail", { no: no.no });
                } else {
                    alert(res.data.result);
                    n("/gallery.go");
                }
                setReply("");
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/thread.get?no=${no.no}`)
            .then((res) => {
                setThread(res.data.thread);
                setReplies(res.data.replies);
                setReplyCount(res.data.count);
            });
        socket.on("updateDetailConfirm", (x) => {
            if (x.no === no.no) {
                axios
                    .get(`http://localhost:3001/thread.get?no=${no.no}`)
                    .then((res) => {
                        setReplies(res.data.replies);
                        setReplyCount(res.data.count);
                    });
            }
        });

        return () => {
            socket.off("updateDetailConfirm");
        };
    }, []);

    return (
        <>
            <table style={{ width: "100%" }}>
                <tr style={{ backgroundColor: "lightgray" }}>
                    <td align="center">
                        <h4>{thread.title}</h4>
                    </td>
                </tr>
                <tr>
                    <td align="right" style={{ paddingRight: "10px" }}>
                        작성자:{" "}
                        <img
                            src={`http://localhost:3001/image.get?image=${thread.image}`}
                            alt=""
                            width={20}
                            height={20}
                        />{" "}
                        {thread.id}, 작성일자: {thread.date}{" "}
                        {id === thread.id ? (
                            <button onClick={deleteThread}>삭제</button>
                        ) : (
                            ""
                        )}
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "20px" }} className={gdmdcs.textTd}>
                        {thread.desc}
                    </td>
                </tr>
            </table>
            <hr />
            <div style={{ padding: "20px" }}>
                댓글 ({replyCount})
                <hr />
                {replyTbls}
                <hr />
                <table style={{ width: "100%" }}>
                    <tr>
                        <td>
                            <input
                                value={id ? id : "댓글 입력을 위해서는 로그인"}
                                readOnly
                                style={{ marginLeft: "20px" }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            {id ? (
                                <textarea
                                    name="desc"
                                    placeholder="댓글 입력(최대 300자)"
                                    autoComplete="off"
                                    maxLength={300}
                                    style={{ height: "50px", margin: "10px" }}
                                    value={reply}
                                    onChange={changeReply}
                                />
                            ) : (
                                <textarea
                                    name="desc"
                                    placeholder="댓글 입력을 위해서는 로그인"
                                    style={{ height: "50px", margin: "10px" }}
                                    readOnly
                                />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style={{ paddingRight: "20px" }}>
                            <button
                                onClick={
                                    id
                                        ? regReply
                                        : () => {
                                              alert(
                                                  "댓글 등록을 위해서는 로그인"
                                              );
                                          }
                                }
                            >
                                등록
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};

export default GalleryDetail;
