import { createContext, useContext } from "react";

interface IAuthContext {}

interface IAuthContextProvider {
    children: JSX.Element;
}

const AuthContext = createContext<IAuthContext | null>(null);

// Implement later if needed
export const AuthContextProvider = (props: IAuthContextProvider) => {
    return <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (authContext === undefined || authContext === null) {
        throw new Error("There is no existing auth context");
    }
    return authContext;
};
