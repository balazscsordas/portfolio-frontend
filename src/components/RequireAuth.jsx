import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.firstName
            ? <Outlet />
            : <Navigate to="/authentication" state={{ from: location }} replace/>
    );
}

export default RequireAuth;