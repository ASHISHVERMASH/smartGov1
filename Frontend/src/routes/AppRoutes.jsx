import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import OfficerDashboard from '../pages/OfficerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Profile from '../pages/Profile';
import Services from '../pages/ServiceDetails'; //  NEW IMPORT

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} /> {/* ⭐ NEW ROUTE */}

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

            {/* Admin Only */}
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Profile */}
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