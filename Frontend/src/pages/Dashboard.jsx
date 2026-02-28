import React, { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useIssueStore } from '../store/IssueStore';
import ReportModal from '../components/ReportModal';
import PaymentModal from '../components/PaymentModal';
import { useUIStore } from '../store/UIStore';
import { translations } from '../utils/translations';

// 1. Interactive Timeline Component
const ApplicationTimeline = ({ status }) => {
  const steps = ["Submitted", "Verified", "In Progress", "Resolved"];
  const currentStep = status === "Pending" ? 0 : status === "In Review" ? 1 : status === "In Progress" ? 2 : 3;

  return (
    <div className="flex items-center w-full gap-2 py-6">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center shrink-0">
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-700 ${i <= currentStep ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
            <span className={`text-[9px] font-bold mt-2 uppercase tracking-tighter ${i <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-[2px] flex-1 min-w-[30px] transition-all duration-700 ${i < currentStep ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const issues = useIssueStore((state) => state.issues);
  const language = useUIStore((state) => state.language);
  const t = translations[language]; 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Filters issues specifically for Sadiya/User
  const userIssues = issues.filter(i => i.citizen === user?.name || i.citizen === "Sadiya Shaikh");

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:p-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.welcome}, {user?.name || 'Sadiya Shaikh'}
            </h1>
            <div className="flex items-center gap-2 mt-2">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                 System Live • {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN')}
               </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
               + Create Ticket
            </button>
          </div>
        </div>

        {/* 2. Quick Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Electricity", icon: "⚡", bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700" },
            { label: "Water Tax", icon: "💧", bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700" },
            { label: "Property", icon: "🏠", bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700" },
            { label: "Documents", icon: "📜", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700" },
          ].map((service, i) => (
            <div key={i} className={`${service.bg} p-6 rounded-[2.5rem] cursor-pointer hover:shadow-lg transition-all border border-transparent hover:border-white/50 group`}>
              <div className="text-3xl mb-3 group-hover:bounce">{service.icon}</div>
              <p className={`font-bold text-sm ${service.text} dark:text-white/80`}>{service.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3. Main Content: Complaint Tracking */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Active Grievances</h3>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full uppercase">Tracking Live</span>
                </div>
                
                <div className="p-4 space-y-4">
                {userIssues.length > 0 ? (
                    userIssues.map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2rem] border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.category}</h4>
                                <p className="text-[10px] text-slate-400 font-mono tracking-widest">{item.id}</p>
                            </div>
                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                item.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                        <ApplicationTimeline status={item.status} />
                    </div>
                    ))
                ) : (
                    <div className="p-20 text-center text-slate-400 italic font-medium">No reports filed yet.</div>
                )}
                </div>
            </div>
          </div>

          {/* 4. Sidebar: Resource Analytics */}
          <div className="space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
                <h3 className="text-xl font-bold mb-6">City Analytics</h3>
                <div className="space-y-6">
                    {[
                        { label: "Public WiFi Load", val: "65%", color: "bg-blue-400" },
                        { label: "Water Reservoir", val: "88%", color: "bg-emerald-400" },
                        { label: "Cleanliness Drive", val: "92%", color: "bg-amber-400" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase opacity-80">
                                <span>{item.label}</span>
                                <span>{item.val}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: item.val }}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Quick Bill Pay */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-white mb-4 italic">Unpaid Dues</h4>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$420.00</p>
                    <button onClick={() => setIsPayModalOpen(true)} className="bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all">
                        Pay Now
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Due Date: 15 March 2026</p>
            </div>
          </div>
        </div>
      </div>

      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PaymentModal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} billAmount="$420.00" billType="Utility Taxes" />
    </div>
  );
};

export default Dashboard;