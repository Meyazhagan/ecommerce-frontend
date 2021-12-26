import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import React from "react";
import ProductForm from "../../components/Product/ProductForm";
import Toastify from "../../components/ToastServices";
import { createProduct } from "../../apis/ProductsApi";
import { useDispatch } from "react-redux";
import * as action from "../../redux/actions";
import validate, { type } from "../../helper/JoiSchemaValidation";

function CreateProduct() {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 1,
            category: "",
            image: "",
        },
        validate: (v) => validate(type.PRODUCT, v),
        onSubmit: (v) => {
            Toastify(createProduct(v), {
                pending: "Processing New Product",
                onSuccess: ({ data }) => {
                    const {
                        success: { product },
                    } = data;
                    dispatch(action.createProduct({ product }));
                    history.push("/products");
                    return "Created new product";
                },
                onError: (data) => {
                    formik.setErrors(data?.response?.data?.errors || {});
                    return data?.response?.data?.error || "An Unexpected Error Happended";
                },
            });
        },
    });
    return (
        <ProductForm
            formik={formik}
            heading={"Create Product"}
            actionLabel={"Create Product"}
            secondaryLabel={"Cancel"}
        />
    );
}

export default CreateProduct;
