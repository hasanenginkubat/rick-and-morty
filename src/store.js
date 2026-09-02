import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
  
  status: '',
  setStatus: (status) => set({ status, page: 1 }),
  
  page: 1,
  setPage: (updater) => set((state) => ({
    page: typeof updater === 'function' ? updater(state.page) : updater
  })),
}));