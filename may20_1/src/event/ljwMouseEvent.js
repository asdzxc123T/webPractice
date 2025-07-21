import React, { useState } from "react";

const LjwMouseEvent = () => {
    const divCSS = {
        margin: 5,
        width: 200,
        height: 200,
        border: "black solid 2px",
    };
    const [moveInfo, setMoveInfo] = useState("");
    const [xyInfo, setXyInfo] = useState("");
    const [clickInfo, setClickInfo] = useState("");
    return (
        <div>
            <div
                style={divCSS}
                onMouseEnter={() => {
                    setMoveInfo("mouseEnter");
                }}
                onMouseMove={(e) => {
                    // e.clientX, e.clientY : html 기준
                    // e.nativeEvent.offsetX, e.nativeEvent.offsetY : 객체 기준
                    setXyInfo(
                        e.nativeEvent.offsetX + ", " + e.nativeEvent.offsetY
                    );
                }}
                onMouseLeave={() => {
                    setMoveInfo("mouseLeave");
                }}
                onMouseDown={(e) => {
                    setClickInfo("mouseDown : " + e.button);
                }}
                onMouseUp={(e) => {
                    setClickInfo("mouseUp : " + e.button);
                }}
            ></div>
            <h2>{moveInfo}</h2>
            <h2>{xyInfo}</h2>
            <h2>{clickInfo}</h2>
        </div>
    );
};

export default LjwMouseEvent;
