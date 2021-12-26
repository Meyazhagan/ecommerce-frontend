import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createOrder } from "../../apis/Checkout";
import * as action from "../../redux/actions";

function CreateOrder() {
    const { search } = useLocation();

    const dispatch = useDispatch();

    const sessionId = new URLSearchParams(search).get("session_id");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const postOrder = async () => {
        try {
            const { data } = await createOrder(sessionId);
            dispatch(action.setCart({ cart: [] }));
        } catch (err) {
            const msg = err?.response?.data?.error;
            setErrorMessage(msg);
        }
        setLoading(false);
    };

    useEffect(() => {
        postOrder();
    }, []);

    return (
        <div className="flex h-[calc(100vh-100px)] gap-2 flex-col justify-center items-center">
            <div>{errorMessage || loading ? "Placing Order..." : "Order Placed"}</div>
            {!loading && (
                <>
                    <Link to={"/orders"}>
                        <div
                            className="px-3 py-1 border-2 border-black rounded-lg
                        text-black hover:no-underline
                        hover:bg-black hover:text-white">
                            View Orders
                        </div>
                    </Link>
                    <Link to={"/"}>
                        <div
                            className="px-3 py-1 border-2 border-black rounded-lg
                        text-black hover:no-underline
                        hover:bg-black hover:text-white">
                            Continue Shopping
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}

export default CreateOrder;
