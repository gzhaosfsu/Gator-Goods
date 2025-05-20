import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnHome = () => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        background: "none",
        border: "none",
        color: "#004080",
        fontSize: "16px",
        fontWeight: "normal",
        cursor: "pointer",
        padding: 0,
        textDecoration: "underline",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
        transition: "color 0.2s ease"
    };

    const hoverStyle = {
        color: "#002f5f"
    };

    return (
        <div
            style={{
                top: "50%",
                left: "1rem",
                transform: "translateY(-50%)",
            }}
        >
            <button
                onClick={() => navigate("/")}
                style={hover ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                ← Home
            </button>
        </div>
    );
};

export default ReturnHome;
