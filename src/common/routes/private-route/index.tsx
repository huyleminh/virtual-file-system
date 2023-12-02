import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components";

export interface IPrivateRouteProps {
    element: JSX.Element;
}

export function PrivateRoute(props: IPrivateRouteProps) {
    const [process, setProcess] = useState({ isAuth: false, isLoading: true });

    useEffect(() => {
        let timeoutId: number;

        timeoutId = setTimeout(() => {
            setProcess({ isAuth: true, isLoading: false });
        }, 1000);

        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
        // eslint-disable-next-line
    }, []);

    if (process.isLoading) {
        return (
            <div style={{ height: "100vh" }}>
                <Loading message="Checking permission, please waiting for a moment..." color={"primary"} />
            </div>
        );
    }

    return process.isAuth ? props.element : <Navigate to="/" />;
}
