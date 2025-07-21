import React, { useRef, useState } from "react";
import axios from "axios";

const LjwAjaxPostSecond = () => {
    const [photo, setPhoto] = useState({ title: "", photo: "" });
    const [result, setResult] = useState({ title: "", file: "" });
    const photoInput = useRef(); // file타입 input은 value를 안 쓰니

    const changePhoto = (e) => {
        // 파일의 유효성 검사라면 : e.target.value
        // 파일의 경우 여러개 선택도 되고, 객체형태로 받기도 해야 하니 : e.target.files[0]
        if (e.target.name === "photo") {
            setPhoto({ ...photo, [e.target.name]: e.target.files[0] });
        } else {
            setPhoto({ ...photo, [e.target.name]: e.target.value });
        }
    };

    const fd = new FormData();
    fd.append("photo", photo.photo);
    fd.append("title", photo.title);

    const uploadPhoto = () => {
        // 기존 방식으로는 파일 인코딩이 불가하니, 인코딩 방식을 바꿔야야
        axios
            .post(`http://localhost:3001/photo.upload`, fd, {
                headers: {"Content-type":"multipart/form-data"},
                withCredentials: true,
            })
            .then((res) => {
                setResult(res.data);
                setPhoto({ title: "", photo: "" });
                photoInput.current.value = "";
            });
    };

    return (
        <div>
            제목 :{" "}
            <input value={photo.title} name="title" onChange={changePhoto} />{" "}
            <br />
            사진 :{" "}
            <input
                ref={photoInput}
                type="file"
                name="photo"
                onChange={changePhoto}
            />{" "}
            <br />
            <button onClick={uploadPhoto}>업로드</button>
            <h2>업로드한 거 제목 : {result.title}</h2>
            <h2>업로드한 거 이미지명 : {result.file}</h2>
        </div>
    );
};

export default LjwAjaxPostSecond;
