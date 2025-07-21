import React from "react";
import axios from "axios";

const LjwP3 = () => {
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
    return (
        <>
            <div>LjwP3</div>
            <button onClick={show}>확인</button>
        </>
    );
};

export default LjwP3;
