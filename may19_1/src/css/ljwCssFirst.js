import React from "react";
import PropTypes from "prop-types";

// CSS
//  JS 객체 형태
//  낙타체
//  값이
//      정식으로 숫자가 오면 단위 안 붙어도 됨
//      글자로 들어오면 단위가 붙어야
const LjwCssFirst = (props) => {
    const tblDesign = {
        color : props.c,
        backgroundColor : props.bgc,
        width : props.w,
    }

    return (
        <>
            <table border={1} style={tblDesign}>
                <tr>
                    <td>{props.bgc}</td>
                </tr>
                <tr>
                    <td>{props.c}</td>
                </tr>
            </table>
        </>
    );
};

// 기능적 의미를...
LjwCssFirst.propTypes = {
    c : PropTypes.string.isRequired,
    bgc : PropTypes.string.isRequired,
    w : PropTypes.number.isRequired,
}

export default LjwCssFirst;
