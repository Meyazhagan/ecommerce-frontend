import http from "./http";

const getCartProduct = () => {
    return http.get("/cart/items");
};
const addToCart = ({ id, quantity }) => {
    return http.patch("/cart/add", { product: id, quantity });
};
const removeFromCart = (product) => {
    return http.patch("/cart/remove", { product });
};

export { getCartProduct, addToCart, removeFromCart };
