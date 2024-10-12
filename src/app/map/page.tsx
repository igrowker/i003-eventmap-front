"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.heat";
import LocateControl from "../components/LocateControl";

import { Location } from "../components/Location";
import { useState } from "react";
import Markers from "../components/Markers";
import Heatmap from "../components/Heatmap";
import { usePathname } from "next/navigation";
import FilterComponent from "@/components/FilterByType/FilterComponent";
import useMapStore from "@/store/mapStore";

function FullMap() {
  const { currentEvent, showModal, setShowModal } = useMapStore();

  const pathname = usePathname();

  return (
    <div className="flex flex-col z-50">
      <div>
        <MapContainer
          className={`${
            pathname === "/"
              ? "w-full h-[180px] rounded-xl m-0.5 border-purple-600 border-2 "
              : "fullmap"
          }`}
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
          <div className="absolute top-0 right-0 z-[9999] bg-white rounded-md shadow-lg flex w-full">
            <FilterComponent />
          </div>
          {showModal && (
            <div className="absolute flex flex-col bottom-10 z-[9999] bg-white rounded-md shadow-lg w-[90%] h-[184px] m-auto">
              <div></div>
              <div className="text-end flex">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.4978 2.59872C12.4982 2.59883 12.4985 2.599 12.4991 2.59964L13.4005 3.50104C13.4012 3.50168 13.4014 3.50198 13.4015 3.50236C13.4016 3.50271 13.4016 3.50308 13.4015 3.50343C13.4014 3.50379 13.4012 3.50409 13.4005 3.50473L8.90518 8.00009L13.4005 12.4954C13.4012 12.4961 13.4014 12.4964 13.4015 12.4967C13.4016 12.4971 13.4016 12.4975 13.4015 12.4978C13.4014 12.4982 13.4012 12.4985 13.4005 12.4991L12.4991 13.4005C12.4985 13.4012 12.4982 13.4014 12.4978 13.4015C12.4975 13.4016 12.4971 13.4016 12.4967 13.4015C12.4964 13.4014 12.4961 13.4012 12.4954 13.4005L8.00009 8.90518L3.50473 13.4005C3.50411 13.4012 3.50379 13.4014 3.50343 13.4015C3.50308 13.4016 3.5027 13.4016 3.50234 13.4015C3.502 13.4014 3.50168 13.4012 3.50104 13.4005L2.59964 12.4991C2.599 12.4985 2.59883 12.4982 2.59872 12.4978C2.59861 12.4975 2.59861 12.4971 2.59872 12.4967C2.59883 12.4964 2.599 12.4961 2.59964 12.4954L7.09498 8.00009L2.59964 3.50473C2.599 3.50411 2.59883 3.50379 2.59872 3.50343C2.59861 3.50308 2.59861 3.5027 2.59872 3.50234C2.59883 3.502 2.599 3.50168 2.59964 3.50104L3.50104 2.59964C3.50168 2.599 3.50198 2.59883 3.50236 2.59872C3.50271 2.59861 3.50308 2.59861 3.50343 2.59872C3.50379 2.59883 3.50409 2.599 3.50473 2.59964L8.00009 7.09498L12.4954 2.59964C12.4961 2.599 12.4964 2.59883 12.4967 2.59872C12.4971 2.59861 12.4975 2.59861 12.4978 2.59872H12.4978Z"
                    fill="black"
                  />
                </svg>

                <h1>{currentEvent.name}</h1>
                <p>Type: {currentEvent.type}</p>
                <p>Date: {currentEvent.date}</p>
              </div>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          )}
        </MapContainer>
        
      </div>
    </div>
    
  )
}

export default FullMap;
