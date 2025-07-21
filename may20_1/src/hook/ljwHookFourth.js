import React, { useEffect, useRef, useState } from "react";

// useRef : jQuery스러운 선택
const LjwHookFourth = () => {
    const paper = useRef();
    const [pen, setPen] = useState()

    useEffect(() => {
        // useRef한 거 실제로 사용 : ???.current
        setPen(paper.current.getContext("2d"));
    }, [])
    

    return (
        <canvas
            onClick={(e) => {
                pen.fillRect(e.nativeEvent.offsetX - 25, e.nativeEvent.offsetY - 25, 50, 50)
            }}
            ref={paper}
            width={300}
            height={300}
            style={{ border: "black solid 2px" }}
        />
    );
};

export default LjwHookFourth;
