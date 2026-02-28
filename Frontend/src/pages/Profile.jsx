import React, { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useUIStore } from '../store/UIStore';
import { translations } from '../utils/translations';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const language = useUIStore((state) => state.language);
  const t = translations[language];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Sadiya Shaikh',
    email: user?.email || 'sadiya@example.gov',
    phone: '+91 98765 43210',
    address: 'Sector 4, Smart City, Maharashtra'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logic to update store would go here
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:p-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute -bottom-12 left-10">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl p-1 shadow-2xl">
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-4xl">
                  👤
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-10 px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{formData.name}</h2>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">{user?.role || 'Citizen'} Account</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black text-xs hover:scale-105 transition-all"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
              <button onClick={logout} className="bg-red-50 dark:bg-red-900/20 text-red-600 px-6 py-3 rounded-2xl font-black text-xs hover:bg-red-600 hover:text-white transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                Personal Information
              </h3>
              
              <div className="grid gap-8">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                  { label: "Phone Number", key: "phone", type: "tel" },
                  { label: "Residential Address", key: "address", type: "text" },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <input 
                      type={field.type}
                      disabled={!isEditing}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-medium ${
                        isEditing 
                        ? 'bg-white dark:bg-slate-800 border-blue-500 ring-4 ring-blue-500/10 text-slate-900 dark:text-white' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-500'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Status Sidebar */}
          <div className="space-y-6">
            <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 text-6xl opacity-20">🛡️</div>
               <h4 className="font-black text-xs uppercase tracking-widest mb-4 opacity-80">KYC Status</h4>
               <p className="text-2xl font-black mb-2">Verified</p>
               <p className="text-xs text-emerald-100 leading-relaxed mb-6">Your identity has been verified with SmartGov systems.</p>
               <div className="bg-white/20 p-4 rounded-2xl text-[10px] font-bold">
                 Last Check: 12 Jan 2026
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h4 className="font-bold text-slate-800 dark:text-white mb-6">Account Settings</h4>
               <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center group">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-600">Change Password</span>
                    <span className="text-slate-300">→</span>
                  </button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center group">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-600">Notification Preferences</span>
                    <span className="text-slate-300">→</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;