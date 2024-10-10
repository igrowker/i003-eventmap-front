import React, { useState } from "react";
import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import { LatLng , Icon } from 'leaflet';

export const Location: React.FC<{ center: [number, number] }> = ({ center }) => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
    console.log(userLocation);
    
  const map = useMapEvents({
    dblclick() {
      map.locate();
    },
    locationfound(e) {
      setUserLocation(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
    },
  });

  const customIcon = new Icon({
    iconUrl: "isotipo.webp",

    iconSize: [38, 38] // size of the icon
  });

  const formatLatLng = (latlng: LatLng) => {
    return `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
  };

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={customIcon}>
      <Popup>Estás Aquí: {formatLatLng(userLocation)}</Popup>
    </Marker>
  );
};
