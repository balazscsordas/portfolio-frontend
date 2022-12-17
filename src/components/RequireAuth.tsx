import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.firstName
            ? <Outlet />
            : <Navigate to="/authentication" state={{ from: location }} replace/>
    );
}

export default RequireAuth;