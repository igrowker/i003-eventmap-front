import React from 'react'
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";



const LocateControl = createControlComponent(function(props) {
    return new L.Control.Locate({
        ...props,
        position: 'topleft', // Posiciona el control en la esquina superior izquierda
        strings: {
            title: "Mostrar mi ubicación", // Cambia el texto del botón
            popup: "Has sido geolocalizado dentro de un radio de {distance} metros.", // Personaliza el mensaje mostrado cuando se encuentra la ubicación
            
        },
        // keepCurrentOnReCenter: false, // Mantiene la vista actual si el usuario interactúa con el mapa después de la geolocalización
        flyTo: true, // Usa la animación suave para centrar el mapa en la ubicación del usuario
        
    });
});
export default LocateControl