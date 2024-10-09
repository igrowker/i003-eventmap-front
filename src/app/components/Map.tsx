"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer} from "react-leaflet";
import "leaflet.heat";
import LocateControl from "./LocateControl";
// import Search from "./search"
import { Location } from "./Location";
import Markers from "./Markers";
import Heatmap from "./Heatmap";

// const addressPoints: AddressPoint[] = [
//   { lat: -34.5828, lng: -58.4158, value: 0.95 },
//   { lat: -34.604, lng: -58.3818, value: 0.92 },
//   { lat: -34.5833, lng: -58.3833, value: 0.85 },
//   { lat: -34.6056, lng: -58.3792, value: 0.8 },
//   { lat: -34.5972, lng: -58.3845, value: 0.75 },
//   { lat: -34.6039, lng: -58.3818, value: 0.7 },
//   { lat: -34.5917, lng: -58.3783, value: 0.65 },
//   { lat: -34.5878, lng: -58.3822, value: 0.6 },
//   { lat: -34.5853, lng: -58.3808, value: 0.55 },
//   { lat: -34.5829, lng: -58.3836, value: 0.5 },
//   { lat: -34.5806, lng: -58.3812, value: 0.45 },
//   { lat: -34.5783, lng: -58.3788, value: 0.4 },
//   { lat: -34.576, lng: -58.3764, value: 0.35 },
//   { lat: -34.6185, lng: -58.3733, value: 0.3 },
//   { lat: -34.6272, lng: -58.3629, value: 0.25 },
//   { lat: -34.6359, lng: -58.3525, value: 0.55 },
//   { lat: -34.5913, lng: -58.4584, value: 0.3 },
//   { lat: -34.5831, lng: -58.41, value: 0.3 },
//   { lat: -34.569289, lng: -58.415054, value: 0.25 },
//   { lat: -34.587663, lng: -58.393553, value: 0.25 },
//   { lat: -34.6511, lng: -58.4621, value: 0.25 },
//   { lat: -34.6231, lng: -58.3941, value: 0.3 },
//   { lat: -34.607, lng: -58.4343, value: 0.44 },
// ];

// const dataMap :  Event[]=[
//   {
//   "id": "4fdbcb80-0d17-4ac5-a8dc-d9fd7495df16",
//   "name": "eventoPrueba2",
//   "type": "Deportivo",
//   "date": "2024-12-12",
//   "time": "14:45",
//   "location": {
//   "lat": -34.5828,
//   "lon": -58.4158
//   },
//   "photos": [
//   "https://res.cloudinary.com/dtbbcg1k2/image/upload/v1728006928/tvfbyuiwgawihhiir5dn.jpg",
//   "https://res.cloudinary.com/dtbbcg1k2/image/upload/v1728006929/cy4qvuxcqtqy8hjysrij.jpg"
//   ],
//   "description": "descripcion evento prueba",
//   "amount": 0.5,
//   "createdAt": "2024-09-27T23:22:08.421Z",
//   "userId": "23fb3d5c-6885-432c-b58b-1eb760bc1f7c",
//   "capacity": "Entre 2000 y 5000",
//   "addres": "Independencia 1236"
//   },
//   {
//   "id": "96f71d30-e8a8-4ad5-88db-aebf1d5a635e",
//   "name": "eventoPrueba2",
//   "type": "Deportivo",
//   "date": "2024-12-12",
//   "time": "14:45",
//   "location": {
//   "lat": -34.604,
//   "lon": -58.3818
//   },
//   "photos": [
//   "https://res.cloudinary.com/dtbbcg1k2/image/upload/v1728009480/k0uct6kpkagpfcdcc8lj.jpg",
//   "https://res.cloudinary.com/dtbbcg1k2/image/upload/v1728009480/yqsvh5rvnzgodp82tcvd.jpg"
//   ],
//   "description": "descripcion evento prueba",
//   "amount": 0.5,
//   "createdAt": "2024-09-27T23:22:08.421Z",
//   "userId": "23fb3d5c-6885-432c-b58b-1eb760bc1f7c",
//   "capacity": "Entre 2000 y 5000",
//   "addres": "Independencia 1236"
//   },
//   {
//   "id": "507c2afa-fbed-4a08-9048-7c7379ca8cf0",
//   "name": "EventoPrueba 001",
//   "type": "Gastronomico",
//   "date": "2024-09-12",
//   "time": "15:45",
//   "location": {
//   "lat": -45.12,
//   "lon": -50.45
//   },
//   "photos": [],
//   "description": "EventoPruebasldkajkldas",
//   "amount": 0.5,
//   "createdAt": "2024-10-06T13:03:15.186Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 2000 y 5000",
//   "addres": "Independencia 1236"
//   },
//   {
//   "id": "cf4a61a4-f046-4974-83c2-252e6a927e3c",
//   "name": "Evento002",
//   "type": "Gastronomico",
//   "date": "2024-12-12",
//   "time": "15:45",
//   "location": {
//   "lat": -45.12,
//   "lon": -50.45
//   },
//   "photos": [],
//   "description": "EventoPruebasldkajkldas",
//   "amount": 0.5,
//   "createdAt": "2024-10-06T13:10:38.487Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211"
//   },
//   {
//   "id": "43497b46-3727-4076-8328-16508fbd3ff5",
//   "name": "Evento003",
//   "type": "Gastronomico",
//   "date": "2024-09-12",
//   "time": "16:30",
//   "location": {
//   "lat": -45.12,
//   "lon": -50.45
//   },
//   "photos": [],
//   "description": "EventoPruebasldkajkldas",
//   "amount": 0.1,
//   "createdAt": "2024-10-06T13:11:26.319Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211"
//   },
//   {
//   "id": "a05ecce0-570e-49e9-84e6-b21ecf7ed937",
//   "name": "Evento004",
//   "type": "Gastronomico",
//   "date": "2024-11-15",
//   "time": "14:10",
//   "location": {
//   "lat": -46.12,
//   "lon": -38.45
//   },
//   "photos": [],
//   "description": "EventoPruebasldkajkldas",
//   "amount": 0.5,
//   "createdAt": "2024-10-06T13:12:02.002Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211"
//   },
//   {
//   "id": "d92eda22-06a3-4ba6-86c3-69d583d90e3f",
//   "name": "Evento004",
//   "type": "Gastronomico",
//   "date": "2024-11-15",
//   "time": "14:10",
//   "location": {
//   "lat": -46.12,
//   "lon": -38.45
//   },
//   "photos": [],
//   "description": "EventoPruebasldkajkldas",
//   "amount": 0.5,
//   "createdAt": "2024-10-06T18:39:56.542Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211, Calle 13 y 14"
//   },
//   {
//   "id": "7a4d752b-22e9-4d25-b9c9-32c104d41a58",
//   "name": "Evento005 dasdas dasdasd asddsad",
//   "type": "Gastronomico",
//   "date": "2024-11-15",
//   "time": "14:10",
//   "location": {
//   "lat": -36.12,
//   "lon": -38.45
//   },
//   "photos": [],
//   "description": "EventoPruebas asdasd asdasd assdads adasd as",
//   "amount": 0.3,
//   "createdAt": "2024-10-06T21:39:34.073Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211, Calle 13 y 14 dasadssdaasd daadasdsa dsasa"
//   },
//   {
//   "id": "33f9f444-3f38-45e5-b127-7973b90fc027",
//   "name": "Evento006 dasdas dasdasd asddsadasdddddddddddddddddddddddddddd",
//   "type": "Gastronomico",
//   "date": "2024-11-15",
//   "time": "14:10",
//   "location": {
//   "lat": -36.12,
//   "lon": -38.45
//   },
//   "photos": [],
//   "description": "EventoPruebas asdasd asdasd assdads adasd dsadssdsadsadasdasdasdsdasdasasdasdasdsaadasdasdasdasdasd",
//   "amount": 0.9,
//   "createdAt": "2024-10-06T21:40:15.980Z",
//   "userId": "832585b9-ccb5-4e38-889f-118b91fc574e",
//   "capacity": "Entre 500 y 2000",
//   "addres": "Independencia 21211, Calle 13 y 14 dasadssdaasd daadasdsa dsasasdsadas"
//   }
//   ]
const Map = () => {
  const formatLatLng = (latlng: { lat: number; lon: number }) => {
    return `${latlng.lat.toFixed(4)}, ${latlng.lon.toFixed(4)}`;
  };

  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
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
      {/* <Search
        center={[-34.603851, -58.381775]}
        zoom={15}
        onSearchArea={(bounds) => {
          console.log("Área seleccionada:", bounds);
        }}
      /> */}
    </MapContainer>
  );
};

export default Map;
