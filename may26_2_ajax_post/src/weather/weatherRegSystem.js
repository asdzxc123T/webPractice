import React, { useRef, useState } from "react";
import axios from "axios";

const WeatherRegSystem = () => {
    const iconInput = useRef();
    const [weather, setWeather] = useState({ desc: "", temp: "", icon: "" });
    const [weatherRegResult, setWeatherRegResult] = useState({
        result: "",
        desc: "",
        temp: "",
        icon: "",
    });
    const weatherFD = new FormData();
    weatherFD.append("desc", weather.desc);
    weatherFD.append("temp", weather.temp);
    weatherFD.append("icon", weather.icon);

    const changeWeather = (e) => {
        setWeather({ ...weather, [e.target.name]: e.target.value });
    };

    const regWeather = () => {
        axios
            .post("http://localhost:3001/weather.reg", weatherFD, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((res) => {
                setWeatherRegResult(res.data);
                setWeather({ desc: "", temp: "", icon: "" });
                iconInput.current.value = "";
            });
    };

    return (
        <div>
            날씨 :{" "}
            <input value={weather.desc} name="desc" onChange={changeWeather} />
            <br />
            기온 :{" "}
            <input value={weather.temp} name="temp" onChange={changeWeather} />
            <br />
            이미지 :{" "}
            <input
                ref={iconInput}
                type="file"
                name="icon"
                onChange={(e) => {
                    setWeather({ ...weather, icon: e.target.files[0] });
                }}
            />
            <br />
            <button onClick={regWeather}>등록</button>
            <hr />
            <h2>등록 성공 여부 : {weatherRegResult.result}</h2>
            <h2>등록한 날씨 : {weatherRegResult.desc}</h2>
            <h2>등록한 온도 : {weatherRegResult.temp}</h2>
            <h2>등록한 이미지 이름 : {weatherRegResult.icon}</h2>
            <img
                src={`http://localhost:3001/weather.icon.get?icon=${weatherRegResult.icon}`}
                alt=""
            />
        </div>
    );
};

export default WeatherRegSystem;
