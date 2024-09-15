'use client'

import L from 'leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import LocateControl from './LocateControl'

const Map = () => {

   

    return (
        
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={[-34.6047, -58.3995]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon.src,
                        iconRetinaUrl: MarkerIcon.src,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                } position={[-34.6047, -58.3995]}>
                     <Popup>
                        Ud está No  Aquí. <br />
                    </Popup>
                </Marker>
                <LocateControl />
            </MapContainer>
        
    )
}

export default Map