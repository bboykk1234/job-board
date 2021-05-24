import React, { PropsWithChildren } from "react";
import { UserContext as UserContextType } from "../../@types";
import { useUser } from "../hooks/useUser";

export const UserContext = React.createContext<UserContextType>({
    user: null,
    isLoggedIn: null,
    login: async ({username, password}) => false,
    logout: () => {},
});

export const UserProvider = (props: PropsWithChildren<{}>) => {
    return (
        <UserContext.Provider value={useUser()}>
            {props.children}
        </UserContext.Provider>
    );
};