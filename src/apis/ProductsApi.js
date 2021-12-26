import http from "./http";

const getAllProducts = () => {
    return http.get("/products");
};

const getProductById = (id) => {
    return http.get(`/products/${id}`);
};

const getAllSellerProducts = () => {
    return http.get("/products/seller");
};

const initProducts = () => {
    return http.post("/products/init");
};

const createProduct = (product) => {
    return http.post("/products", product);
};

const updateProduct = (id, product) => {
    return http.put(`/products/${id}`, product);
};

const deleteProduct = (id) => {
    return http.delete(`/products/${id}`);
};

export {
    getAllProducts,
    getAllSellerProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    initProducts,
};
