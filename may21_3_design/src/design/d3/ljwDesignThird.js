import React, { useEffect } from "react";
import ldtmc from "./ldt.module.css";

const LjwDesignThird = () => {
    useEffect(() => {
        const h = 180;
        const w = 80;

        alert(`키: ${h}cm, 몸무게: ${w}kg`);
    }, []);

    return <div className={`${ldtmc.c} ${ldtmc.bgc} ${ldtmc.f}`}>LjwDesignThird</div>;
};

export default LjwDesignThird;
