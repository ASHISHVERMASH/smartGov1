import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import OfficerDashboard from '../pages/OfficerDashboard';
import AdminDashboard from '../pages/AdminDashboard'; 
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen Access */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Citizen']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Officer & Admin Access */}
      <Route 
        path="/officer-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Officer', 'Admin']}>
            <OfficerDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Admin Only Access */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Authenticated Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;