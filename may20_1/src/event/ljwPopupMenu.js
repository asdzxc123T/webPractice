import React from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

// npm install 이름
// yarn add 이름

// yarn add react-contextmenu
const LjwPopupMenu = () => {
    // ContextMenuTrigger 영역에 마우스를 우클릭하면
    //      div는 정식 DOM객체 -> 형체가 있는데
    //      ContextMenuTrigger는 형체가 있는 게 아니라서 css는 의미없는 -> ContextMenuTrigger영역이 어디?(가로 전체...)
    // 같은 id의 ContextMenu가 나옴
    return (
        <div
            style={{
                width: 300,
                height: 300,
                border: "red solid 2px",
            }}
        >
            <ContextMenuTrigger
                id="abc"
                style={{
                    width: 200,
                    height: 200,
                    border: "green solid 2px",
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        border: "black solid 2px",
                    }}
                ></div>
            </ContextMenuTrigger>
            <ContextMenu id="abc" hideOnLeave={true}>
                <MenuItem>
                    <a href="https://www.naver.com">네이버로</a>
                </MenuItem>
                <MenuItem>
                    <a href="https://www.google.com">구글로</a>
                </MenuItem>
            </ContextMenu>
        </div>
    );
};

export default LjwPopupMenu;
