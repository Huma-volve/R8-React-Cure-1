import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * يحمي المسارات من الوصول غير المصرح به.
 * إذا لم يكن هناك token، يتم إعادة التوجيه لصفحة تسجيل الدخول.
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourComponent />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const token = localStorage.getItem('auth_token');

    if (!token) {
        // إعادة التوجيه لصفحة تسجيل الدخول مع حفظ الموقع المطلوب
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
