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
    currentEvent: {
        "id": "0cf03f8a-584a-4ac1-848e-83ae51b519df",
        "name": "Concierto de Rock",
        "type": "Artistico",
        "date": "2024-10-11",
        "time": "15:30",
        "location": {
            "lat": -34.610276,
            "lon": -58.431019
        },
        "photos": [
            "https://picsum.photos/200/300?random=505",
            "https://picsum.photos/200/300?random=506"
        ],
        "description": "El mejor espectáculo musical del año.",
        "amount": 0.46,
        "createdAt": "2024-10-10T22:17:05.995Z",
        "userId": "7b303969-93a2-42c7-a691-42a46222f69f",
        "capacity": "Entre 325 y 773 personas",
        "addres": "Ubicación en Palermo, Buenos Aires"
    },
    setCurrentEvent: (event) => set({ currentEvent: event }),
    showModal: true,
    setShowModal: (value) => set({ showModal: value }),




}));

export default useMapStore;
