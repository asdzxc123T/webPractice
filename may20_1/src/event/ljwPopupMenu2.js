import React, { useEffect, useState } from "react";

const LjwPopupMenu2 = () => {
    const summonPopup = (e) => {
        e.preventDefault(); // 기존 기능 있던 거 막기
    };
    useEffect(() => {
        document.addEventListener("contextmenu", summonPopup);
        document.addEventListener("mouseup", summonMyPopup);
        return () => {
            document.removeEventListener("contextmenu", summonPopup);
            document.removeEventListener("mouseup", summonMyPopup);
        };
    }, []);

    const [popupCss, setPopupCss] = useState({
        position: "fixed",
        top: -200,
        left: -200,
        opacity: 0,
    });
    const summonMyPopup = (e) => {
        if (e.button === 2) {
            setPopupCss({
                ...popupCss,
                top: e.clientY,
                left: e.clientX,
                opacity: 1,
            });
        }
        setTimeout(() => {
            setPopupCss({ ...popupCss, top: -200, left: -200, opacity: 0 });
        }, 3000);
    };

    return (
        <table border={1} style={popupCss}>
            <tr>
                <td>
                    <a href="https://www.naver.com">네이버로</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.google.com">구글로</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.daum.net">다음으로</a>
                </td>
            </tr>
        </table>
    );
};

export default LjwPopupMenu2;
