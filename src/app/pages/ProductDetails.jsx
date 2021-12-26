import React, { useEffect, useRef } from "react";
import Products from "./Products";
import Product from "../../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as action from "../../redux/actions";
import { getQuantityForProduct } from "../../helper/productHelper";
import { addToCart } from "../../apis/CartApi";
import Toastify from "../../components/ToastServices";
import { toast } from "react-toastify";
import Back from "../../components/Back";

// import {window} from "react-use"

function ProductDetails() {
    const { id } = useParams();

    const product = useSelector((s) => s.product.current);
    const products = useSelector((s) => s.product.allProducts);
    const auth = useSelector((s) => s.auth);
    const cart = useSelector((s) => s.cart);
    const dispatch = useDispatch();

    const topRef = useRef();

    useEffect(() => {
        const quantity = getQuantityForProduct(cart, id);
        dispatch(action.setCurrent({ id, quantity }));
        dispatch(action.setRelated({ id }));
    }, [id, products, cart]);

    useEffect(() => {
        // console.log(topRef.current);
        // topRef.current.scrollIntoView();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    useEffect(() => {
        return () => {
            dispatch(action.setCurrent({}));
            dispatch(action.setRelated({}));
        };
    }, []);

    const isValid = auth.isLogged && auth.user?.role === "BUYER";

    const handleAddToCart = async ({ id, quantity }) => {
        if (!isValid) {
            return toast.error(`Not Accessed To Add in Cart. Try Login Again`);
        }

        console.log(id, quantity);
        const payload = { product, quantity };

        Toastify(addToCart({ id, quantity }), {
            pending: "Adding to Cart",
            onSuccess: ({}) => {
                dispatch(action.addToCart({ id, payload }));
                return "Added To Cart";
            },
            onError: (data) => {
                return data?.response?.data?.error || "An Unexpected Error Happended";
            },
        });
    };
    return (
        <div ref={topRef}>
            <Back />
            <Product
                product={product}
                variant={"detailed"}
                action={handleAddToCart}
                isValid={isValid}
            />
            <h2 className="text-xl m-10">Related Products</h2>
            <Products />
        </div>
    );
}

export default ProductDetails;
