import React, { useState } from 'react';
import { useUIStore } from '../store/UIStore';
import { useAuthStore } from '../store/AuthStore'; // User info ke liye

const PaymentModal = ({ isOpen, onClose, billAmount, billType }) => {
  const showToast = useUIStore((state) => state.showToast);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  // Receipt Download Function
  const downloadReceipt = () => {
    const receiptText = `
      SMARTGOV OFFICIAL PAYMENT RECEIPT
      ---------------------------------
      Receipt ID: REC-${Math.floor(100000 + Math.random() * 900000)}
      Payer Name: ${user?.name || "Sadiya Shaikh"}
      Service Type: ${billType}
      Amount Paid: ${billAmount}
      Status: SUCCESSFUL
      Date: ${new Date().toLocaleString()}
      ---------------------------------
      This is a computer-generated document.
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${billType.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Payment Gateway Delay
    setTimeout(() => {
      setLoading(false);
      showToast(`${billType} Payment of ${billAmount} Successful!`, 'success');
      downloadReceipt(); // Payment ke baad automatic receipt download
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200 border dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-blue-900 dark:bg-slate-950 p-8 text-white text-left relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-6xl opacity-10">💳</div>
          <p className="text-blue-200 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Secure Checkout</p>
          <h2 className="text-2xl font-bold mt-1 tracking-tight">Pay {billType}</h2>
          <div className="mt-6 bg-blue-800/40 dark:bg-blue-500/10 p-4 rounded-2xl flex justify-between items-center border border-white/10">
            <span className="text-sm font-medium text-blue-100">Total Payable</span>
            <span className="text-2xl font-black tracking-tighter">{billAmount}</span>
          </div>
        </div>

        {/* Payment Methods Form */}
        <form onSubmit={handlePayment} className="p-8 space-y-5 text-left">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Select Payment Method</label>
          
          <div className="space-y-3">
            {['UPI (Google Pay, PhonePe)', 'Credit / Debit Card', 'Net Banking'].map((method) => (
              <label key={method} className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                <input type="radio" name="payment" required className="w-5 h-5 text-blue-600 focus:ring-0 cursor-pointer" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{method}</span>
              </label>
            ))}
          </div>

          <div className="pt-6 space-y-4">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 flex justify-center items-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : `Authorize Payment`}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full py-2 text-xs font-bold text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
            >
              Cancel Transaction
            </button>
          </div>
        </form>

        {/* Footer Security Badges */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-6">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-tighter flex items-center gap-1">
            <span className="text-xs">🔒</span> SSL SECURED
          </span>
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-tighter flex items-center gap-1">
            <span className="text-xs">🛡️</span> GOVT ENCRYPTED
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;