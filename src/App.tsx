import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { AlertProvider } from "./contexts/alert.context";

import Notes from "./pages/Notes";
import RouterBase from "./components/common/RouterBase";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <AlertProvider>
            <Router>
                <Routes>
                    <Route Component={RouterBase}>
                        <Route Component={Notes} path="/" />
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </AlertProvider>
    )
}