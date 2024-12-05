import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignUp from "../Components/Authentication/LoginSign/LoginSignUp";

const Authentication = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return <LoginSignUp />;
};

export default Authentication;

