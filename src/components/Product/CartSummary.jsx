import React from "react";
import { BiMinus } from "react-icons/bi";
import { checkout } from "../../apis/Checkout";
import classNames from "classnames";
import { formatter } from "../../helper/formatter";

const Heading = ({ children }) => (
    <div className="col-span-6 mt-3  md:text-sm lg:text-base">
        <div className="">{children}</div>
    </div>
);

const Price = ({ children, subtract }) => (
    <div className="col-span-6 self-end ml-auto flex gap-2 items-center  md:text-sm lg:text-base">
        {subtract && <BiMinus />} {formatter.format(children)}
    </div>
);

const Divider = ({ light }) => (
    <div
        className={classNames("col-span-full  h-px mt-2", {
            "bg-gray-300": !light,
            "bg-gray-100": light,
        })}></div>
);

function CartSummary({ cart }) {
    const total = cart.reduce(
        (sum, { product, quantity }) => (product ? product.price * quantity + sum : sum),
        0
    );

    const handleCheckout = async (e) => {
        const { data } = await checkout();
        window.location = data.url;
        console.log(data);
    };
    return (
        <div className="shadow-lg rounded-lg p-6 mx-5 md:mr-5 mt-5 md:mt-0">
            <div className="grid grid-cols-12">
                <h2 className="col-span-full font-semibold text-xl">Cart Summary</h2>
                <Divider />
                {cart.map(
                    ({ product, quantity }) =>
                        product && (
                            <React.Fragment key={product._id}>
                                <div className="col-span-full my-4 md:text-sm font-semibold lg:text-base">
                                    {product?.title}
                                </div>
                                <div className="col-span-6 text-sm text-gray-700">
                                    {formatter.format(product?.price)} x {quantity} Qts
                                </div>
                                <div className="col-span-6 self-end ml-auto  md:text-sm lg:text-base">
                                    {formatter.format(product?.price * quantity)}
                                </div>
                                <Divider light="light" />
                            </React.Fragment>
                        )
                )}
                <Heading>Shipping</Heading>
                <Price>40</Price>
                <Heading>Offer Applied</Heading>
                <Price subtract={true}>40</Price>
                <Divider />
                <Heading>Total</Heading>
                <Price>{total}</Price>

                <div className="col-span-full mt-4">
                    <button
                        onClick={handleCheckout}
                        className="w-full rounded-md py-2 bg-black text-white">
                        Procced to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartSummary;
