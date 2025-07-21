import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3002");

const GalleryWrite = () => {
    const id = useSelector((s) => s.lus.id);
    const n = useNavigate();

    const [writing, setWriting] = useState({ title: "", desc: "" });

    const changeWriting = (e) => {
        setWriting({ ...writing, [e.target.name]: e.target.value });
    };

    const writingFD = new FormData();
    writingFD.append("title", writing.title);
    writingFD.append("id", id);
    writingFD.append("desc", writing.desc);
    const regWriting = () => {
        axios
            .post("http://localhost:3001/gallery.reg", writingFD, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data.result === "성공") {
                    alert("글 등록 성공");
                    socket.emit("updateGallery", {});
                    n("/gallery.go");
                } else {
                    alert(res.data.result);
                }
            });
    };

    useEffect(() => {
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
            <table width={"100%"}>
                <tr>
                    <th
                        align="center"
                        style={{ backgroundColor: "lightgray", padding: "5px" }}
                    >
                        게시판 글 작성
                    </th>
                </tr>
                <tr>
                    <td>
                        <input
                            value={id}
                            autoComplete="off"
                            maxLength={20}
                            style={{
                                marginBottom: "3px",
                                marginLeft: "30px",
                            }}
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            name="title"
                            value={writing.title}
                            onChange={changeWriting}
                            placeholder="제목 입력(최대 20자)"
                            autoComplete="off"
                            maxLength={20}
                            style={{
                                marginBottom: "3px",
                                marginLeft: "30px",
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <textarea
                            name="desc"
                            value={writing.desc}
                            onChange={changeWriting}
                            placeholder="글 입력(최대 300자)"
                            autoComplete="off"
                            maxLength={300}
                            style={{ height: "400px" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <button onClick={regWriting}>등록</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default GalleryWrite;
