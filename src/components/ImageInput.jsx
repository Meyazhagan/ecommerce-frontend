import React, { useEffect, useRef, useState } from "react";
import Error from "./Error";

function ImageInput({ name, id, label, formik }) {
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    let inputRef = useRef();

    useEffect(() => {
        setImageUrl(formik.initialValues[name] || "");
    }, [formik.initialValues]);
    const inputError = formik.touched[name] && formik.errors[name];

    if (imageUrl)
        return (
            <div className="flex flex-col">
                <p className="ml-4">{label}</p>
                <div className="border border-gray-500 p-2 mb-1 rounded-md peer">
                    {!error ? (
                        <img
                            src={formik.values[name] || ""}
                            className="h-60 object-scale-down mx-auto"
                            alt="Invalid Url"
                            // onLoad={(e) => console.log(e)}
                            onError={(e) => setError("Invalid Url")}
                        />
                    ) : (
                        <div>{error}</div>
                    )}
                </div>
                <div className="flex justify-between">
                    <Error error={inputError} />
                    <button
                        type="reset"
                        className="ml-auto bg-black text-white px-4 py-2 rounded-md"
                        onClick={(e) => {
                            e.preventDefault();
                            setImageUrl("");
                            // formik.setFieldValue();
                            setError("");
                        }}>
                        Change
                    </button>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col">
            <p className="ml-4">{label}</p>
            <input
                type="text"
                placeholder="Enter Image Url"
                className="rounded-md w-full mb-1"
                ref={inputRef}
                id={id}
                name={name}
                onChange={formik.handleChange}
                value={formik.values[name] || ""}
                onBlur={formik.handleBlur}
            />
            <div className="flex justify-between">
                <Error error={inputError} />
                <button
                    className="ml-auto  bg-black text-white px-4 py-2 rounded-md"
                    onClick={(e) => {
                        e.preventDefault();
                        setImageUrl(inputRef.current.value);
                    }}>
                    Set
                </button>
            </div>
        </div>
    );
}

export default ImageInput;
