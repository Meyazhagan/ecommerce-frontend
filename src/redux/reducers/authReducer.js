import jwt_decoder from "jwt-decode";
import { getToken, removeToken, setToken } from "../../helper/LocalStorage";
import { store } from "../../App";
import { setCart, setOrders } from "../actions";

const initialValues = {
    isLogged: false,
    user: null,
};

const login = (action) => {
    try {
        const token = action.token || getToken();
        const user = jwt_decoder(token);
        setToken(token);
        return {
            isLogged: true,
            user,
        };
    } catch (err) {
        removeToken();
        console.log(err);
        return initialValues;
    }
};

const authReducer = (state = initialValues, action) => {
    switch (action.type) {
        case "LOGIN":
            return login(action);

        case "LOGOUT": {
            removeToken();
            return initialValues;
        }

        default:
            return state;
    }
};

export default authReducer;
