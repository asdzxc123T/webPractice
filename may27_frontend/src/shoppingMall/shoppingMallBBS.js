import React, { useEffect, useRef, useState } from "react";
import smbmc from "./shoppingMallBBS.module.css";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3002");

const ShoppingMallBBS = () => {
    const imageInput = useRef();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        desc: "",
        image: "",
    });
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const productTrs = products.map((p, i) => {
        return (
            <tr>
                <td align="center">
                    <img
                        src={`http://localhost:3001/product.image.get?image=${p.image}`}
                        alt=""
                        width={100}
                        height={100}
                    />
                </td>
                <td align="center">{p.name}</td>
                <td align="center">{p.price}원</td>
                <td className={smbmc.productDescTd} align="center">
                    {p.desc}
                </td>
                <td>
                    <button
                        onClick={() => {
                            axios
                                .get(
                                    `http://localhost:3001/product.delete?name=${p.name}&image=${p.image}`
                                )
                                .then(() => {
                                    socket.emit("updateTable", {});
                                });
                        }}
                    >
                        삭제
                    </button>
                </td>
            </tr>
        );
    });
    
    const scrollEvent = () => {
        const htmlHeight = document.documentElement.scrollHeight;
        const browserHeight = window.innerHeight;
        const scrollOffset = window.scrollY;
        const scrollOffsetBottom = scrollOffset + browserHeight;
        if (scrollOffsetBottom >= htmlHeight - 10) {
            setPage(page + 1); // state 바꾸고
            // 다음 페이지 불러오려고 해도 page는 1(비동기식이라서)
        }
    };

    const getFirstPage = () => {
        axios
            .get(`http://localhost:3001/product.get.all?page=1`)
            .then((res) => {
                setProducts(res.data.products);
            });
    };

    useEffect(() => {
        // alert(page)
        window.removeEventListener("scroll", scrollEvent);
        axios
            .get(`http://localhost:3001/product.get.all?page=${page}`)
            .then((res) => {
                setProducts(products.concat(res.data.products));
                window.addEventListener("scroll", scrollEvent);
            });
    }, [page]); // page값이 바뀌면

    useEffect(() => {
        getFirstPage();
        window.addEventListener("scroll", scrollEvent);

        socket.on("updateTableConfirm", async (x) => {
            await window.scrollTo(0, 0);
            await setPage(1);
            setProducts([])
            axios
                .get("http://localhost:3001/product.get.all?page=1")
                .then((res) => {
                    setProducts(res.data.products);
                });
        });

        return () => {
            window.removeEventListener("scroll", scrollEvent);
            socket.off("updateTableConfirm");
        };
    }, []);

    const productFD = new FormData();
    productFD.append("name", product.name);
    productFD.append("price", product.price);
    productFD.append("desc", product.desc);
    productFD.append("image", product.image);

    const changeProduct = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const regProduct = () => {
        axios
            .post(`http://localhost:3001/product.reg?`, productFD, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((res) => {
                socket.emit("updateTable", {});
                setProduct({
                    name: "",
                    price: "",
                    desc: "",
                    image: "",
                });
                imageInput.current.value = "";
            });
    };

    return (
        <div>
            <table id="regTbl">
                <tr>
                    <td align="center">
                        <input
                            name="name"
                            value={product.name}
                            onChange={changeProduct}
                            placeholder="상품명"
                            autoComplete="off"
                            maxLength={20}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input
                            name="price"
                            value={product.price}
                            onChange={changeProduct}
                            placeholder="가격"
                            autoComplete="off"
                            maxLength={6}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <textarea
                            name="desc"
                            value={product.desc}
                            onChange={changeProduct}
                            placeholder="설명"
                            autoComplete="off"
                            maxLength={200}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input
                            name="image"
                            ref={imageInput}
                            type="file"
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    image: e.target.files[0],
                                });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button onClick={regProduct}>등록</button>
                    </td>
                </tr>
            </table>
            <hr />
            <table border={1}>
                <tr>
                    <th>사진</th>
                    <th>이름</th>
                    <th>가격</th>
                    <th>설명</th>
                </tr>
                {productTrs}
            </table>
        </div>
    );
};

export default ShoppingMallBBS;
