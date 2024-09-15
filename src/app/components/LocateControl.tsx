import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

interface LocateOptions extends L.Control.LocateOptions {
    startDirectly: any;
}

const LocateControl = (props: LocateOptions) => {
  useEffect(() => {
    const lc = new L.Control.Locate(props);
    
    if (props.startDirectly) {
      lc.start();
    }

    return () => {
      lc.remove();
    };
  }, [props]);

  return null;
};

export default LocateControl;