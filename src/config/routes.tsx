import React from "react";
import { Login, Dashboard } from "@/pages";
import { AuthType } from "@/types";

interface RouteConfig {
    url: string;
    component: React.ComponentType;
    access?: AuthType;
}

const routes: Record<string, RouteConfig> = {
    home: {
        url: "/",
        component: () => <h1>Hello World</h1>,
    },
    login: {
        url: "/login",
        component: Login,
        access: "guest",
    },
    dashboard: {
        url: "/dashboard",
        component: Dashboard,
        access: "auth",
    },
};

export default routes;
