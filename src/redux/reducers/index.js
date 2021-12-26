import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";

const reducer = combineReducers({
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
    auth: authReducer,
});

export default reducer;
