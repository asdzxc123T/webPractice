import React from "react";
import { Navigate } from "react-router-dom";

const LjwP6 = () => {
    // redirect(강제 이동)
    if (Math.random() > 0.5) {
        return <Navigate to="/p7.go" replace />;
    }

    return <div>LjwP6</div>;
};

export default LjwP6;
