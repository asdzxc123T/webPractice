import React, { useState } from "react";

const LjwCssSecond = () => {
    const [wh, setWh] = useState({ width: 200, height: 200 });

    return (
        <>
            <table border={1} style={wh}>
                <tr>
                    <td>
                        <input
                            value={wh.width}
                            onChange={(e) => {
                                setWh({
                                    ...wh,
                                    width: e.target.value * 1,
                                });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            value={wh.height}
                            onChange={(e) => {
                                setWh({
                                    // wh에서 width는 원래값 그대로, height만 바꿀 수 있다면면
                                    // ...객체 : 그 객체 값들 그대로 가져오기(ES6)
                                    ...wh,
                                    height: e.target.value * 1,
                                });
                            }}
                        />
                    </td>
                </tr>
            </table>
        </>
    );
};

export default LjwCssSecond;
