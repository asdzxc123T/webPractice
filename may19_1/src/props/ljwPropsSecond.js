import React from "react";
import PropTypes from "prop-types";

// rafcp
const LjwPropsSecond = (props) => {
    return (
        <>
            <h3>{props.namee}</h3>
            <h3>{props.pricee}</h3>
            <hr />
        </>
    );
};

// isRequired : 자동완성 정도의 느낌
// 나머지는 소스 가독성 수준
// -> 잘 안 쓰는 느낌

LjwPropsSecond.propTypes = {
    namee: PropTypes.string.isRequired, // pt
    pricee: PropTypes.number,
};

export default LjwPropsSecond;
