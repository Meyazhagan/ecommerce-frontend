import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import * as action from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../apis/ProductsApi";
import { getCartProduct } from "../apis/CartApi";
import CreateProduct from "./pages/CreateProduct";
import ProtectedRoutes from "../components/ProtectedRoute";
import SellerProducts from "./pages/SellerProducts";
import EditProduct from "./pages/EditProduct";
import Order from "./pages/Order";
import CreateOrder from "./pages/CreateOrder";

function ProductRoutes() {
    const user = useSelector((s) => s.auth.user);
    const dispatch = useDispatch();

    const fetchCart = async () => {
        const { data } = await getCartProduct();
        const {
            success: { cart },
        } = data;

        dispatch(action.setCart({ cart: cart }));
    };

    const fetchProducts = async () => {
        const { data } = await getAllProducts();
        const {
            success: { product },
        } = data;

        dispatch(action.setProducts({ products: product }));
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/product/:id" exact component={ProductDetails} />
                <ProtectedRoutes
                    path="/orders"
                    component={Order}
                    roles={["BUYER", "SELLER"]}
                    user={user}
                />
                <ProtectedRoutes
                    path="/create-order"
                    roles={["BUYER"]}
                    user={user}
                    component={CreateOrder}
                />
                <ProtectedRoutes
                    path="/products"
                    roles={["SELLER"]}
                    user={user}
                    component={SellerProducts}
                />
                <ProtectedRoutes
                    path="/edit-product/:id"
                    roles={["SELLER"]}
                    user={user}
                    component={EditProduct}
                />
                <ProtectedRoutes
                    path="/create-product"
                    roles={["SELLER"]}
                    user={user}
                    component={CreateProduct}
                />
                <ProtectedRoutes path="/cart" roles={["BUYER"]} user={user} component={Cart} />
            </Switch>
        </>
    );
}

export default ProductRoutes;
