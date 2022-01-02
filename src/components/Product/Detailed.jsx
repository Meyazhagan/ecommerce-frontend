import React, { useEffect, useState } from "react";
import Star from "../../components/star";
import { HiMinus, HiPlus } from "react-icons/hi";
import { formatter } from "../../helper/formatter";
import { useSelector } from "react-redux";

function DetailedProduct({ product, action, isValid }) {
    console.log(product.quantity);
    const [quantityState, setQuantity] = useState(product?.quantity || 0);

    useEffect(() => {
        setQuantity(product?.quantity || 0);
    }, [product]);
    return (
        <div className="grid grid-cols-12 p-6">
            <div className="col-span-full md:col-span-4 mb-6 mx-auto flex flex-col justify-between">
                <img className="md:w-48 w-32 h-48 object-contain" src={product?.image} alt="" />
            </div>
            <div className="col-span-full md:col-span-8 grid-flow-row grid gap-4">
                <div className="text-xl font-semibold">{product?.title}</div>

                <div className="flex justify-start items-center">
                    <Star rating={product?.rating} />
                    <div className="mx-4 w-fit py-1 px-4 text-sm capitalize rounded-xl shadow-lg">
                        {product?.category}
                    </div>
                </div>
                <div className="flex justify-start flex-col sm:flex-row md:items-start gap-5">
                    <div className="flex-shrink-0 flex sm:block">
                        <div>
                            <div className="text-sm text-gray-700">Price</div>
                            <div className="flex items-center text-xl font-semibold mb-5">
                                {formatter.format(product?.price || 0)}
                            </div>
                        </div>
                        <div className="flex items-start flex-col w-fit ml-10 sm:ml-0">
                            {quantityState ? (
                                <div className="flex gap-3 justify-between items-center w-full">
                                    <button
                                        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                                        className="bg-slate-900 text-white px-2 py-2 rounded shadow-xl group">
                                        <HiMinus className="group-active:border-2 border-transparent" />
                                    </button>
                                    <div className="text-black">{quantityState}</div>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="bg-slate-900 text-white px-2 py-2 rounded shadow-xl group">
                                        <HiPlus className="group-active:border-2 border-transparent" />
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                            <button
                                onClick={() => {
                                    action({ id: product?._id, quantity: quantityState || 1 });
                                    !quantityState && isValid && setQuantity(1);
                                }}
                                className="bg-slate-900 text-white px-4 py-2 mt-4 rounded shadow-lg">
                                {quantityState ? "Add More" : "Add To Cart"}
                            </button>
                        </div>
                    </div>
                    <div className="text text-gray-700 text-justify self-center max-w-[45ch] sm:mx-auto">
                        {product?.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedProduct;
