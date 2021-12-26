import Joi from "joi-browser";

export const type = {
    LOGIN: "LOGIN",
    EMAIL: "EMAIL",
    USER: "USER",
    PASSWORD: "PASSWORD",
    PRODUCT: "PRODUCT",
};

const schema = {
    LOGIN: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    EMAIL: Joi.object({
        email: Joi.string().email().required(),
    }),
    PASSWORD: Joi.object({
        password: Joi.string().required(),
        conformPassword: Joi.ref("password"),
    }),

    USER: Joi.object({
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),
    PRODUCT: Joi.object({
        title: Joi.string().min(5).required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().required(),
        image: Joi.string().required(),
    }),
};

const getErrors = (error) =>
    error.details.reduce((acc, { path, message }) => {
        return { ...acc, [path.join("-")]: message };
    }, {});

export default function validate(type, data) {
    const option = { abortEarly: false };
    const { error } = schema[type]?.validate(data, option);

    if (error) return getErrors(error);

    return {};
}
