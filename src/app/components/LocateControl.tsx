import React from 'react'
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { MdOutlineMyLocation } from "react-icons/md";




const LocateControl = createControlComponent(function(props) {
    return new L.Control.Locate({
        ...props,
        position: 'bottomright', //  
        strings: {
            title: "Mostrar mi ubicación", // Cambia el texto del botón
            popup: "Has sido geolocalizado dentro de un radio de {distance} metros.", // Personaliza el mensaje mostrado cuando se encuentra la ubicación
            
        },
        
        flyTo: true, // Usa la animación suave para centrar el mapa en la ubicación del usuario
        drawMarker: true,
        //  icon: locate,
        //  iconElementTag:'div'
        
    });
});
export default LocateControl 


