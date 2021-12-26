import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product";
import { getCartProduct, removeFromCart } from "../../apis/CartApi";
import * as action from "../../redux/actions";
import CartSummary from "../../components/Product/CartSummary";
import Toastify from "../../components/ToastServices";
import Back from "../../components/Back";
import { Link } from "react-router-dom";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchCart = async () => {
        const { data } = await getCartProduct();
        const {
            success: { cart },
        } = data;

        dispatch(action.setCart({ cart: cart }));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemoveFromCart = async (id) => {
        Toastify(removeFromCart(id), {
            pending: "Removing From Cart",
            onSuccess: ({ data }) => {
                const {
                    success: { cart },
                } = data;

                dispatch(action.setCart({ cart: cart }));
                return "Removed From Cart";
            },
            onError: (data) => {
                return data?.response?.data?.error || "An Unexpected Error Happended";
            },
        });
    };

    if (cart.length > 0)
        return (
            <>
                <Back />
                <div className="grid grid-cols-12 py-10 grid-flow-row">
                    <div className="col-span-full lg:col-span-8 grid gap-y-10 md:gap-10 mx-5 mt-10 lg:mt-0 xl:mx-10">
                        {cart.map(
                            ({ product, quantity }) =>
                                product && (
                                    <Product
                                        variant={"snapshot"}
                                        key={product?._id}
                                        product={product}
                                        quantity={quantity}
                                        action={() => handleRemoveFromCart(product._id)}
                                    />
                                )
                        )}
                    </div>
                    <div className="lg:col-span-4 lg:row-span-2 col-span-full row-start-1">
                        <CartSummary cart={cart} />
                    </div>
                </div>
            </>
        );

    return (
        <div className="flex h-[calc(100vh-100px)] gap-2 flex-col justify-center items-center">
            <div>No Products In Cart.</div>
            <Link to={"/"}>
                <div
                    className="px-3 py-1 border-2 border-black rounded-lg
                    text-black hover:no-underline
                    hover:bg-black hover:text-white">
                    Continue Shopping
                </div>
            </Link>
        </div>
    );
}

export default Cart;
