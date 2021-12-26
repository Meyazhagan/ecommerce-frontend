import React from "react";
import Star from "../star";
import { formatter } from "../../helper/formatter";

function DefaultProduct({ product, action }) {
    return (
        <div
            key={product?._id}
            onClick={action}
            className="flex
            col-span-full md:col-span-6 xl:col-span-4
            shadow-lg rounded-xl p-4 gap-4
            hover:shadow-2xl cursor-pointer">
            <div className="flex-shrink-0 flex flex-col justify-between">
                <img
                    className="w-32 h-32 object-contain"
                    src={product?.image}
                    alt={product?.title}
                />
                <button
                    className="bg-yellow-400 p-1 px-2
                    rounded-md hover:shadow-lg">
                    Buy Now
                </button>
            </div>
            <div className="flex-grow grid grid-rows-[minmax(0,1fr)_repeat(3,minmax(0,60px))] pr-4">
                <div className="self-start overflow-x-auto">{product?.title}</div>
                <div className="self-center flex justify-between items-center">
                    <div className="flex items-center">{formatter.format(product.price)}</div>
                </div>
                <div className="self-center">
                    <Star rating={product?.rating} />
                </div>
                <div className="self-end mx-auto w-fit py-1 px-4 text-sm capitalize rounded-xl shadow-lg">
                    {product?.category}
                </div>
            </div>
        </div>
    );
}

export default DefaultProduct;
