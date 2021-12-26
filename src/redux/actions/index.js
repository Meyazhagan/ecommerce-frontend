import { store } from "../../App";

/* Cart Actions  */
export const addToCart = ({ id, payload }) => {
    return { type: "ADD_TO_CART", id, payload };
};
export const removeFromCart = ({ id }) => {
    return { type: "REMOVE_FROM_CART", id };
};

export const setCart = ({ cart }) => {
    return { type: "SET_CART", cart };
};

/* Product Actions  */
export const setProducts = ({ products }) => {
    return { type: "SET_ALL_PRODUCTS", products };
};
export const createProduct = ({ product }) => {
    return { type: "CREATE_PRODUCT", product };
};
export const updateProduct = ({ id, product }) => {
    return { type: "UPDATE_PRODUCT", product, id };
};
export const deleteProduct = ({ id }) => {
    return { type: "DELETE_PRODUCT", id };
};

export const setRelated = ({ id }) => {
    return { type: "SET_RELATED_PRODUCTS", id };
};
export const setCurrent = ({ id, quantity }) => {
    return { type: "SET_CURRENT_PRODUCTS", id, quantity };
};

/*  Order Actions  */
export const setOrders = ({ orders }) => {
    return { type: "SET_ORDERS", orders };
};
export const createOrder = ({ order }) => {
    return { type: "SET_ORDERS", order };
};

/*  Logout Actions  */
export const login = ({ token }) => {
    store.dispatch(setCart({ cart: [] }));
    store.dispatch(setOrders({ orders: [] }));
    return { type: "LOGIN", token };
};

export const logout = () => {
    return { type: "LOGOUT" };
};
