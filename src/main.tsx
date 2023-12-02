import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/scss/index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./common/contexts/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.Fragment>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </BrowserRouter>
    </React.Fragment>
);
