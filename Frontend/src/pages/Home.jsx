import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    { id: "identity", name: "Identity & Civil", icon: "🆔", count: 12 },
    { id: "health", name: "Public Health", icon: "🏥", count: 8 },
    { id: "education", name: "Education", icon: "🎓", count: 15 },
    { id: "tax", name: "Business & Tax", icon: "💼", count: 10 },
    { id: "transport", name: "Transport", icon: "🚗", count: 6 },
    { id: "social", name: "Social Welfare", icon: "🤝", count: 9 },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-left transition-colors duration-500 overflow-x-hidden">
      
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 text-white py-32 px-6 text-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern City Governance" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          {/* Advanced Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-indigo-950/90 to-slate-950"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
             <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Official SmartGov Portal 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.05]">
            Digital Governance <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              for a Modern Nation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-90">
            Access hundreds of government services, track your applications, and connect with your local administration in just a few clicks.
          </p>
          
          <div className="max-w-2xl mx-auto relative z-50 transform hover:scale-[1.01] transition-transform shadow-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </section>

      {/* --- QUICK SERVICE GRID --- */}
      <section className="max-w-7xl mx-auto -mt-16 px-6 pb-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {serviceCategories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => navigate('/login')} 
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all border border-white/50 dark:border-slate-800 text-center cursor-pointer group"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <div className="mt-3 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-tighter">
                  {cat.count} Services
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- ANNOUNCEMENTS & NOTICES --- */}
        <div className="mt-28 grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
               <span className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">Updates & News</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Latest Initiatives</h2>
            
            <div className="space-y-6">
              {[
                { title: "Digital Literacy Campaign 2026", desc: "Expanding technology access to rural areas.", date: "Feb 12, 2026", tag: "Education" },
                { title: "Green City Waste Management", desc: "New smart bins installed across Zone-04.", date: "Feb 10, 2026", tag: "Civic" },
                { title: "SME Tax Rebate Program", desc: "Apply for 15% discount on municipal taxes.", date: "Feb 08, 2026", tag: "Business" },
              ].map((news, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
                  <div className="w-full md:w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0 flex items-center justify-center text-slate-300 font-black text-[10px] uppercase tracking-tighter">
                    Cover Image
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-black text-blue-500 uppercase mb-1">{news.tag}</span>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition">{news.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{news.desc}</p>
                    <span className="text-[10px] text-slate-400 font-bold mt-4 block uppercase tracking-tighter italic">{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Notice Board (Glassmorphism) */}
          <div className="lg:col-span-2 bg-slate-900 dark:bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden h-full border border-slate-800">
            <div className="absolute -right-20 -top-20 p-10 opacity-10 text-[15rem] select-none rotate-12">🏛️</div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span> 
                Official Notices
              </h3>
              
              <div className="space-y-8">
                {[
                  "New policy updates regarding municipal tax exemptions for small businesses effective from March.",
                  "Public consultation on urban transport planning scheduled for next Monday via SmartGov portal.",
                  "Water department maintenance scheduled for Zone-02 on Sunday, 8 AM to 4 PM."
                ].map((notice, i) => (
                  <div key={i} className="flex items-start gap-4 pb-8 border-b border-white/10 last:border-0 group">
                    <span className="text-blue-400 text-xl group-hover:scale-125 transition-transform animate-pulse">📢</span>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      "{notice}"
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="mt-10 w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/20 transition-all active:scale-95">
                Explore All News
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-white dark:bg-slate-950 py-20 border-t border-slate-100 dark:border-slate-900 text-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Need assistance?</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto text-sm font-medium">Our 24/7 digital helpdesk is here to guide you through government processes.</p>
        <button className="px-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
          Contact Support
        </button>
      </footer>
    </div>
  );
};

export default Home;