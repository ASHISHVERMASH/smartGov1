import React from 'react';
import { useUIStore } from '../store/UIStore';

const Toast = () => {
  const { toast } = useUIStore();

  if (!toast.isVisible) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
        toast.type === 'success' 
          ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
          : 'bg-red-50 border-red-100 text-red-800'
      }`}>
        <span className="text-xl">{toast.type === 'success' ? '✅' : '❌'}</span>
        <p className="font-bold text-sm">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;