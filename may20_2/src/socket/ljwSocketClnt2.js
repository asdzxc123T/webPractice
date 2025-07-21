import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// React 프로젝트를 Node.js에 업로드해서 실행 중
// Node.js에 socket.io 클라이언트 라이브러리도 있으니
//    yarn add socket.io-client@2
const LjwSocketClnt2 = () => {
  const [socket, setSocket] = useState();
    useEffect(() => {
        setSocket(io("http://localhost:5678"));
    }, []);

    return <div onClick={() => {
      socket.emit("test", "z");
    }}>LjwSocketClnt</div>;
};

export default LjwSocketClnt2;
