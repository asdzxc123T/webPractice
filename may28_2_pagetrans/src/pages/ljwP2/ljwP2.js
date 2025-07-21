import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LjwP2 = () => {
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
    return (
        <>
            <div>LjwP2</div>
            <a href="/p3.go">p3으로</a>&nbsp;
            <Link to="/p3.go">p3으로</Link>
            <br />
            메뉴명 :{" "}
            <input name="name" value={menu.name} onChange={changeMenu} />
            <br />
            가격 :{" "}
            <input name="price" value={menu.price} onChange={changeMenu} />
            <br />
            <button onClick={regMenu}>등록</button>&nbsp;
        </>
    );
};

export default LjwP2;
