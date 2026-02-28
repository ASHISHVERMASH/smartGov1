import React from 'react';
import { useIssueStore } from '../store/IssueStore';
import { useAuthStore } from '../store/AuthStore';

const AdminDashboard = () => {
  const issues = useIssueStore((state) => state.issues);
  const user = useAuthStore((state) => state.user);

  // Stats Logic
  const totalGrievances = issues.length;
  const pendingGrievances = issues.filter(i => i.status === 'Pending').length;
  const resolvedGrievances = issues.filter(i => i.status === 'Resolved').length;

  const adminStats = [
    { label: "Total Tickets", value: totalGrievances.toString().padStart(2, '0'), color: "blue", icon: "🎫" },
    { label: "Pending Review", value: pendingGrievances.toString().padStart(2, '0'), color: "amber", icon: "⏳" },
    { label: "Total Resolved", value: resolvedGrievances.toString().padStart(2, '0'), color: "emerald", icon: "✅" },
    { label: "Active Officers", value: "12", color: "indigo", icon: "👮" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header with Live Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">System Admin</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">ID: #ADM-00124</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Main Console</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pr-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl">🛡️</div>
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter leading-none">Server Status</p>
                <p className="text-sm font-black text-emerald-500 uppercase">Operational 99.9%</p>
             </div>
          </div>
        </div>

        {/* Dynamic Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {adminStats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
              </div>
              <p className={`text-${s.color}-600 dark:text-${s.color}-400 font-bold text-[10px] uppercase tracking-widest mb-1`}>{s.label}</p>
              <p className="text-4xl font-black text-slate-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Logs Table: Master Control */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
                <span className="w-2 h-5 bg-blue-600 rounded-full"></span>
                Master Ticket Logs
              </h3>
              <div className="flex gap-2">
                 <input type="text" placeholder="Search ID..." className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 ring-blue-500" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 dark:border-slate-800">
                    <th className="px-8 py-5">Citizen</th>
                    <th className="px-8 py-5">Service</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Control</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {issues.map((issue, i) => (
                    <tr key={i} className="border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{issue.citizen}</p>
                        <p className="text-[10px] font-mono text-slate-400">{issue.id}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">{issue.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          issue.status === 'Pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20' : 
                          issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${issue.status === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                          {issue.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-black hover:scale-105 active:scale-95 transition-all">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: System Intelligence */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">📊</div>
                <h3 className="font-bold mb-6 flex items-center gap-2">
                    System Load
                </h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-2 opacity-60">
                            <span>CPU Usage</span>
                            <span>42%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 transition-all duration-1000" style={{width: '42%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-2 opacity-60">
                            <span>Memory (RAM)</span>
                            <span>68%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-400 transition-all duration-1000" style={{width: '68%'}}></div>
                        </div>
                    </div>
                </div>
                <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-bold transition-all">Generate System Report</button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="font-bold text-slate-800 dark:text-white mb-6">Access Logs</h3>
               <div className="space-y-4">
                  {[
                    { msg: "Officer Rahul logged in", time: "2m ago", type: "auth" },
                    { msg: "Database backup completed", time: "1h ago", type: "system" },
                    { msg: "Security patch updated", time: "4h ago", type: "security" }
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{log.msg}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{log.time}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;