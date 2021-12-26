import http from "./http";

const checkout = () => {
    return http.get("/checkout");
};

const createOrder = (sessionId) => {
    return http.post(`/checkout/create-order?session_id=${sessionId}`);
};

const getOrders = () => {
    return http.get("/checkout/orders");
};

export { checkout, createOrder, getOrders };
