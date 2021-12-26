import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "../components/Navigation";
import { login } from "../redux/actions";

import AuthRoutes from "./AuthRoutes";
import ProductRoutes from "./ProductRoutes";

function AppRoutes() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(login({}));
    }, []);

    return (
        <div>
            <Navigation />
            <AuthRoutes />
            <ProductRoutes />
        </div>
    );
}

export default AppRoutes;
