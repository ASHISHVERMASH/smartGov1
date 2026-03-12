import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RegisteredCounter from '../components/RegisteredCounter';
import { servicesData } from '../data/servicesData';

const Home = () => {

  const navigate = useNavigate();

  const serviceCategories = servicesData.map(cat => ({
    name: cat.category,
    icon: cat.icon,
    count: cat.services.length
  }));

  return (

      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-left transition-colors duration-500 overflow-x-hidden">

        {/* ================= HERO SECTION ================= */}

        <section className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 text-white py-32 px-6 text-center overflow-hidden">

          <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                alt="Modern City Governance"
                className="w-full h-full object-cover opacity-40 scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-indigo-950/90 to-slate-950"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">

            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
Official SmartGov Portal 2026
</span>
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



            <div className="max-w-2xl mx-auto shadow-2xl">
              <SearchBar/>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition">
                Create Account
              </button>

              <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition">
                Track Application
              </button>

              <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition">
                Explore Services
              </button>

            </div>

          </div>

          <div className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>

          <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>

        </section>


        {/* ================= QUICK SERVICES ================= */}

        <section className="max-w-7xl mx-auto -mt-16 px-6 pb-24 relative z-20">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {serviceCategories.map((cat,i)=>(

                <div
                    key={i}
                    onClick={()=>navigate('/login')}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all border border-white/50 dark:border-slate-800 text-center cursor-pointer group">

                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform duration-500">
                    {cat.icon}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>

                  <div className="mt-3 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                      {cat.count} Services
                    </p>
                  </div>

                </div>

            ))}

          </div>


          {/* ================= STATISTICS ================= */}

          <div className="mt-24 grid md:grid-cols-4 gap-8 text-center">

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow">
              <h2 className="text-4xl font-black text-blue-600">120+</h2>
              <p className="text-sm text-slate-500">Government Services</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow">
              <h2 className="text-4xl font-black text-emerald-500">1200+</h2>
              <p className="text-sm text-slate-500">Registered Citizens</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow">
              <h2 className="text-4xl font-black text-amber-500">340</h2>
              <p className="text-sm text-slate-500">Complaints Resolved</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow">
              <h2 className="text-4xl font-black text-purple-500">24/7</h2>
              <p className="text-sm text-slate-500">Digital Helpdesk</p>
            </div>

          </div>


          {/* ================= NEWS ================= */}

          <div className="mt-28 grid lg:grid-cols-5 gap-12 items-start">

            <div className="lg:col-span-3">

              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-10">
                Latest Initiatives
              </h2>

              <div className="space-y-6">

                {[
                  {
                    title:"Digital Literacy Campaign 2026",
                    desc:"Expanding technology access to rural areas.",
                    date:"Feb 12, 2026",
                    tag:"Education"
                  },
                  {
                    title:"Green City Waste Management",
                    desc:"New smart bins installed across Zone-04.",
                    date:"Feb 10, 2026",
                    tag:"Civic"
                  },
                  {
                    title:"SME Tax Rebate Program",
                    desc:"Apply for 15% discount on municipal taxes.",
                    status:"Coming Soon",
                    tag:"Business"
                  }

                ].map((news,i)=>(

                    <div key={i}
                         className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">

<span className="text-xs font-bold text-blue-500 uppercase">
{news.tag}
</span>

                      <h4 className="font-bold text-xl text-slate-900 dark:text-white mt-1">
                        {news.title}
                      </h4>

                      <p className="text-sm text-slate-500 mt-2">
                        {news.desc}
                      </p>

                      {news.status ? (

                          <span className="mt-4 inline-block px-3 py-1 bg-amber-100 text-amber-600 text-xs font-bold rounded-full">
{news.status}
</span>

                      ) : (

                          <span className="text-xs text-slate-400 mt-4 block">
{news.date}
</span>

                      )}

                    </div>

                ))}

              </div>

            </div>


            {/* ================= NOTICE BOARD ================= */}

            <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">

              <h3 className="text-2xl font-black mb-8">
                Official Notices
              </h3>

              <div className="space-y-6">

                <p className="text-sm text-slate-300">
                  📢 New policy updates regarding municipal tax exemptions for small businesses effective from March.
                </p>

                <p className="text-sm text-slate-300">
                  📢 Public consultation on urban transport planning scheduled next Monday.
                </p>

                <p className="text-sm text-slate-300">
                  📢 Water department maintenance scheduled Sunday 8 AM – 4 PM.
                </p>

              </div>

              <button className="mt-10 w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition">
                Explore All News
              </button>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="bg-white dark:bg-slate-950 py-20 border-t border-slate-100 dark:border-slate-900 text-center">

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Need assistance?
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto text-sm">
            Our 24/7 digital helpdesk is here to guide you through government processes.
          </p>

          <a
              href="smartgovofficial@gmail.com"
              className="px-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-200 transition-all inline-block">

            Contact Support

          </a>

        </footer>

      </div>

  );

};

export default Home;