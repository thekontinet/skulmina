import { Route, Routes } from "react-router-dom";
import routes from "@/config/routes";
import {AuthRoute} from "@/components";

function DynamicRoutes() {
    return (
        <Routes>
            {Object.keys(routes).map((name) => {
                const route = routes[name];
                return (
                    <Route
                        key={route.url}
                        path={route.url}
                        element={
                            route.access ? (
                                <AuthRoute type={route.access}>
                                    <route.component />
                                </AuthRoute>
                            ) : (
                                <route.component />
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default DynamicRoutes;
