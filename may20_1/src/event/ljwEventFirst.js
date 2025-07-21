import React, { useState } from "react";

const LjwEventFirst = () => {
    const [human, setHuman] = useState({
        name: "",
        height: "",
        weight: "",
        bmi: "",
        res: "",
    });

    const calc = () => {
        let tempBmi = human.weight / (human.height / 100) ** 2;
        if (tempBmi >= 35)
            setHuman({ ...human, bmi: tempBmi, res: "3단계 비만" });
        else if (tempBmi >= 30)
            setHuman({ ...human, bmi: tempBmi, res: "2단계 비만" });
        else if (tempBmi >= 25)
            setHuman({ ...human, bmi: tempBmi, res: "1단계 비만" });
        else if (tempBmi >= 23)
            setHuman({ ...human, bmi: tempBmi, res: "과체중" });
        else if (tempBmi >= 18.5)
            setHuman({ ...human, bmi: tempBmi, res: "정상" });
        else setHuman({ ...human, bmi: tempBmi, res: "저체중" });
    };

    const change = (e) => {
        // e.target : 이벤트가 발생한 객체
        // e.target.value : 그 input의 내용
        // e.target.name : 그 input의 이름
        setHuman({ ...human, [e.target.name]: e.target.value * 1 });
    };

    return (
        <div>
            이름 :{" "}
            <input
                name="name"
                value={human.name}
                onChange={(e) => {
                    setHuman({ ...human, name: e.target.value });
                }}
            />{" "}
            <br />키 :{" "}
            <input name="height" value={human.height} onChange={change} />
            cm
            <br />
            몸무게 :{" "}
            <input name="weight" value={human.weight} onChange={change} />
            kg
            <br />
            <button onClick={calc}>계산</button>
            <hr />
            <div>
                BMI : {human.bmi}
                <br />
                결과 : {human.res}
            </div>
        </div>
    );
};

export default LjwEventFirst;
