import axios from "axios";
import { store } from "../App";
import { logout } from "../redux/actions";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use((config) => {
    config.headers.auth_token = localStorage.getItem("token");
    return config;
});

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response?.data?.error === "Invalid Auth Token") {
            store.dispatch(logout());
            window.location("/");
        }
        return Promise.reject(err);
    }
);

const methods = {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
};

export default methods;
