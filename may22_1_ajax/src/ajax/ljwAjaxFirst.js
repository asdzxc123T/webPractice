import React, { useState } from "react";
import axios from "axios";

// React에는 따로 AJAX 관련 기능이 없어서 vanillaJS의 AJAX 구사해야 하니
// -> AJAX lib를 사용
// -> axios

// yarn add axios
const LjwAjaxFirst = () => {
    const [weather, setWeather] = useState({w:"", t: "", h: ""});
    // 동기식 통신
    // const getWeather = async () => {
    //     await axios.get(
    //         "https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=baff8f3c6cbc28a4024e336599de28c4&units=metric&lang=kr"
    //     ).then(() => {
    //         alert("이게 먼저");
    //     });
    //     alert("이게 나중");
    // }
    const getWeather = () => {
        // GET방식 AJAX
        // axios.get(요청주소).then(콜백함수);
        axios
            .get(
                "https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=baff8f3c6cbc28a4024e336599de28c4&units=metric&lang=kr"
            )
            .then((res) => {
                // 받아온 내용 : res.data
                setWeather({w: res.data.weather[0].description, t: res.data.main.temp, h: res.data.main.humidity});
            });
    };
    return (
        <>
            <h2>날씨 : {weather.w}</h2>
            <h2>기온 : {weather.t}</h2>
            <h2>습도 : {weather.h}</h2>
            <button onClick={getWeather}>날씨 업데이트</button>
        </>
    );
};

export default LjwAjaxFirst;
