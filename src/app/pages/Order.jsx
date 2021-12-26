import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../apis/Checkout";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions";
import { formatter } from "../../helper/formatter";

function Order() {
    const dispatch = useDispatch();
    const orders = useSelector((s) => s.order);

    const fetchOrders = async () => {
        try {
            const { data } = await getOrders();
            const {
                success: { orders },
            } = data;
            dispatch(action.setOrders({ orders }));
        } catch (e) {}
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    if (orders.length > 0)
        return (
            <div className="overflow-hidden px-10 py-4">
                <div className="text-xl font-semibold py-2 px-3">Orders </div>
                <div
                    className="overflow-scroll overscroll-none h-[calc(100vh-150px)] 
                    scrollbar-track-transparent scrollbar-thumb-gray-400 
                    scrollbar-thin">
                    <table className="w-full">
                        <thead>
                            <tr className="sticky top-0 left-0 right-0 bg-white shadow-md">
                                <th className="pb-4">#</th>
                                <th className="capitalize pb-4">Name</th>
                                <th className="capitalize pb-4">Payment Made By</th>
                                <th className="capitalize pb-4">Total Amount</th>
                                <th className="capitalize pb-4">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(({ user, paymentId, email, _id, totalAmount }, index) => (
                                <tr className="border-b-2" key={_id}>
                                    <td className="p-4 text-center">{index + 1}</td>
                                    <td className="p-4">
                                        <div className="max-w-[45ch] text-center text-sm font-semibold capitalize">
                                            {user.firstName}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-center text-sm max-w-[45ch]">
                                            {email}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-center">
                                            {formatter.format(totalAmount / 100)}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-center">{paymentId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    return (
        <div className="flex h-[calc(100vh-100px)] gap-2 flex-col justify-center items-center">
            <div>No Orders Present.</div>
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

export default Order;
