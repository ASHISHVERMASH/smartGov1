import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useIssueStore = create(
  persist(
    (set) => ({
      issues: [
        { id: "TKT-101", citizen: "Sadiya Shaikh", issue: "Broken Streetlight", date: "Feb 22", status: "Pending", category: "Street Lights" },
      ],

      addIssue: (newIssue) => set((state) => ({ 
        issues: [newIssue, ...state.issues] 
      })),

      updateIssueStatus: (id, newStatus) => set((state) => ({
        issues: state.issues.map((issue) => 
          issue.id === id ? { ...issue, status: newStatus } : issue
        )
      })),
    }),
    {
      name: 'smartgov-issue-storage',
    }
  )
);