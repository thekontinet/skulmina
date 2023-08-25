import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import authContext from "@/context/authContext";
import route from "@/helpers/route";
import { AuthType } from "@/types";

type AuthRouteProps = {
    type: AuthType;
};

function AuthRoute({
    children,
    type,
}: PropsWithChildren<AuthRouteProps>) {
    const { isLoggedIn } = useContext(authContext);

    if (type === "auth" && !isLoggedIn) return <Navigate to={route("login")} />;

    if (type === "guest" && isLoggedIn)
        return <Navigate to={route("dashboard")} />;

    return <>{children}</>;
}

export default AuthRoute;
