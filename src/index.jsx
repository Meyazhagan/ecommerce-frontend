import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "axios-progress-bar/dist/nprogress.css";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,

    document.getElementById("root")
);
