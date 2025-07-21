import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// 원래 연결                        -> socket.io-client 라이브러리에서 연결
// var socket = io.connect("주소"); -> let socket = io("주소")

// React : 화면전환 잦은 사이트 개발에 유리 + JavaScript + VDOM : 비동기식 추구
//      -> state 변경한 거 바로 반영 안 되고, 다음 렌더링 때 반영
const LjwEchoClnt = () => {
    // 기존 스타일대로 해도 되는데
    // React 측에서 함수호출(시간이 걸리는) 같은 거는 비추(시간이 걸려서 state초기값 세팅되고... -> 느려지니)
    // -> useEffect에서 권장
    // const [socket, setSocket] = useState(io("http://localhost:5678"));
    const [socket, setSocket] = useState();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setSocket(io("http://localhost:5678")); // state 변경

        socket.on("srvMsg", (msg) => { // 끝나고 나서 여기 x (비동기식 추구)
            alert(msg);
        });

        return () => {};
    }, []);

    return (
        <>
            <input
                value={msg}
                onChange={(e) => {
                    setMsg(e.target.value);
                }}
            />
            &nbsp;&nbsp;
            <button
                onClick={() => {
                    socket.emit("clntMsg", msg);
                }}
            >
                전송
            </button>
        </>
    );
};

export default LjwEchoClnt;
