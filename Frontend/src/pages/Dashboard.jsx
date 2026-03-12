import React, { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useIssueStore } from '../store/IssueStore';
import ReportModal from '../components/ReportModal';
import { useUIStore } from '../store/UIStore';
import { translations } from '../utils/translations';
import { servicesData } from '../data/servicesData';


// Timeline Component
const ApplicationTimeline = ({ status }) => {

  const steps = ["Submitted", "Verified", "In Progress", "Resolved"];

  const currentStep =
      status === "Pending" ? 0 :
          status === "In Review" ? 1 :
              status === "In Progress" ? 2 : 3;

  return (

      <div className="flex items-center w-full gap-2 py-6">

        {steps.map((step, i) => (

            <React.Fragment key={i}>

              <div className="flex flex-col items-center shrink-0">

                <div
                    className={`w-3.5 h-3.5 rounded-full ${
                        i <= currentStep
                            ? "bg-blue-600"
                            : "bg-slate-300 dark:bg-slate-700"
                    }`}
                />

                <span
                    className={`text-[10px] font-bold mt-2 uppercase ${
                        i <= currentStep
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400"
                    }`}
                >
              {step}
            </span>

              </div>

              {i < steps.length - 1 && (

                  <div
                      className={`h-[2px] flex-1 ${
                          i < currentStep
                              ? "bg-blue-600"
                              : "bg-slate-300 dark:bg-slate-700"
                      }`}
                  />

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


  const userIssues = issues.filter(
      (i) => i.citizen === user?.name || i.email === user?.email
  );


  // Complaint Statistics
  const totalComplaints = userIssues.length;

  const pendingComplaints =
      userIssues.filter(i => i.status === "Pending").length;

  const resolvedComplaints =
      userIssues.filter(i => i.status === "Resolved").length;



  // Nearby Government Services
  const openNearby = (type) => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const mapUrl =
          `https://www.google.com/maps/search/${type}/@${lat},${lng},15z`;

      window.open(mapUrl, "_blank");

    });

  };



  return (

      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:p-12 transition-colors">

        <div className="max-w-7xl mx-auto">


          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">

            <div>

              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {t.welcome}, {user?.name || "Guest"}
              </h1>

              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                System Live • {new Date().toLocaleDateString()}
              </p>

            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
            >
              + Create Ticket
            </button>

          </div>



          {/* Government Services */}

          <div className="mb-12">

            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">
              Government Services
            </h2>

            <div className="space-y-10">

              {servicesData.map((category, idx) => (

                  <div key={idx}>

                    <div className="flex items-center gap-3 mb-6">

                      <span className="text-2xl">{category.icon}</span>

                      <h3 className="font-bold uppercase text-slate-500 dark:text-slate-400">
                        {category.category}
                      </h3>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                      {category.services.map((service, sIdx) => (

                          <div
                              key={sIdx}
                              onClick={() => window.open(service.link, "_blank")}
                              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg cursor-pointer flex items-center gap-4 transition"
                          >

                            <div className="text-2xl">
                              {service.icon}
                            </div>

                            <div>

                              <h4 className="font-bold text-slate-900 dark:text-white">
                                {service.name}
                              </h4>

                              <p className="text-xs text-slate-400">
                                Official Portal ↗
                              </p>

                            </div>

                          </div>

                      ))}

                    </div>

                  </div>

              ))}

            </div>

          </div>



          {/* Main Grid */}

          <div className="grid lg:grid-cols-3 gap-8">


            {/* Complaints */}

            <div className="lg:col-span-2">

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">

                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Active Grievances
                  </h3>
                </div>

                <div className="p-4 space-y-4">

                  {userIssues.length > 0 ? (

                      userIssues.map((item, i) => (

                          <div
                              key={i}
                              className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                          >

                            <div className="flex justify-between mb-3">

                              <div>

                                <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                                  {item.category}
                                </h4>

                                <p className="text-xs text-slate-400">
                                  {item.id}
                                </p>

                              </div>

                              <span className="text-xs font-bold text-amber-500">
                          {item.status}
                        </span>

                            </div>

                            <ApplicationTimeline status={item.status} />

                          </div>

                      ))

                  ) : (

                      <div className="p-20 text-center text-slate-400">
                        No reports filed yet
                      </div>

                  )}

                </div>

              </div>

            </div>



            {/* Sidebar */}

            <div className="space-y-6">


              {/* City Analytics */}

              <div className="bg-indigo-600 p-8 rounded-3xl text-white">

                <h3 className="text-xl font-bold mb-6">
                  City Analytics
                </h3>

                <div className="space-y-4">

                  <div>
                    <p className="text-xs">Public WiFi Load</p>
                    <div className="h-2 bg-white/20 rounded">
                      <div className="h-2 bg-blue-400 w-[65%]" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs">Water Reservoir</p>
                    <div className="h-2 bg-white/20 rounded">
                      <div className="h-2 bg-emerald-400 w-[88%]" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs">Cleanliness Drive</p>
                    <div className="h-2 bg-white/20 rounded">
                      <div className="h-2 bg-amber-400 w-[92%]" />
                    </div>
                  </div>

                </div>

              </div>



              {/* Complaint Statistics */}

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">

                <h3 className="font-bold mb-4 text-slate-900 dark:text-white">
                  Complaint Statistics
                </h3>

                <div className="grid grid-cols-3 text-center gap-4">

                  <div>
                    <p className="text-2xl font-black text-blue-600">
                      {totalComplaints}
                    </p>
                    <p className="text-xs text-slate-400">Total</p>
                  </div>

                  <div>
                    <p className="text-2xl font-black text-amber-500">
                      {pendingComplaints}
                    </p>
                    <p className="text-xs text-slate-400">Pending</p>
                  </div>

                  <div>
                    <p className="text-2xl font-black text-emerald-500">
                      {resolvedComplaints}
                    </p>
                    <p className="text-xs text-slate-400">Resolved</p>
                  </div>

                </div>

              </div>



              {/* Nearby Government Services */}

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">

                <h3 className="font-bold mb-4 text-slate-900 dark:text-white">
                  Nearby Government Services
                </h3>

                <div className="space-y-3 text-sm">

                  <button
                      onClick={() => openNearby("police station")}
                      className="w-full flex justify-between items-center p-3 rounded-xl
                  bg-slate-100 dark:bg-slate-800
                  text-slate-800 dark:text-white
                  hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    🚓 Police Station
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                    Find →
                  </span>
                  </button>

                  <button
                      onClick={() => openNearby("hospital")}
                      className="w-full flex justify-between items-center p-3 rounded-xl
                  bg-slate-100 dark:bg-slate-800
                  text-slate-800 dark:text-white
                  hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    🚑 Hospital
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                    Find →
                  </span>
                  </button>

                  <button
                      onClick={() => openNearby("fire station")}
                      className="w-full flex justify-between items-center p-3 rounded-xl
                  bg-slate-100 dark:bg-slate-800
                  text-slate-800 dark:text-white
                  hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    🔥 Fire Station
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                    Find →
                  </span>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        <ReportModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />

      </div>

  );

};

export default Dashboard;
