import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const allServices = [
    { id: "passport", name: "Passport Renewal", category: "Identity", icon: "🪪" },
    { id: "pothole", name: "Report Pothole", category: "Grievance", icon: "🛣️" },
    { id: "water-tax", name: "Pay Water Bill", category: "Tax", icon: "💧" },
    { id: "health-card", name: "Apply for Health Card", category: "Health", icon: "🏥" },
    { id: "scholarship", name: "Student Scholarship", category: "Education", icon: "🎓" }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filtered = allServices.filter(
          (service) =>
              service.name.toLowerCase().includes(value.toLowerCase()) ||
              service.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (serviceId) => {
    setQuery("");
    setResults([]);

    if (serviceId === "pothole") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].id);
    }
  };

  return (
      <div className="relative w-full max-w-2xl mx-auto">

        <div className="relative group">
          <input
              type="text"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleEnter}
              placeholder="Search for services (Passport, License, Taxes...)"
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent shadow-xl focus:border-blue-500 outline-none transition-all pr-12 text-slate-700 font-medium"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
            🔍
          </div>
        </div>

        {query.length > 1 && (
            <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">

              {results.length > 0 ? (
                  results.map((item) => (
                      <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className="w-full px-6 py-4 text-left hover:bg-slate-50 flex justify-between items-center group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>

                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-blue-600">
                              {item.name}
                            </p>

                            <p className="text-xs text-slate-400 font-semibold uppercase">
                              {item.category}
                            </p>
                          </div>
                        </div>

                        <span className="text-slate-300 group-hover:text-blue-500">
                  →
                </span>
                      </button>
                  ))
              ) : (
                  <div className="px-6 py-4 text-slate-400 text-sm">
                    No services found
                  </div>
              )}

            </div>
        )}

      </div>
  );
};

export default SearchBar;