import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { HiShoppingCart } from "react-icons/hi";
import { logout } from "../redux/actions";

function Navigation() {
    const [open, setOpen] = useState(false);
    const user = useSelector((s) => s.auth.user);
    const isLogged = useSelector((s) => s.auth.isLogged);
    const cart = useSelector((s) => s.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => setOpen(false);
    }, []);

    return (
        <div
            className="flex items-center z-10 shadow-md justify-between sm:px-10 
                max-w-full gap-4 sticky left-0 right-0 top-0 bg-white">
            <div className="flex items-center">
                <FcMenu
                    className="flex-shrink-0 mx-4 lg:hidden hover:bg-gray-200 w-10 h-10 p-2 rounded-full active:border-gray-600 active:border-2"
                    onClick={() => setOpen((prev) => !prev)}
                />
                <div className="my-4 whitespace-nowrap">E Commerce Site</div>
            </div>

            {user?.role === "BUYER" && (
                <div className="whitespace-nowrap lg:hidden mr-10">
                    <Link to="/cart" className="flex gap-2 items-center">
                        <HiShoppingCart size={"1.25rem"} />
                        Cart
                        <div className="bg-gray-100 rounded-full px-3 py-1">{cart.length}</div>
                    </Link>
                </div>
            )}

            <div
                className={classNames(
                    "lg:block lg:static lg:rounded-none lg:bg-transparent lg:shadow-none lg:py-0 py-8",
                    {
                        "fixed top-16 bg-white rounded-lg p-4 left-5 shadow-xl": open,
                        hidden: !open,
                    }
                )}>
                <ul className="flex items-start gap-10 lg:flex-row lg:items-center flex-col">
                    <div className="">
                        <form
                            className="flex items-center gap-4 mr-4
                            bg-white w-fit px-2 rounded-md border-gray-400
                            focus:ring-1 hover:ring-1 border">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="bg-transparent border-none
                                focus:ring-0"
                            />
                            <AiOutlineSearch className="text-gray-400" />
                        </form>
                    </div>

                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLogged && (
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    )}
                    {user?.role === "BUYER" && (
                        <li className="whitespace-nowrap hidden lg:block">
                            <Link to="/cart" className="flex gap-2 items-center">
                                <HiShoppingCart size={"1.25rem"} />
                                Cart
                                <div className="bg-gray-100 rounded-full px-3 py-1">
                                    {cart.length}
                                </div>
                            </Link>
                        </li>
                    )}

                    {user?.role === "SELLER" && (
                        <>
                            {" "}
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/create-product">Create Product</Link>
                            </li>
                        </>
                    )}

                    <div className="flex flex-col items-start">
                        <div className="capitalize">{user?.name}</div>
                        {isLogged && (
                            <button
                                className="text-red-500 mt-4 lg:mt-0"
                                onClick={() => {
                                    dispatch(logout());
                                }}>
                                Logout
                            </button>
                        )}
                        {!isLogged && <Link to="/login">Login</Link>}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
