import React from 'react';
import { useIssueStore } from '../store/IssueStore';
import { useAuthStore } from '../store/AuthStore';
import { useUIStore } from '../store/UIStore';

const ReportModal = ({ isOpen, onClose }) => {
  const user = useAuthStore((state) => state.user);
  const addIssue = useIssueStore((state) => state.addIssue);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form se data nikalna
    const formData = new FormData(e.target);
    
    const newReport = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      citizen: user?.name || "Sadiya Shaikh", // Default name if not found
      issue: formData.get('description'),
      category: formData.get('category'),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status: "Pending"
    };

    addIssue(newReport); // Store mein save
    showToast("Ticket Created & Sent to Municipal Officer!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Submit New Report</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Category</label>
            <select name="category" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Roads & Potholes</option>
              <option>Street Lights</option>
              <option>Water Supply</option>
              <option>Garbage Collection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              name="description"
              required
              className="w-full p-3 h-32 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
              placeholder="Describe the issue in detail..."
            ></textarea>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Submit Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;