import create from 'zustand';

const useBearStore = create(set => ({
    user: {},
    setUser: data => set(state => ({ user: data })),
}));

export default useBearStore;