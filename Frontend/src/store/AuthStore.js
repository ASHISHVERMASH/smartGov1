import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Persist import karein

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      login: (userData) => set({
        user: userData,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false
      }),

      updateProfilePicture: (base64Image) => set((state) => ({
        user: { ...state.user, profilePicture: base64Image }
      })),
    }),
    {
      name: 'smartgov-auth-storage',
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);