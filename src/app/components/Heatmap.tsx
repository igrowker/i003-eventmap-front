import React, { useState, useEffect } from "react";
import L, { ColorGradientConfig } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import HeatmapLayer from "react-leaflet-heat-layer";
import useMapStore from "@/store/mapStore";
import useFetchData from "./utils/useFetchData";

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

  // const [dataMap, setDataMap] = useState<Event[]>([]);  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;  
  const { storeFilterValues, searchAreaPosition } = useMapStore(); 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/events/all`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const eventData: Event[] = await response.json();
  //       setDataMap(eventData);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchData();
  // }, [API_URL]);
  const URL = searchAreaPosition 
        ? `${API_URL}/events?lat=${searchAreaPosition.lat}&lon=${searchAreaPosition.lng}`
        : '';

  const { data } = useFetchData(URL);

  const filteredDataMap = data.filter(event => {
    const matchesType = storeFilterValues.type === "all" || event.type === storeFilterValues.type;
    const matchesDate = storeFilterValues.date === "0" ? true : event.date === storeFilterValues.date; 
    return matchesType && matchesDate;
  });

  return (
    <>
      <HeatmapLayer
        latlngs={filteredDataMap.map((event) => [
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
  );
};

export default Heatmap;
