import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

const LocateControl = createControlComponent(function(props) {
    return new L.Control.Locate({
        ...props,
        position: 'topleft', //  
        strings: {
            title: "Mostrar mi ubicación", // Cambia el texto del botón
            popup: "Ubicación Actual", // Personaliza el mensaje mostrado cuando se encuentra la ubicación
            
        },
        flyTo: false, // Usa la animación suave para centrar el mapa en la ubicación del usuario
        drawMarker: true
        
    });
});
export default LocateControl