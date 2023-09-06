import { create } from 'zustand';
import { getMonth } from 'date-fns'

export const useStore = create((set) => ({
    currentMonth: getMonth(new Date()),
    updateCurrentMonth: (month) => set((state) => ({ currentMonth: month })), 
}))