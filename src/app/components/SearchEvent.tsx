import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Popup,
} from "react-leaflet";
import { useState } from "react";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import L, { Icon } from "leaflet";
import Heatmap from "./Heatmap";
import Markers from "./Markers";

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
  const [coordinates, setCoordinates] = useState<Coordinate>({
    lat: -34.60448395867932,
    lon: -58.60448395867932,
  });
  const [markers, setMarkers] = useState<Coordinate[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

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
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  useMapEvent("click", (event) => {
    const latlng = event.latlng;
    setCoordinates({ lat: latlng.lat, lon: latlng.lng });
    setMarkers([...markers, { lat: latlng.lat, lon: latlng.lng }]);
    console.log(latlng);
  });
  const customIcon = new Icon({
    iconUrl: "mylocation.png",

    iconSize: [38, 38], // size of the icon
  });

  return (
    <>
      {events.map((event) => (
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
                <img
                  src="my-location-svgrepo-com.svg"
                  alt="Ubicación"
                  className="w-6 h-6"
                />
                <button onClick={handleClickOutsideMap} className="text-sm">
                  Obtener Eventos
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default SearchEvent;
