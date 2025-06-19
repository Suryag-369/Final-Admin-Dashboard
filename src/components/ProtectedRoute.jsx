import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;