import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAuthUser } from "@/services/Api";

type AuthContextType = {
    user: null | Record<string, string>;
    isLoggedIn: boolean
};

const authContext = React.createContext<AuthContextType>({ user: null, isLoggedIn: false });

export function AuthContextProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const response = useQuery("user", getAuthUser);

    useEffect(() => {
        if(response.data){
            setUser(() => response.data);
            setIsLoggedIn(true)
        }
    }, [response.data, response.isError]);

    return (
        <authContext.Provider value={{ user, isLoggedIn }}>
            {children}
        </authContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default authContext;
