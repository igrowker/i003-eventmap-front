import React from 'react'
import { useState, useEffect } from "react";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import {  Marker, Popup } from "react-leaflet";


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
    photos?: string[];
    description: string;
    amount: number;
    createdAt: string;
    userId: string;
    capacity: string;
    addres: string;
  }
 const Markers = () => {
    const [data, setData] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "https://i003-eventmap-back.onrender.com/events/all"
            );
            console.log(response);
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const eventData: Event[] = await response.json();
            setData(eventData);
            console.log(eventData);
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <>
    {data.map((event) => (
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
            <p>Address: {event.addres}</p>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Markers


{/* 
          <Popup>
            Intensidad: {point.value.toFixed(2)}
            <br />
            Ubicacion: {formatLatLng(point)}
          </Popup>
        </Marker>
      ))} */}
