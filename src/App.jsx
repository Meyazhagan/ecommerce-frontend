import React from "react";
import { BrowserRouter } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AppRoutes from "./app/AppRoutes";
import reducer from "./redux/reducers";

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.get

loadProgressBar();

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppRoutes />
                <ToastContainer position="bottom-right" theme="dark" />
            </Provider>
        </BrowserRouter>
    );
}

export default App;
