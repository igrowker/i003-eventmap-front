"use client"; // Asegúrate de que este componente sea un Client Component

import React from 'react';

interface EventCardProps {
    title: string;
    eventName: string;
    date: string;
    time: string;
    location: string;
    onButtonClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    eventName,
    date,
    time,
    location,
    onButtonClick,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        !
                    </div>
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <span className="text-red-500 font-semibold ml-auto">Masiva</span> {/* Aquí se aplica ml-auto */}
                </div>
                <p className="text-x2 font-bold text-gray-800">{eventName}</p>
                <p className="text-gray-600">{`${date} a las ${time}`}</p>
                <p className="text-gray-600">{location}</p>
                <div className="flex justify-between items-center mt-2">
                    <button
                        style={{ backgroundColor: '#6750A4' }}
                        className="text-white px-4 py-1 rounded-full transition-colors hover:bg-purple-700"
                        onClick={onButtonClick}
                        >
                        Ir a destino
                    </button>

                </div>
            </div>
        </div>
    );
};

export default EventCard;
