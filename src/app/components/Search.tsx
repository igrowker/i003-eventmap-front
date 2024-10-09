// Search.tsx
import React, { useState , useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup , useMap } from "react-leaflet";
import * as L from 'leaflet';
import { LatLngExpression , Icon} from 'leaflet';

interface SearchProps {
  center: [number, number];
  zoom: number;
  onSearchArea?: (bounds: L.LatLngBounds) => void;
}

const Search: React.FC<SearchProps> = ({ center, zoom, onSearchArea }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [radius, setRadius] = useState<number>(500);
  const map = useMap();
  const handleMapClick = (e: any) => {
    setPosition(e.latlng);
  };

  const handleSearchArea = () => {
    if (!position) return;

    const centerLatLng = L.latLng(position);
    const north = centerLatLng.lat + radius / 111000;
    const south = centerLatLng.lat - radius / 111000;
    const east = centerLatLng.lng + radius / 111000;
    const west = centerLatLng.lng - radius / 111000;

    const bounds = L.latLngBounds(
      L.latLng(north, west),
      L.latLng(south, east)
    );

    console.log("Área de búsqueda:", bounds);

    if (onSearchArea) {
      onSearchArea(bounds);
    }

    setPosition(null);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value));
  };

  const customIcon = new Icon({
    iconUrl: "next.svg",

    iconSize: [38, 38] // size of the icon
  });


  useEffect(() => {
    // Agrega el event listener al mapa para detectar clics
    map.on("movestart", handleMapClick);

    // Limpia el event listener cuando el componente se desmonte
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);


  return (
    <>
      
        {position && (
          <Marker position={position} icon={customIcon} >
            <Popup>
              <div className="flex-col mb-96">
                <button onClick={handleSearchArea}>Buscar en esta área</button>
                <input
                  type="number"
                  value={radius}
                  onChange={handleRadiusChange}
                  placeholder="Radio de búsqueda (metros)"
                />
              </div>
            </Popup>
          </Marker>
        )}
      
    </>
  );
};

export default Search;
