import React from "react";
import { BiRupee, BiPlus, BiMinus } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { formatter } from "../../helper/formatter";
import Star from "../star";

function SnapshotProduct({ product, action, quantity }) {
    const history = useHistory();
    return (
        <div
            className="flex col-span-full h-fit
        shadow-lg rounded-xl p-4 gap-4
        hover:shadow-2xl">
            <div className="flex-shrink-0">
                <img className="w-28 h-28 object-scale-down " src={product?.image} alt="" />
            </div>
            <div className="flex justify-between  flex-col w-full">
                <div
                    onClick={() => history.push(`/product/${product._id}`)}
                    className="text-xl font-semibold cursor-pointer hover:text-blue-800">
                    {product?.title}
                </div>
                <Star rating={product.rating} />
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <div>Price</div>
                        <div className="flex items-center font-semibold">
                            {formatter.format(product?.price)}{" "}
                            <span className="ml-2 text-sm font-normal">x {quantity} Qts</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={action}
                            className="bg-black text-white px-2 py-2 rounded-md hover:shadow shadow-red-700">
                            Remove From Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SnapshotProduct;
