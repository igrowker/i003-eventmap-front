"use client";

import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';


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
                    <h2 className="font-semibold text-base">{title}</h2>
                    <span className="text-[#CA2121] text-xs font-normal flex items-center gap-1">
                    <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M2.7 0.200195C3.09782 0.200195 3.47936 0.358231 3.76066 0.639535C4.04197 0.92084 4.2 1.30237 4.2 1.7002C4.2 2.09802 4.04197 2.47955 3.76066 2.76086C3.47936 3.04216 3.09782 3.2002 2.7 3.2002C2.30218 3.2002 1.92064 3.04216 1.63934 2.76086C1.35804 2.47955 1.2 2.09802 1.2 1.7002C1.2 1.30237 1.35804 0.92084 1.63934 0.639535C1.92064 0.358231 2.30218 0.200195 2.7 0.200195ZM9.6 0.200195C9.99783 0.200195 10.3794 0.358231 10.6607 0.639535C10.942 0.92084 11.1 1.30237 11.1 1.7002C11.1 2.09802 10.942 2.47955 10.6607 2.76086C10.3794 3.04216 9.99783 3.2002 9.6 3.2002C9.20218 3.2002 8.82064 3.04216 8.53934 2.76086C8.25804 2.47955 8.1 2.09802 8.1 1.7002C8.1 1.30237 8.25804 0.92084 8.53934 0.639535C8.82064 0.358231 9.20218 0.200195 9.6 0.200195ZM0 5.80082C0 4.69645 0.89625 3.8002 2.00063 3.8002H2.80125C3.09938 3.8002 3.3825 3.86582 3.6375 3.98207C3.61313 4.11707 3.60188 4.2577 3.60188 4.4002C3.60188 5.11645 3.91688 5.75957 4.41375 6.2002C4.41 6.2002 4.40625 6.2002 4.40063 6.2002H0.399375C0.18 6.2002 0 6.0202 0 5.80082ZM7.59938 6.2002C7.59563 6.2002 7.59188 6.2002 7.58625 6.2002C8.085 5.75957 8.39813 5.11645 8.39813 4.4002C8.39813 4.2577 8.385 4.11895 8.3625 3.98207C8.6175 3.86395 8.90063 3.8002 9.19875 3.8002H9.99938C11.1038 3.8002 12 4.69645 12 5.80082C12 6.02207 11.82 6.2002 11.6006 6.2002H7.59938ZM4.2 4.4002C4.2 3.92281 4.38964 3.46497 4.72721 3.1274C5.06477 2.78984 5.52261 2.6002 6 2.6002C6.47739 2.6002 6.93523 2.78984 7.27279 3.1274C7.61036 3.46497 7.8 3.92281 7.8 4.4002C7.8 4.87759 7.61036 5.33542 7.27279 5.67299C6.93523 6.01055 6.47739 6.2002 6 6.2002C5.52261 6.2002 5.06477 6.01055 4.72721 5.67299C4.38964 5.33542 4.2 4.87759 4.2 4.4002ZM2.4 9.29957C2.4 7.91957 3.51937 6.8002 4.89937 6.8002H7.10063C8.48063 6.8002 9.6 7.91957 9.6 9.29957C9.6 9.5752 9.37687 9.8002 9.09937 9.8002H2.90062C2.625 9.8002 2.4 9.57707 2.4 9.29957Z"
                        fill="#B41D1D"
                        />
                    </svg>
                        Masiva
                    </span>
                </div>
                <p className="text-sm font-normal text-gray-800">{eventName}</p>
                <p className="text-gray-600 font-semibold text-xs mb-2">{`${date} a las ${time}`}</p>
                <p className="text-gray-600 font-semibold text-xs">{addres}</p>
                <div className="flex justify-start items-center mt-4">
                    <button
                        style={{ backgroundColor: '#6750A4' }}
                        className="text-white px-6 py-2 rounded-full transition-colors hover:bg-purple-700 flex items-center gap-2 text-xs font-semibold"
                        onClick={onButtonClick}
                    >
                        Ir a destino
                        <FaLocationArrow />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
