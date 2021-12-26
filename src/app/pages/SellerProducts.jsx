import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatter } from "../../helper/formatter";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useHistory } from "react-router-dom";
import * as action from "../../redux/actions";
import { deleteProduct, initProducts } from "../../apis/ProductsApi";
import Toastify from "../../components/ToastServices";

function SellerProducts() {
    const products = useSelector((s) => s.product.allProducts);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        Toastify(deleteProduct(id), {
            pending: "Processing Product Delete",
            onSuccess: (data) => {
                console.log(data);
                dispatch(action.deleteProduct({ id }));
                return "Product Deleted";
            },
            onError: (data) => {
                formik.setErrors(data?.response?.data?.errors || {});
                return data?.response?.data?.error || "An Unexpected Error Happended";
            },
        });
    };

    const handleGenerateProduct = (id) => {
        Toastify(initProducts(), {
            pending: "Generating Products",
            onSuccess: ({ data }) => {
                const { product } = data;
                dispatch(action.setProducts({ products: product }));
                return "Products Generated";
            },
            onError: (data) => {
                formik.setErrors(data?.response?.data?.errors || {});
                return data?.response?.data?.error || "An Unexpected Error Happended";
            },
        });
    };

    return (
        <div className="overflow-hidden px-10 py-4">
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => history.push("/create-product")}
                    className="px-2 py-2 rounded shadow bg-black text-white">
                    Create product
                </button>

                {products.length <= 0 && (
                    <button
                        onClick={handleGenerateProduct}
                        className="px-2 py-2 rounded shadow bg-black text-white">
                        Generate product
                    </button>
                )}
            </div>
            <div
                className="overflow-scroll overscroll-none h-[calc(100vh-150px)] 
                scrollbar-track-transparent scrollbar-thumb-gray-400 
                scrollbar-thin">
                <table className="w-full">
                    <thead>
                        <tr className="sticky top-0 left-0 right-0 bg-white shadow-md">
                            <th className="pb-4">#</th>
                            <th className="capitalize pb-4">image</th>
                            <th className="capitalize pb-4">title</th>
                            <th className="capitalize pb-4">description</th>
                            <th className="capitalize pb-4">price</th>
                            <th className="capitalize pb-4">category</th>
                            <th className="capitalize pb-4">Action</th>
                            <th className="capitalize pb-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr className="border-b-2" key={product._id}>
                                <td className="p-4">{index + 1}</td>
                                <td className="p-2">
                                    <div className="border h-20 w-20 rounded-md border-gray-400 flex justify-center items-center">
                                        <img
                                            src={product.image}
                                            alt="..aa"
                                            className="h-14 w-14 object-contain"
                                        />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="max-w-[45ch] text-sm font-semibold">
                                        {product.title}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-justify text-sm max-w-[45ch]">
                                        {product.description}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm">{formatter.format(product.price)}</div>
                                </td>
                                <td className="p-4 capitalize">{product.category}</td>
                                <td>
                                    <button
                                        onClick={() => history.push(`/edit-product/${product._id}`)}
                                        className="px-3 py-2 rounded-md text-green-600 shadow bg-white hover:shadow-lg">
                                        <MdModeEditOutline className="text-xl" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-3 py-2 mx-2 rounded-md text-red-600 shadow bg-white hover:shadow-lg">
                                        <MdDelete className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SellerProducts;
