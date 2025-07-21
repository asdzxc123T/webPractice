import React from "react";
import { Link, Outlet } from "react-router-dom";

const SiteLayout = () => {
    return (
        <>
            <table
                style={{ width: 1200, marginLeft: "auto", marginRight: "auto" }}
                border={1}
            >
                <tr>
                    <td>
                        <h1>May29</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Link to="/">홈</Link>&nbsp;&nbsp;
                        <Link to="/gallery.go">갤러리</Link>&nbsp;&nbsp;
                        <Link to="/notice.go">공지사항</Link>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Outlet />
                    </td>
                </tr>
            </table>
        </>
    );
};

export default SiteLayout;
