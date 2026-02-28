import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Persist import karein

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),

      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'smartgov-auth-storage', // LocalStorage mein is naam se save hoga
    }
  )
);