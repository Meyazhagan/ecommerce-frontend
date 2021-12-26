import classNames from "classnames";
import React from "react";
import ImageInput from "../../components/ImageInput";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Textarea from "../../components/TextArea";
import { useHistory } from "react-router-dom";

function ProductForm({ formik, heading, actionLabel, secondaryLabel }) {
    const history = useHistory();

    return (
        <div
            className="flex items-center flex-col lg:w-8/12 lg:mx-auto mx-10 my-10
            shadow-lg rounded-lg p-6 relative bg-white md:flex-row">
            <form className=" sm:w-6/12 w-full mx-auto ">
                <h2 className="text-center mb-10 text-black font-semibold text-2xl font-mono">
                    {heading}
                </h2>
                <ImageInput name={"image"} id="image" label="Image" formik={formik} />
                <Input name="title" id="title" label="Title" formik={formik} />
                <Textarea name="description" id="description" label="Description" formik={formik} />
                <Input
                    type="number"
                    name="price"
                    id="price"
                    label="Price"
                    min="1"
                    formik={formik}
                />
                <Select name="category" id="category" label="Category" formik={formik}>
                    {["men's clothing", "women's clothing", "Electronics", "Fashion"].map((e) => (
                        <option key={e} value={e}>
                            {e}
                        </option>
                    ))}
                </Select>
                <div className="flex flex-row-reverse gap-4">
                    <button
                        onClick={formik.handleSubmit}
                        disabled={!formik.isValid}
                        type="submit"
                        className={classNames("bg-black text-white px-4 py-2 rounded-md", {
                            "opacity-100": formik.isValid,
                            "opacity-50": !formik.isValid,
                        })}>
                        {actionLabel}
                    </button>
                    <button
                        onClick={() => history.push("/products")}
                        type="submit"
                        className="border-black border text-black px-4 py-2 rounded-md hover:bg-black hover:text-white">
                        {secondaryLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
