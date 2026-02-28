import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { useUIStore } from '../store/UIStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, setLanguage } = useUIStore(); // Correct placement
  
  // Dark Mode Logic
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const getDashboardPath = () => {
    if (user?.role === 'Admin') return '/admin-dashboard';
    if (user?.role === 'Officer') return '/officer-dashboard';
    return '/dashboard';
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
      {/* Brand Logo */}
      <Link to="/" className="font-bold text-2xl text-blue-900 dark:text-white tracking-tight">
        Smart<span className="text-blue-600">Gov</span>
      </Link>
      
      <div className="flex gap-6 items-center">
        {/* Language Switcher - FIXED LOGIC */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Lang:</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
        </div>

        {/* Dark Mode Toggle Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xl hover:scale-110 transition-all active:scale-95 border border-transparent dark:border-slate-700 shadow-sm"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <Link to="/" className="text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 transition">Home</Link>
        
        {isAuthenticated ? (
          <>
            <Link to={getDashboardPath()} className="text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 transition">
              {user?.role === 'Citizen' ? 'Dashboard' : 'Console'}
            </Link>
            
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest leading-none">
                  {user?.role}
                </p>
                <Link to="/profile" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition">
                  {user?.name}
                </Link>
              </div>
              
              <button 
                onClick={logout}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-600 dark:text-slate-300 font-bold px-4 py-2 hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;