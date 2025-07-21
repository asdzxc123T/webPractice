import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePsa, changeUser, toggleLoggedIn } from "./ljwUserSlice";
import io from "socket.io-client";
import axios from "axios";
import { isNotType } from "../ljw/ljwValidChecker";
import Weather from "./weather/weather";

const socket = io("http://localhost:3002");
let id;

export const update = () => {
    axios
        .get(
            `http://localhost:3001/update.token?token=${sessionStorage.getItem(
                "myJWT"
            )}`
        )
        .then((res) => {
            if (res.data.result === "성공") {
                sessionStorage.setItem("myJWT", res.data.memberJWT);
            } else if (res.data.result === "만료됨") {
                socket.emit("expiredToken", { id: id });
            }
        });
};

const SiteLayout = () => {
    const linkStyle = { textDecoration: "none", color: "black" };
    id = useSelector((s) => s.lus.id);
    const psa = useSelector((s) => s.lus.psa);
    const loggedIn = useSelector((s) => s.lus.loggedIn);

    const d = useDispatch();
    const n = useNavigate();

    const [user, setUser] = useState({ id: "", password: "" });
    const [changingPsa, setChangingPsa] = useState(false);
    const [image, setImage] = useState("");
    const imageInput = useRef();

    const changeSignIn = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const userFD = new FormData();
    userFD.append("id", user.id);
    userFD.append("password", user.password);
    const signIn = () => {
        axios
            .post("http://localhost:3001/log.in", userFD, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data.result === "성공") {
                    setChangingPsa(false);
                    d(toggleLoggedIn());
                    d(changeUser(user.id));
                    sessionStorage.setItem("myJWT", res.data.memberJWT);
                    n("/");
                    axios
                        .get(
                            `http://localhost:3001/get.token?token=${sessionStorage.getItem(
                                "myJWT"
                            )}`
                        )
                        .then((res) => {
                            d(changePsa(res.data.image));
                        });
                } else {
                    alert(res.data.result);
                }
                setUser({ id: "", password: "" });
            });
    };
    const signUp = () => {
        n("/signup.go");
    };
    const logOut = () => {
        sessionStorage.removeItem("myJWT");
        socket.emit("expiredToken", { id: id });
    };
    const changeProfile = () => {
        setChangingPsa(!changingPsa);
    };

    const imageFD = new FormData();
    imageFD.append("image", image);
    imageFD.append("id", id);
    const confirmChangeProfile = () => {
        if (
            isNotType(image, "png") &&
            isNotType(image, "jpg") &&
            isNotType(image, "jpeg") &&
            isNotType(image, "gif")
        ) {
            alert("그림 파일 넣어");
        } else {
            axios
                .post(`http://localhost:3001/image.reg`, imageFD)
                .then((res) => {
                    setImage("");
                    setChangingPsa(false);
                    imageInput.current.value = "";
                    d(changePsa(res.data.image));
                    socket.emit("updateTable", {});
                });
        }
    };

    useEffect(() => {
        axios
            .get(
                `http://localhost:3001/get.token?token=${sessionStorage.getItem(
                    "myJWT"
                )}`
            )
            .then((res) => {
                if (res.data.result === "성공" && id === "") {
                    d(toggleLoggedIn());
                    d(changeUser(res.data.id));
                    d(changePsa(res.data.image));
                    update();
                } else if (res.data.result === "만료됨") {
                    sessionStorage.removeItem("myJWT");
                }
            });
        socket.on("expiredTokenConfirm", (x) => {
            sessionStorage.removeItem("myJWT");
            if (id === x.id && id !== "") {
                d(toggleLoggedIn());
                d(changeUser(""));
                d(changePsa(""));
            }
        });

        document.addEventListener("click", update);

        return () => {
            socket.off("expiredTokenConfirm");
            document.removeEventListener("click", update);
        };
    }, []);

    return (
        <>
            <table
                style={{ width: 1200, marginLeft: "auto", marginRight: "auto" }}
            >
                <tr>
                    <td align="center" colSpan={2} style={{border: "black solid 1px"}}>
                        <h1>
                            <Link to="/" style={linkStyle}>
                                Mini Project
                            </Link>
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td align="center" style={{border: "black solid 2px"}}>
                        <h3>
                            <Link to="/" style={linkStyle}>
                                홈
                            </Link>
                            &nbsp;&nbsp;
                            <Link to="/gallery.go" style={linkStyle}>
                                게시판
                            </Link>
                            &nbsp;&nbsp;
                            <Link to="/map.go" style={linkStyle}>
                                지도
                            </Link>
                        </h3>
                    </td>
                    <td
                        align="center"
                        style={{
                            padding: "6px",
                            height: "160px",
                            width: "380px",
                            backgroundColor: "lightgray",
                        }}
                    >
                        {loggedIn ? (
                            <>
                                <img
                                    alt=""
                                    src={`http://localhost:3001/image.get?image=${psa}`}
                                    width={50}
                                    height={50}
                                    onClick={changeProfile}
                                />
                                <br />
                                ID : {id}
                                <br />
                                <button
                                    onClick={() => {
                                        n("/info.go");
                                    }}
                                >
                                    정보 수정
                                </button>
                                &nbsp;
                                <button onClick={logOut}>로그아웃</button>
                                {changingPsa ? (
                                    <>
                                        <hr />
                                        <input
                                            ref={imageInput}
                                            type="file"
                                            onChange={(e) => {
                                                setImage(e.target.files[0]);
                                            }}
                                        />
                                        <button onClick={confirmChangeProfile}>
                                            등록
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                <input
                                    placeholder="id"
                                    name="id"
                                    value={user.id}
                                    onChange={changeSignIn}
                                    autoComplete="off"
                                    maxLength={20}
                                />
                                <br />
                                <input
                                    placeholder="password"
                                    name="password"
                                    value={user.password}
                                    onChange={changeSignIn}
                                    autoComplete="off"
                                    type="password"
                                    maxLength={20}
                                />
                                <br />
                                <button
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        marginRight: "3px",
                                    }}
                                    onClick={signIn}
                                >
                                    로그인
                                </button>
                                &nbsp;
                                <button
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        marginRight: "3px",
                                    }}
                                    onClick={signUp}
                                >
                                    회원가입
                                </button>
                            </>
                        )}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Outlet />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} align="center" style={{ padding: "5px" }}>
                        <h3>Mini Project by LJW</h3>
                    </td>
                </tr>
            </table>
            <Weather />
        </>
    );
};

export default SiteLayout;
