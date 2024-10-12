import React, { useState, useEffect } from 'react';
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerGreen from '../../../public/markergreen.png';
import MarkerRed from '../../../public/markerred.png';
import MarkerYellow from '../../../public/markeryellow.png';
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import useMapStore from "@/store/mapStore";
import useFetchData from './utils/useFetchData';

// interface Event {
//     id: string;
//     name: string;
//     type: string;
//     date: string;
//     time: string;
//     location: {
//         lat: number;
//         lon: number;
//     };
//     photos?: string[];
//     description: string;
//     amount: number;
//     createdAt: string;
//     userId: string;
//     capacity: string;
//     addres: string;
// }

const Markers = () => {
    // const [data, setData] = useState<Event[]>([]);
   const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { storeFilterValues, searchAreaPosition, setCurrentEvent, setShowModal } = useMapStore(); 

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${API_URL}/events/all`);
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const eventData: Event[] = await response.json();
    //             setData(eventData);
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //         }
    //     };

    //     fetchData();
    // }, [API_URL]);

    const { data } = useFetchData(`${API_URL}/events?lat=${searchAreaPosition.lat}&lon=${searchAreaPosition.lng}`);
   
    const filteredData = data.filter(event => {
        const matchesType = storeFilterValues.type === "all" || event.type === storeFilterValues.type;
        const matchesDate = storeFilterValues.date === "0" ? true : event.date === storeFilterValues.date;
        return matchesType && matchesDate;
    });

    // const selectMarker = (value: number) => {
    //     if (value < 0.3) {
    //       return MarkerGreen;
    //     } else if (value >= 0.3 && value <= 0.5) {
    //       return MarkerIcon;
    //     } else if (value > 0.5 && value <= 0.7) {
    //       return MarkerYellow;
    //     } else {
    //       return MarkerRed;
    //     }
    // };

    return (
        <>
            {filteredData.map((event) => (
                <Marker
                    eventHandlers={
                        {
                            click: () => {
                                setCurrentEvent(event);
                                setShowModal(true);
                            },
                        }
                    }
                    key={event.id}
                    position={[event.location.lat, event.location.lon]}
                    icon={
                        new L.Icon({
                            iconUrl: MarkerGreen.src,
                            iconRetinaUrl: MarkerIcon.src,
                            iconSize: [41, 41],
                            iconAnchor: [12.5, 41],
                            popupAnchor: [0, -41],
                            shadowUrl: MarkerShadow.src,
                            shadowSize: [41, 41],
                            
                        })
                    }
                >
                </Marker>
            ))}
        </>
    );
}

export default Markers;
