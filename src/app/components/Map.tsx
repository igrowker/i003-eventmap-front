"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet.heat";
import LocateControl from "./LocateControl";

import { Location } from "./Location";
import Markers from "./Markers";
import Heatmap from "./Heatmap";
import { usePathname } from "next/navigation";

const Map = () => {
  
  const pathname = usePathname();

  return (
    <MapContainer
    className={`${pathname === "/" ? "w-full h-[180px] rounded-xl m-0.5 border-purple-600 border-2 " : "fullmap"}`}
      center={[-34.603851, -58.381775]}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Location center={[-34.603851, -58.381775]} />
      
      <Heatmap />
      
      <Markers />
      
      <LocateControl />
    </MapContainer>
  );
};

export default Map;
