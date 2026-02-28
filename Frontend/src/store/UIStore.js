import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // 1. Toast State
  toast: {
    message: '',
    isVisible: false,
    type: 'success', 
  },
  
  // 2. Language State (Default 'en')
  language: 'en',

  // 3. Actions
  showToast: (message, type = 'success') => {
    set({ toast: { message, isVisible: true, type } });
    
    // 3 seconds baad automatic hide
    setTimeout(() => {
      set({ toast: { message: '', isVisible: false, type: 'success' } });
    }, 3000);
  },

  // Language update karne ka function
  setLanguage: (lang) => set({ language: lang }),
}));