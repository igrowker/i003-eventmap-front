import  { create }  from 'zustand';

const useMapStore = create((set) => ({
    storeFilterValues: {
        type: 'all',
        date: '0',
    },
    setStoreFilterValues: (values) => set((state) => ({
        storeFilterValues: { ...state.storeFilterValues, ...values },
    })),
    searchAreaPosition: {
        lat: -34.6033,
        lng: -58.3818,
    },
    setSearchAreaPosition: (position) => {
        const roundedPosition = {
          lat: parseFloat(position.lat.toFixed(4)),
          lng: parseFloat(position.lng.toFixed(4)),
        };
    
        set(() => ({
          searchAreaPosition: roundedPosition,
        }));
    },
    currentEvent: {},
    setCurrentEvent: (event) => set({ currentEvent: event }),
    showModal: false,
    setShowModal: (value) => set({ showModal: value }),




}));

export default useMapStore;
