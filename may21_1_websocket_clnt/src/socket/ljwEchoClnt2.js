import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// React의 state 시스템으로는 답이 없으니, 포기하고
const socket = io("http://localhost:5678")

const LjwEchoClnt2 = () => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        socket.on("srvMsg", (msg2) => {
            alert(msg2);
        });

        return () => {
            socket.off("srvMsg");
        };
    }, []);

    const sendMsg = () => {
        socket.emit("clntMsg", msg);
        setMsg("");
    }

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
                onClick={sendMsg}
            >
                전송
            </button>
        </>
    );
};

export default LjwEchoClnt2;
