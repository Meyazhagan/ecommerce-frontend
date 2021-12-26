import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import VerifyUser from "./auth/VerifyUser";
import Register from "./auth/Register";
import ResendVerification from "./auth/ResendVerification";
import ForgotPassword from "./auth/Forgot";
import ResetPassword from "./auth/Reset";

function AuthRoutes() {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password/:token" exact component={ResetPassword} />
            <Route path="/resend-verification" exact component={ResendVerification} />
            <Route path="/verify-user/:token" exact component={VerifyUser} />
        </Switch>
    );
}

export default AuthRoutes;
