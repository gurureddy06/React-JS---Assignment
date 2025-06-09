import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the child routes if authenticated
};

export default ProtectedRoute;