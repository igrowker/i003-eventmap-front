"use client";

import React, { useState } from "react";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import L, { ColorGradientConfig } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet.heat";
import LocateControl from "./LocateControl";
import HeatmapLayer from "react-leaflet-heat-layer";
// import Search from "./search"
import { Location } from "./Location";

interface AddressPoint {
  lat: number;
  lng: number;
  value: number;
}

const gradientConfig: ColorGradientConfig = {
  0: "#0000FF", // Azul oscuro
  0.1: "#00FFFF", // Azul claro
  0.3: "#FFFFFF", // Blanco
  0.5: "#0000FF", // Rojo
  0.7: "#FFA500", // Naranja
  1: "#FF0000", // Rojo
};

const addressPoints: AddressPoint[] = [
  { lat: -34.5828, lng: -58.4158, value: 0.95 },
  { lat: -34.604, lng: -58.3818, value: 0.92 },
  { lat: -34.5833, lng: -58.3833, value: 0.85 },
  { lat: -34.6056, lng: -58.3792, value: 0.8 },
  { lat: -34.5972, lng: -58.3845, value: 0.75 },
  { lat: -34.6039, lng: -58.3818, value: 0.7 },
  { lat: -34.5917, lng: -58.3783, value: 0.65 },
  { lat: -34.5878, lng: -58.3822, value: 0.6 },
  { lat: -34.5853, lng: -58.3808, value: 0.55 },
  { lat: -34.5829, lng: -58.3836, value: 0.5 },
  { lat: -34.5806, lng: -58.3812, value: 0.45 },
  { lat: -34.5783, lng: -58.3788, value: 0.4 },
  { lat: -34.576, lng: -58.3764, value: 0.35 },
  { lat: -34.6185, lng: -58.3733, value: 0.3 },
  { lat: -34.6272, lng: -58.3629, value: 0.25 },
  { lat: -34.6359, lng: -58.3525, value: 0.55 },
  { lat: -34.5913, lng: -58.4584, value: 0.3 },
  { lat: -34.5831, lng: -58.41, value: 0.3 },
  { lat: -34.569289, lng: -58.415054, value: 0.25 },
  { lat: -34.587663, lng: -58.393553, value: 0.25 },
  { lat: -34.6511, lng: -58.4621, value: 0.25 },
  { lat: -34.6231, lng: -58.3941, value: 0.3 },
  { lat: -34.607, lng: -58.4343, value: 0.44 },
];

const Map = () => {
  const formatLatLng = (latlng: any) => {
    //chequear esto
    return `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={[ -34.603851, -58.381775]}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Location center={[-34.603851, -58.381775]}  />

      {/* Heatmap Layer */}
      <HeatmapLayer
        latlngs={addressPoints.map((point) => [
          point.lat,
          point.lng,
          point.value / 100, // Normalizo el valor a un rango 0-1
        ])}
        radius={30}
        blur={20}
        maxZoom={15}
        max={1}
        gradient={gradientConfig}
        minOpacity={0.8}
      />

      {/* <Search
        center={[-34.603851, -58.381775]}
        zoom={15}
        onSearchArea={(bounds) => {
          console.log("Área seleccionada:", bounds);
        }}
      /> */}

      {/* Marcadores personalizados */}
      {addressPoints.map((point) => (
        <Marker
          key={`${point.lat}-${point.lng}`}
          position={[point.lat, point.lng]}
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
            Intensidad: {point.value.toFixed(2)}
            <br />
            Ubicacion: {formatLatLng(point)}
          </Popup>
        </Marker>
      ))}

      <LocateControl />
    </MapContainer>
  );
};

export default Map;
