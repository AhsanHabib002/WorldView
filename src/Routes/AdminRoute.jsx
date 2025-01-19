import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user,loading, logout }= useAuth();
    const [isAdmin, isAdminLoading]= useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin){
        return children;
    }
    logout();
    return <Navigate to="/login"></Navigate>
};

export default AdminRoute;