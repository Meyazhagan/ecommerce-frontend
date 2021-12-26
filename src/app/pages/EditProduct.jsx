import { useFormik } from "formik";
import { pick } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../apis/ProductsApi";
import ProductForm from "../../components/Product/ProductForm";
import Toastify from "../../components/ToastServices";
import validate, { type } from "../../helper/JoiSchemaValidation";
import * as action from "../../redux/actions";

const pickProbs = ["title", "description", "price", "category", "image"];

function EditProduct() {
    const { id } = useParams();

    const history = useHistory();

    const product = useSelector((s) => s.product.current);
    const products = useSelector((s) => s.product.allProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action.setCurrent({ id, quantity: 0 }));
    }, [id, products]);

    useEffect(() => {
        return () => {
            dispatch(action.setCurrent({}));
        };
    }, []);

    const formik = useFormik({
        initialValues: pick(product, pickProbs),
        enableReinitialize: true,
        validate: (v) => validate(type.PRODUCT, v),
        onSubmit: (v) => {
            Toastify(updateProduct(id, v), {
                pending: "Processing Product Update",
                onSuccess: ({ data }) => {
                    const {
                        success: { product },
                    } = data;
                    dispatch(action.updateProduct({ id, product }));
                    history.push("/products");
                    return "Product Updated";
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
            heading={"Edit Product"}
            actionLabel={"Edit Product"}
            secondaryLabel={"Cancel"}
        />
    );
}

export default EditProduct;
