"use client";

import React from 'react';


interface EventCardProps {
    title: string;
    eventName: string;
    date: string;
    time: string;
    addres: string;
    onButtonClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    eventName,
    date,
    time,
    addres,
    onButtonClick,
}) => {
    return (
        <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-2px_-2px_4px_rgba(0,0,0,0.1)] relative">
            <div className="absolute top-4 left-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-2xl">!</span>
            </div>
            <div className="pl-16">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <span className="text-red-500 font-semibold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-6a9 9 0 10-18 0v6h5" /> */}
                            <path d="M16.719 19.7519L16.0785 14.6279C15.8908 13.1266 14.6146 12 13.1017 12H12H10.8983C9.38538 12 8.10917 13.1266 7.92151 14.6279L7.28101 19.7519C7.1318 20.9456 8.06257 22 9.26556 22H12H14.7344C15.9374 22 16.8682 20.9456 16.719 19.7519Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                            <circle cx="4" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
                            <circle cx="20" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M4 14H3.69425C2.71658 14 1.8822 14.7068 1.72147 15.6712L1.38813 17.6712C1.18496 18.8903 2.12504 20 3.36092 20H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 14H20.3057C21.2834 14 22.1178 14.7068 22.2785 15.6712L22.6119 17.6712C22.815 18.8903 21.8751 20 20.6392 20C19.4775 20 18.0952 20 17 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Masiva
                    </span>
                </div>
                <p className="text-xl font-bold text-gray-800">{eventName}</p>
                <p className="text-gray-600">{`${date} a las ${time}`}</p>
                <p className="text-gray-600">{addres}</p>
                <div className="flex justify-start items-center mt-4">
                    <button
                        style={{ backgroundColor: '#6750A4' }}
                        className="text-white px-6 py-2 rounded-full transition-colors hover:bg-purple-700 flex items-center gap-2"
                        onClick={onButtonClick}
                    >
                        Ir a destino
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.293 15.707a1 1 0 001.414-1.414L6.414 9H17a1 1 0 100-2H6.414l5.293-5.293a1 1 0 00-1.414-1.414l-7 7a1 1 0 000 1.414l7 7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
