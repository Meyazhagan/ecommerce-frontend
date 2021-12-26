import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getToken } from "../helper/LocalStorage";

function ProductedRoute({ path, component: Component, user, roles, ...rest }) {
    const isLogged = useSelector((s) => s.auth.isLogged);

    return (
        <Route
            path={path}
            render={(props) => {
                if (!isLogged && !getToken()) {
                    return <Redirect to="/login" />;
                } else if (roles && !checkUser(user, roles)) {
                    return (
                        <div className="flex h-[calc(100vh-100px)] gap-2 justify-center items-center flex-col">
                            <div>You Does Not Have Access to this Route</div>
                            <div>Try Login Again</div>
                            <Link
                                to={"/login"}
                                className="px-3 py-1 border-2 border-black rounded-md 
                                hover:bg-black hover:text-white">
                                Login
                            </Link>
                        </div>
                    );
                }

                return <Component {...props} />;
            }}
            {...rest}
        />
    );
}

function checkUser(user, roles) {
    return roles.findIndex((role) => role === user?.role) !== -1;
}

ProductedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
};

export default ProductedRoute;
