import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: 'Citizen'
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.identifier, // Backend expects email as identifier
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store mein dynamic user information save karein
        login({
          name: data.firstName,
          email: data.email,
          role: data.role || formData.role,
          token: data.token,
          profilePicture: data.profilePicture // Add this line
        });

        // Role-Based Redirection
        if (data.role === 'Officer' || data.role === 'Admin' || formData.role === 'Officer' || formData.role === 'Admin') {
          navigate('/officer-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to server. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Left Branding Side */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center p-16 text-white text-left relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-400 blur-[100px] rounded-full"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-lg relative z-10 w-full">
          {/* Trust Badges */}
          <div className="flex gap-3 mb-10">
            {['Secure Access', 'Data Protected', 'Gov Portal'].map((badge) => (
              <span key={badge} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-200">
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-6xl font-black mb-4 tracking-tighter leading-none">
            SmartGov <br />
            <span className="text-blue-400">Portal</span>
          </h1>
          
          <p className="text-blue-100/80 text-lg leading-relaxed mb-12 font-medium">
            Empowering citizens through seamless digital governance and transparent public services.
          </p>

          {/* Hero Illustration */}
          <div className="mb-12 relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-700"></div>
            <img 
              src="/images/login-hero.png" 
              alt="Digital Governance Illustration" 
              className="w-full h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:-translate-y-2 transition-transform duration-500"
            />
          </div>

          {/* Feature Highlights */}
          <div className="grid gap-6">
            {[
              { icon: '🏛️', title: '100+ Government Services', desc: 'Instant access to all municipal departments.' },
              { icon: '📊', title: 'Track Applications', desc: 'Real-time updates on your pending requests.' },
              { icon: '🛡️', title: 'Secure Authentication', desc: 'Enterprise-grade protection for your identity.' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 items-center group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-500/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                  <p className="text-xs text-blue-200/60">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign In</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Select your role to access the relevant panel.</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-slate-200 dark:bg-slate-900 rounded-xl mb-8">
            {['Citizen', 'Officer', 'Admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${formData.role === r
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email or Citizen ID</label>
              <input
                required
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your ID"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Security Password</label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
            >
              Enter {formData.role} Dashboard
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account? <span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline" onClick={() => navigate('/register')}>Create one now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;