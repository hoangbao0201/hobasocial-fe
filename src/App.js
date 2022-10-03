import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import publicRouter from "./routes";

function App() {
    return (
        <Router>
            <Routes>
                {publicRouter.map((route, index) => {
                    const Page = route.component;

                    var Layout = ({ children }) => {
                        return <>{children}</>;
                    };
                    if (route.layout) {
                        Layout = ({ children }) => {
                            return <route.layout>{children}</route.layout>;
                        };
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
