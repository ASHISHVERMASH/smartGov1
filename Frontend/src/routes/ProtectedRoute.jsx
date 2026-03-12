import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore();

  // Wait for rehydration to finish
  if (!_hasHydrated) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;