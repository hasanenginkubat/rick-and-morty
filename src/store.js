import { create } from 'zustand';

export const useSearchStore = create((set) => ({
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query}),

    status: '',
    setStatus: (status) => set({status: status}),
}))