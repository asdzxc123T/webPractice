import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5678");

const LjwCanvasClnt = () => {
    const paper = useRef();
    const [xyInfo, setXyInfo] = useState({ x: -1, y: -1 });
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const pen = paper.current.getContext("2d")
        socket.on("drawInfoSrv", (xy) => {
            pen.beginPath();
            pen.moveTo(xy.beginX, xy.beginY);
            pen.lineTo(xy.endX, xy.endY);
            pen.closePath();
            pen.stroke();
            setXyInfo({ x: xy.endX, y: xy.endY });
        });

        return () => {
            socket.off("drawInfoSrv");
        };
    }, []);

    return (
        <canvas
            onMouseDown={(e) => {
                if (e.button === 0) {
                    setXyInfo({
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY,
                    });
                    setDrawing(true);
                }
            }}
            onMouseMove={(e) => {
                if (drawing) {
                    socket.emit("drawInfo", {
                        beginX: xyInfo.x,
                        beginY: xyInfo.y,
                        endX: e.nativeEvent.offsetX,
                        endY: e.nativeEvent.offsetY,
                    });
                }
            }}
            onMouseUp={(e) => {
                if (e.button === 0) setDrawing(false);
            }}
            ref={paper}
            width={500}
            height={500}
            style={{ border: "black solid 2px" }}
        />
    );
};

export default LjwCanvasClnt;
