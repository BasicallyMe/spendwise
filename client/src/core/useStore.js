import create from 'zustand';
import { checkLoggedIn, checkRegistered } from './container';

const useBearStore = create((set) => ({
    loggedIn: checkLoggedIn(),
    userRegistered: checkRegistered(),
    setLoggedIn: (option) => set((state) => ({ loggedIn: option})),
    setRegistered: (option) => set((state) => ({ userRegistered: option}))
}));

export default useBearStore;