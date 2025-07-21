import React, { useState } from "react";

const LjwKeyEvent = () => {
    const [eventInfo, setEventInfo] = useState("");
    const [keyInfo, setKeyInfo] = useState("");
    return (
        <div>
            <input
                onKeyDown={(e) => {
                    setEventInfo("keyDown");
                    setKeyInfo(e.key);
                }}
                onKeyUp={(e) => {
                    setEventInfo("keyUp");
                    setKeyInfo(e.key);
                }}
            />
            <p />
            <h2>{eventInfo}</h2>
            <h2>{keyInfo}</h2>
        </div>
    );
};

export default LjwKeyEvent;
