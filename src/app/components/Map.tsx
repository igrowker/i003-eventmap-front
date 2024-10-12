"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.heat";
import LocateControl from "./LocateControl";
import SearchEvent from "./SearchEvent";
import { Location } from "./Location";
import Markers from "./Markers";



const Map = () => {
  return (
    <>

    <MapContainer

      style={{ height: "100vh", width: "100vw" }}
      center={[-34.603851, -58.381775]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Location center={[-34.603851, -58.381775]} />
      
      <LocateControl />
      <SearchEvent/>
    </MapContainer>
    </>
  );
};

export default Map;

