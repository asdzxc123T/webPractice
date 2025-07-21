import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const { kakao } = window;
let latLng = { lat: 37.5693582, lng: 126.9858652 };
let map;
let marker;
let roadview;
let rvManager;

const Map = () => {
    const id = useSelector((s) => s.lus.id);
    const loggedIn = useSelector((s) => s.lus.loggedIn);

    const [whats, setWhats] = useState([]);

    const whatsTbls = whats.map((w, i) => {
        return (
            <table align="center" border={1}>
                <tr>
                    <th>{w.place_name}</th>
                </tr>
                <tr>
                    <td align="center">{w.address_name}</td>
                </tr>
                <tr>
                    <td align="right">{w.distance}m</td>
                </tr>
                <tr>
                    <td align="right">{w.phone}</td>
                </tr>
            </table>
        );
    });

    useEffect(() => {
        const mapArea = document.getElementById("map");
        const position = new kakao.maps.LatLng(latLng.lat, latLng.lng);
        map = new kakao.maps.Map(mapArea, {
            center: position,
            level: 3,
        });

        const rvArea = document.getElementById("roadview");
        roadview = new kakao.maps.Roadview(rvArea);
        rvManager = new kakao.maps.RoadviewClient();
        rvManager.getNearestPanoId(position, 50, function (panoId) {
            roadview.setPanoId(panoId, position);
        });

        marker = new kakao.maps.Marker({
            position: position,
        });
        marker.setMap(map);
    }, []);

    const searchPlace = (e) => {
        if (e.keyCode === 13) {
            const searchTxt = e.target.value;
            e.target.value = "";
            axios
                .get(
                    `https://dapi.kakao.com/v2/local/search/address.json?query=${searchTxt}`,
                    {
                        headers: {
                            Authorization:
                                "KakaoAK e0bd46d9aea988808701f213a835bd46",
                        },
                    }
                )
                .then((res) => {
                    if (res.data.documents.length) {
                        latLng = {
                            lat: res.data.documents[0].y,
                            lng: res.data.documents[0].x,
                        };
                        const moveLoc = new kakao.maps.LatLng(
                            res.data.documents[0].y,
                            res.data.documents[0].x
                        );
                        map.setCenter(moveLoc);
                        marker.setPosition(moveLoc);
                        rvManager.getNearestPanoId(
                            moveLoc,
                            50,
                            function (panoId) {
                                roadview.setPanoId(panoId, moveLoc);
                            }
                        );
                    }
                    else {
                        alert("존재하지 않음")
                    }
                });
        }
    };

    const searchWhat = (e) => {
        const searchTxt = e.target.value;
        axios
            .get(
                `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latLng.lat}&x=${latLng.lng}&radius=500&query=${searchTxt}`,
                {
                    headers: {
                        Authorization:
                            "KakaoAK e0bd46d9aea988808701f213a835bd46",
                    },
                }
            )
            .then((res) => {
                setWhats(res.data.documents);
            });
    };

    return (
        <div className="kakao-map-container">
            <table align="center" style={{ width: "100%" }}>
                <tr>
                    <th
                        colSpan={2}
                        style={{ backgroundColor: "lightgray", padding: "5px" }}
                    >
                        지도
                    </th>
                </tr>
                <tr>
                    <td align="right">
                        <div
                            id="map"
                            style={{ width: "500px", height: "400px" }}
                        ></div>
                    </td>
                    <td align="left">
                        <div
                            id="roadview"
                            style={{ width: "500px", height: "400px" }}
                        ></div>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <input
                            id="place"
                            placeholder="장소"
                            autoComplete="off"
                            onKeyUp={searchPlace}
                        />
                    </td>
                    <td align="left">
                        <input
                            id="what"
                            placeholder="뭐"
                            autoComplete="off"
                            onKeyUp={searchWhat}
                        />
                    </td>
                </tr>
            </table>
            <div id="list" align="center">
                {whatsTbls}
            </div>
        </div>
    );
};

export default Map;
