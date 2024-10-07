"use client";

import React, { useState } from "react";
import L from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocateControl from "./LocateControl";

const Map = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative transition-all duration-300 ${isExpanded ? 'h-screen w-full' : 'h-40 w-96'}`}>
      <MapContainer
        className={`absolute top-0 left-0 h-full w-full rounded-2xl z-40`}
        center={[-34.6047, -58.3995]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          icon={new L.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
          })}
          position={[-34.6047, -58.3995]}
        >
          <Popup>
            Ud está No Aquí. <br />
          </Popup>
        </Marker>
        <LocateControl />
      </MapContainer>

      {/* Botón para expandir y contraer el mapa */}
      <button
        onClick={toggleExpand}
        className="absolute top-2 right-2 z-50 bg-white p-2 rounded"
      >
        {isExpanded ? "Contraer Mapa" : "Expandir Mapa"}
      </button>
    </div>
  );
};

export default Map;
