// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   useMapEvent,
// //   Popup,
// // } from "react-leaflet";
// // import { useState } from "react";
// // import MarkerIcon from "leaflet/dist/images/marker-icon.png";
// // import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
// // import L, { Icon } from "leaflet";
// // import Heatmap from "./Heatmap";
// // import Markers from "./Markers";

// // interface Coordinate {
// //   lat: number;
// //   lon: number;
// // }

// // interface Event {
// //   id: string;
// //   name: string;
// //   type: string;
// //   date: string;
// //   time: string;
// //   location: {
// //     lat: number;
// //     lon: number;
// //   };
// //   description: string;
// //   amount: number;
// //   createdAt: string;
// //   userId: string;
// //   capacity: string;
// //   address: string;
// // }
// // const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// // const SearchEvent = () => {
// //   const [coordinates, setCoordinates] = useState<Coordinate>({
// //     lat: -34.60448395867932,
// //     lon: -58.60448395867932,
// //   });
// //   const [markers, setMarkers] = useState<Coordinate[]>([]);
// //   const [events, setEvents] = useState<Event[]>([]);

// //   const handleClickOutsideMap = async () => {
// //     try {
// //       const response = await fetch(
// //         `${API_URL}/events/?lat=${coordinates.lat}&lon=${coordinates.lon}`
// //       );

// //       if (!response.ok) {
// //         throw new Error("Error al obtener eventos");
// //       }

// //       const data = await response.json();
// //       setEvents(data);
// //     } catch (error) {
// //       console.error("Error al obtener eventos:", error);
// //     }
// //   };

// //   useMapEvent("click", (event) => {
// //     const latlng = event.latlng;
// //     setCoordinates({ lat: latlng.lat, lon: latlng.lng });
// //     setMarkers([...markers, { lat: latlng.lat, lon: latlng.lng }]);
// //     console.log(latlng);
// //   });
// //   const customIcon = new Icon({
// //     iconUrl: "icongeo.png",

// //     iconSize: [38, 38], // size of the icon
// //   });

// //   return (
// //     <>
// //       {events.map((event) => (
// //         <Marker
// //           key={event.id}
// //           position={[event.location.lat, event.location.lon]}
// //           icon={
// //             new L.Icon({
// //               iconUrl: MarkerIcon.src,
// //               iconRetinaUrl: MarkerIcon.src,
// //               iconSize: [25, 41],
// //               iconAnchor: [12.5, 41],
// //               popupAnchor: [0, -41],
// //               shadowUrl: MarkerShadow.src,
// //               shadowSize: [41, 41],
// //             })
// //           }
// //         >
// //           <Popup>
// //             <h3>{event.name}</h3>
// //             <p>Type: {event.type}</p>
// //             <p>Date: {event.date}</p>
// //             <p>Time: {event.time}</p>
// //             <p>Capacity: {event.capacity}</p>
// //             <p>Description: {event.description}</p>
// //             <p>Amount: ${event.amount.toFixed(2)}</p>
// //             <p>Address: {event.address}</p>
// //           </Popup>
// //         </Marker>
// //       ))}

// //       {markers.map((marker, index) => (
// //         <Marker
// //           key={index}
// //           position={[marker.lat, marker.lon]}
// //           icon={customIcon}
// //         >
// //           <Popup>
// //             <div className="flex flex-col items-center space-y-2">
// //               <div className="flex items-center space-x-2">
// //                 <img
// //                   src="lupa.png"
// //                   alt="Ubicación"
// //                   className="w-6 h-6"
// //                 />
// //                 <button onClick={handleClickOutsideMap} className="text-sm text-white rounded-2xl bg-indigo-900">
// //                   Obtener Eventos
// //                 </button>
// //               </div>
// //             </div>
// //           </Popup>
// //         </Marker>
// //       ))}
// //     </>
// //   );
// // };

// // export default SearchEvent;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvent, Popup } from "react-leaflet";
// import MarkerIcon from "leaflet/dist/images/marker-icon.png";
// import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
//  import L, { Icon } from "leaflet";
//  import Heatmap from './Heatmap';
// import { log } from 'console';
// import { useMap } from 'react-leaflet';

// interface Coordinate {
//   lat: number;
//   lon: number;
// }

// interface Event {
//   id: string;
//   name: string;
//   type: string;
//   date: string;
//   time: string;
//   location: {
//     lat: number;
//     lon: number;
//   };
//   description: string;
//   amount: number;
//   createdAt: string;
//   userId: string;
//   capacity: string;
//   address: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// const SearchEvent = () => {
//   const map = useMap()
//   const [coordinates, setCoordinates] = useState<Coordinate>({
//     lat: -34.60448395867932,
//     lon: -58.60448395867932,
//   });
//   const [markers, setMarkers] = useState<Coordinate[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [showHeatmap, setShowHeatmap] = useState(false);

//   const handleClickOutsideMap = async () => {
//     try {
//       const response = await fetch(`${API_URL}/events/?lat=${coordinates.lat}&lon=${coordinates.lon}`);

//       if (!response.ok) {
//         throw new Error("Error al obtener eventos");
//       }

//       const data = await response.json();
//       setEvents(data);
//       setShowHeatmap(true);
//     } catch (error) {
//       console.error("Error al obtener eventos:", error);
//     }
//   };

//   const handleMapClick = (event: { latlng: any; }) => {
//     const latlng = event.latlng;
//     setCoordinates({ lat: latlng.lat, lon: latlng.lng });
//     setMarkers([...markers, { lat: latlng.lat, lon: latlng.lng }]);
//     console.log(latlng);
//   };

//   //permite el clickeo de la coordenada y el borrado de la misma cuando el usuario busca en otra coordenada
//   useEffect(() => {
//     // Agrega el event listener al mapa para detectar clics
//     map.on("click", handleMapClick);

//     // Limpia el event listener cuando el componente se desmonte
//     return () => {
//       map.off("click", handleMapClick);
//     };
//   }, [map]);

//   useEffect(() => {
//     if (showHeatmap) {
//       document.body.style.cursor = 'crosshair';
//     } else {
//       document.body.style.cursor = '';
//     }
//     console.log(showHeatmap);

//   }, [showHeatmap]);

//   const customIcon = new Icon({
//          iconUrl: "placeholder.png",

//          iconSize: [38, 38], // size of the icon
//        });

//   return (
//     <>
//       {events.map((event) => (
//         <Marker
//           key={event.id}
//           position={[event.location.lat, event.location.lon]}
//           icon={
//                          new L.Icon({
//                           iconUrl: MarkerIcon.src,
//                            iconRetinaUrl: MarkerIcon.src,
//                            iconSize: [25, 41],
//                            iconAnchor: [12.5, 41],
//                            popupAnchor: [0, -41],
//                            shadowUrl: MarkerShadow.src,
//                            shadowSize: [41, 41],
//                          })
//                        }
//         >
//           <Popup>
//             <h3>{event.name}</h3>
//             <p>Type: {event.type}</p>
//             <p>Date: {event.date}</p>
//             <p>Time: {event.time}</p>
//             <p>Capacity: {event.capacity}</p>
//             <p>Description: {event.description}</p>
//             <p>Amount: ${event.amount.toFixed(2)}</p>
//             <p>Address: {event.address}</p>
//           </Popup>
//         </Marker>
//       ))}

//       {markers.map((marker, index) => (
//         <Marker
//           key={index}
//           position={[marker.lat, marker.lon]}
//           icon={customIcon}
//         >
//           <Popup>
//             <div className="flex flex-col items-center space-y-2">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="lupa.png"
//                   alt="Ubicación"
//                   className="w-6 h-6"
//                 />
//                 <button onClick={handleClickOutsideMap} className="text-sm text-white rounded-2xl bg-indigo-900">
//                   Obtener Eventos
//                 </button>
//               </div>
//             </div>
//           </Popup>
//         </Marker>
//       ))}

//       {showHeatmap && <Heatmap />}
//     </>
//   );
// };

// export default SearchEvent;

import React, { useState, useEffect } from "react";
import { Marker, useMapEvents, Popup, Circle, useMap } from "react-leaflet";
import Heatmap from "./Heatmap";
import Markers from "./Markers";
import L, { Icon } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";

interface Coordinate {
  lat: number;
  lon: number;
}

interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  location: {
    lat: number;
    lon: number;
  };
  description: string;
  amount: number;
  createdAt: string;
  userId: string;
  capacity: string;
  address: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const SearchEvent = () => {
  const map = useMap();
  const [coordinates, setCoordinates] = useState<Coordinate>({
    lat: -34.60448395867932,
    lon: -58.60448395867932,
  });
  const [markers, setMarkers] = useState<Coordinate[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const handleClickOutsideMap = async () => {
    try {
      const response = await fetch(
        `${API_URL}/events/?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener eventos");
      }

      const data = await response.json();
      setEvents(data);
      setShowHeatmap(true);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  const handleMapClick = (event: { latlng: { lat: number; lng: number } }) => {
    setCoordinates({ lat: event.latlng.lat, lon: event.latlng.lng });
    setMarkers([...markers, { lat: event.latlng.lat, lon: event.latlng.lng }]);
    console.log(event.latlng);
  };

  useEffect(() => {
    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);

  useEffect(() => {
    if (showHeatmap) {
      document.body.style.cursor = "crosshair";
    } else {
      document.body.style.cursor = "";
    }
  }, [showHeatmap]);

  const getEventsInCircle = (center: Coordinate, radius: number) => {
    return events.filter((event) => {
      const distance = L.latLng(center.lat, center.lon).distanceTo(
        L.latLng(event.location.lat, event.location.lon)
      );
      return distance <= radius;
    });
  };

  const filteredEvents = getEventsInCircle(coordinates, 5000);

  const customIcon = new Icon({
    iconUrl: "placeholder.png",

    iconSize: [38, 38], // size of the icon
  });
  return (
    <>
      {filteredEvents.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.lat, event.location.lon]}
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>
            <h3>{event.name}</h3>
            <p>Type: {event.type}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Capacity: {event.capacity}</p>
            <p>Description: {event.description}</p>
            <p>Amount: ${event.amount.toFixed(2)}</p>
            <p>Address: {event.address}</p>
          </Popup>
        </Marker>
      ))}

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lon]}
          icon={customIcon}
        >
          <Popup>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <img src="lupa.png" alt="Ubicación" className="w-6 h-6" />
                <button
                  onClick={handleClickOutsideMap}
                  className="text-sm text-white rounded-2xl bg-indigo-900"
                >
                  Obtener Eventos
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {showHeatmap && <Heatmap />}

      {coordinates && (
        <Circle
          center={[coordinates.lat, coordinates.lon]}
          radius={5000}
          pathOptions={{
            color: "red",
            fillColor: "rgba(255, 0, 0, 0.1)",
            fillOpacity: 0.1,
          }}
        />
      )}
    </>
  );
};

export default SearchEvent;
