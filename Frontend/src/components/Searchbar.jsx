import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Mock services data based on categories
  const allServices = [
    { id: 'passport', name: 'Passport Renewal', category: 'Identity' },
    { id: 'pothole', name: 'Report Pothole', category: 'Grievance' },
    { id: 'water-tax', name: 'Pay Water Bill', category: 'Tax' },
    { id: 'health-card', name: 'Apply for Health Card', category: 'Health' },
    { id: 'scholarship', name: 'Student Scholarship', category: 'Education' }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (serviceId) => {
    setQuery('');
    setResults([]);
    // Agar report wala kaam hai toh dashboard, warna login/service page
    if (serviceId === 'pothole') {
      navigate('/dashboard'); 
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for services (e.g., Passport, License, Taxes)..."
          className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent shadow-xl focus:border-blue-500 outline-none transition-all pr-12 text-slate-700 font-medium"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600">
          🔍
        </div>
      </div>

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="w-full px-6 py-4 text-left hover:bg-slate-50 flex justify-between items-center group transition-colors"
            >
              <div>
                <p className="font-bold text-slate-800 group-hover:text-blue-600">{item.name}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase">{item.category}</p>
              </div>
              <span className="text-slate-300 group-hover:text-blue-500">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;