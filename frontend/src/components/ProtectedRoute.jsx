import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
        </div>
    );

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
