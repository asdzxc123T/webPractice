import React, { useState } from "react";
import axios from "axios";

const MenuBBS = () => {
    const [menu, setMenu] = useState({ name: "", price: "" });

    const changeMenu = (e) => {
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const regMenu = () => {
        axios
            .get(
                `http://localhost:3001/menu.reg?name=${menu.name}&price=${menu.price}`
            )
            .then((res) => {
                // sessionStorage : 브라우저 닫을 때까지 쓸 수 있는 공간
                // -> 다른 페이지에서도 사용 가능하게
                sessionStorage.setItem("myJWT", res.data.menuJWT);
                setMenu({ name: "", price: "" });
            });
    };
    const show = () => {
        axios
            .get(
                `http://localhost:3001/menu.get?token=${sessionStorage.getItem(
                    "myJWT"
                )}`
            )
            .then((res) => {
                alert(JSON.stringify(res.data));
            });
        // alert(sessionStorage.getItem("myJWT"));
    };
    const del = () => {
        sessionStorage.removeItem("myJWT");
    };
    const update = () => {
        axios
            .get(
                `http://localhost:3001/menu.update?token=${sessionStorage.getItem(
                    "myJWT"
                )}`
            )
            .then((res) => {
                sessionStorage.setItem("myJWT", res.data.menuJWT);
            });
    };

    return (
        <>
            메뉴명 :{" "}
            <input name="name" value={menu.name} onChange={changeMenu} />
            <br />
            가격 :{" "}
            <input name="price" value={menu.price} onChange={changeMenu} />
            <br />
            <button onClick={regMenu}>등록</button>&nbsp;
            <button onClick={show}>확인</button>&nbsp;
            <button onClick={del}>삭제</button>&nbsp;
            <button onClick={update}>갱신</button>&nbsp;
        </>
    );
};

export default MenuBBS;
