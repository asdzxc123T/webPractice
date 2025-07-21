import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import gmdcs from "./gallery.module.css";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

const Gallery = () => {
    const id = useSelector((s) => s.lus.id);
    const loggedIn = useSelector((s) => s.lus.loggedIn);

    const [threads, setThreads] = useState([]);

    const n = useNavigate();

    const threadsTrs = threads.map((t, i) => {
        return (
            <tr
                onClick={() => {
                    n(`../gallery.detail/${t.no}`);
                }}
                className={gmdcs.threadsTr}
            >
                <td align="center">{t.no}</td>
                <td align="center">{t.title}</td>
                <td align="center">{t.id}</td>
                <td align="center">{t.date}</td>
            </tr>
        );
    });

    const goToWrite = () => {
        if (loggedIn) {
             n("../gallery.wrtie");
        }
        else {
            alert("글 작성 시 로그인 필요");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3001/gallery.get.all").then((res) => {
            setThreads(res.data.threads);
        });
        socket.on("updateGalleryConfirm", (x) => {
            axios.get("http://localhost:3001/gallery.get.all").then((res) => {
                setThreads(res.data.threads);
            });
        })
        return () => {
            socket.off("updateGalleryConfirm");
        };
    }, []);

    return (
        <>
            <table align="center" style={{ width: "100%" }}>
                <tr className="">
                    <th
                        colSpan={4}
                        style={{ backgroundColor: "lightgray", padding: "5px" }}
                    >
                        게시판
                    </th>
                </tr>
                <tr>
                    <td colSpan={4} align="right">
                        <button onClick={goToWrite}>작성</button>
                    </td>
                </tr>
                <tr style={{ backgroundColor: "lightgray" }}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
                {threadsTrs}
                <tr>
                    <td colSpan={4} align="right">
                        <button onClick={goToWrite}>작성</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Gallery;
