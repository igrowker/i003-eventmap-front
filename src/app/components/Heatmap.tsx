import React from 'react'
import L, { ColorGradientConfig } from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import HeatmapLayer from "react-leaflet-heat-layer";

const gradientConfig: ColorGradientConfig = {
    0: "#0000FF", // Azul oscuro
    0.1: "#00FFFF", // Azul claro
    0.3: "#FFFFFF", // Blanco
    0.5: "#0000FF", // Rojo
    0.7: "#FFA500", // Naranja
    1: "#FF0000", // Rojo
  };
  
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

 const Heatmap = () => {
    const [dataMap, setDataMap] = useState<Event[]>([]);

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
            setDataMap(eventData);
            console.log(eventData);
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <>
    <HeatmapLayer
        latlngs={dataMap.map((event) => [
          event.location.lat,
          event.location.lon,
          event.amount,
        ])}
        radius={40}
        blur={20}
        maxZoom={15}
        max={1}
        gradient={gradientConfig}
        minOpacity={0.8}
      />
    </>
  )
}

export default Heatmap
