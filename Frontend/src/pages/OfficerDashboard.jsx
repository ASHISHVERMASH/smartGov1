import React from 'react';
import { useIssueStore } from '../store/IssueStore';
import { useAuthStore } from '../store/AuthStore';

const OfficerDashboard = () => {
  const issues = useIssueStore((state) => state.issues);
  const user = useAuthStore((state) => state.user);

  // Stats Logic for Officer
  const pendingTasks = issues.filter(i => i.status === 'Pending' || i.status === 'In Review').length;
  const resolvedTasks = issues.filter(i => i.status === 'Resolved').length;

  const officerStats = [
    { label: "Assigned Tasks", value: issues.length.toString().padStart(2, '0'), color: "blue", icon: "📋" },
    { label: "Urgent Action", value: pendingTasks.toString().padStart(2, '0'), color: "red", icon: "⚠️" },
    { label: "Completed", value: resolvedTasks.toString().padStart(2, '0'), color: "emerald", icon: "🏆" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Officer Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">Field Officer Console</span>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-3 tracking-tight">
              Duty Officer: {user?.name || 'Rahul Sharma'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1 italic">
              "Serving the city, one ticket at a time."
            </p>
          </div>
          <div className="flex bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="px-6 py-2 border-r border-slate-100 dark:border-slate-800 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Shift Status</p>
                <p className="text-sm font-black text-emerald-500">ON DUTY</p>
             </div>
             <div className="px-6 py-2 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                <p className="text-sm font-black text-slate-700 dark:text-slate-200">Zone-04</p>
             </div>
          </div>
        </div>

        {/* Officer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {officerStats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:opacity-10 transition-opacity">{s.icon}</div>
              <p className={`text-${s.color}-600 dark:text-${s.color}-400 font-bold text-[10px] uppercase tracking-widest mb-2`}>{s.label}</p>
              <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Task List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-slate-800 dark:text-white text-xl flex items-center gap-2 px-2">
               Active Assignments
               <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">{issues.length}</span>
            </h3>
            
            <div className="grid gap-4">
              {issues.map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                       <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                          {item.category.includes('Water') ? '💧' : item.category.includes('Road') ? '🛣️' : '💡'}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{item.category}</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest">UID: {item.id}</p>
                       </div>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                      item.status === 'Pending' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Reported by: <span className="text-slate-900 dark:text-slate-100">{item.citizen}</span></p>
                     </div>
                     <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">Details</button>
                        <button className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition">Verify & Resolve</button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Officer Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="font-bold text-slate-800 dark:text-white mb-6">Zone Protocol</h3>
               <div className="space-y-4">
                  {[
                    "Verify location via GPS before closing.",
                    "Upload photo of resolved site.",
                    "Citizen signature is required."
                  ].map((note, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                        <div className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[10px] text-emerald-600 font-bold shrink-0">{i+1}</div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{note}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] text-white border border-slate-800 dark:border-emerald-500/20 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Emergency Hub</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">Direct line to Central Fire and Medical services for Zone-04.</p>
                  <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black transition-all animate-pulse">
                    CONTACT HQ
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;