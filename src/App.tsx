import { Navigate, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./common/pages";
import { PrivateRoute } from "./common/routes";
import { HomePage } from "./features/home";
import { TerminalFeature } from "./features/terminal";

function App() {
    return (
        <main className="main">
            <Routes>
                {/* Features */}
                <Route path="/terminal/*" element={<PrivateRoute element={<TerminalFeature />} />} />
                {/* Error */}
                <Route path="/404" element={<PageNotFound />} />

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<Navigate to={"/404"} replace />} />
            </Routes>
        </main>
    );
}

export default App;
