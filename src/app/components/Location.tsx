import React, { useState } from "react";
import { Marker, Popup, useMapEvents, useMap, Tooltip } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-routing-machine";
import { LatLng, Icon } from "leaflet";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useMapStore from "@/store/mapStore";

export const Location: React.FC<{ center: [number, number] }> = ({center}) => {

  const map = useMap();
  const { searchAreaPosition, setSearchAreaPosition } = useMapStore();

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const [positionOnClick, setPositionOnClick] = useState<LatLng | null>(
    null
  );

  const pathname = usePathname();
  const router = useRouter();

  map.doubleClickZoom.disable();


  const customIcon = new Icon({
    iconUrl: "isotipo.webp",
    iconSize: [38, 38], // size of the icon
  });

  const formatLatLng = (latlng: LatLng) => {
    return `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
  };

  const redirectToMap = () => {
    if (pathname === "/") {
      router.push("/map");
    }
  };
  const zoomToLocation = (latlng : LatLng) => {
    const zoomLevel = 14;
    map.setView(latlng, zoomLevel);

  };

  const mapEvents = useMapEvents({
    dblclick(e) {
      redirectToMap();
      setPositionOnClick(e.latlng);
    },
    locationfound(e) {
      setSearchAreaPosition(e.latlng);
      console.log(positionOnClick);
      zoomToLocation(e.latlng);
    },
  });

  // ENVIAR AL HACER CLICK EN EL BOTON BUSCAR AQUI
  const handleSearchOnArea = () => {
   
    if (positionOnClick) {
      setSearchAreaPosition(positionOnClick);
      console.log(positionOnClick);
      zoomToLocation(positionOnClick);
    }
  };


  return (
    <>
      {/* Mostrar marcador para la ubicación del usuario */}
      {userLocation && (
        <Marker position={searchAreaPosition} icon={customIcon}>
          <Tooltip>Estás Aquí: {formatLatLng(searchAreaPosition)}</Tooltip>
        </Marker>
      )}
      {/* Mostrar marcador para la ubicación del clic */}
      {positionOnClick && (
        <Marker position={positionOnClick} icon={customIcon}>
          <Popup autoClose>
            <button onClick={handleSearchOnArea} className="bg-[#6750A4] text-white font-semibold px-5 py-3 rounded-xl">
              Buscar aqui
            </button>
          </Popup>
        </Marker>
      //   <Marker position={positionOnClick} icon={customAreaIcon}>
      //   <Tooltip>
      //     <button onClick={handleAreaPosition} className="bg-[#6750A4] text-white font-semibold px-5 py-3 rounded-xl">
      //       Buscar aqui
      //     </button>
      //   </Tooltip>
      // </Marker>
      )}
    </>
  );
};
