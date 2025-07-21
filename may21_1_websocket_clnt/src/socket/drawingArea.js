import React, { useEffect, useRef, useState } from "react";

const DrawingArea = () => {
    const [drawMode, setDrawMode] = useState(false);
    const paper = useRef();
    const [pen, setPen] = useState();
    const [xyInfo, setXyInfo] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        setPen(paper.current.getContext("2d"));

        return () => {};
    }, []);

    const drawStart = (e) => {
        setDrawMode(true);
        setXyInfo({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
    };
    const draw = (e) => {
        if (drawMode) {
            pen.beginPath();
            pen.moveTo(xyInfo.x, xyInfo.y);
            pen.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            pen.closePath();
            pen.stroke();
            setXyInfo({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
            });
        }
    };
    const drawEnd = (e) => {
        setDrawMode(false);
    };

    return (
        <canvas
            ref={paper}
            style={{ border: "black solid 3px" }}
            width={500}
            height={500}
            onMouseDown={drawStart}
            onMouseMove={draw}
            onMouseUp={drawEnd}
        />
    );
};

export default DrawingArea;
