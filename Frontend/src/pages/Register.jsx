import React, { useState } from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-left">Create Citizen Account</h2>
        <p className="text-slate-500 mb-8 text-sm text-left">Fill in your official details to access government services.</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name (As per ID)</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Sadiya Shaikh" />
          </div>

          {/* Email & Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
            <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 00000 00000" />
          </div>

          {/* DOB & National ID */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">National ID / Aadhar</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="12-digit number" />
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </div>

          <button className="md:col-span-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-4">
            Register for SmartGov
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;