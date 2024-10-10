"use client";

import Link from 'next/link';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import EventCard from './NotificationCard';

export const NotificationsComponent = () => {
    return (
        <>
            <div className="py-5 px-4">
                <Link href={"/"}>
                    <BiArrowBack className="mb-4" size={24} color="black" />
                </Link>

                <h1 className="font-bold text-2xl text-black">Notificaciones</h1>

                <div className="flex flex-col items-center gap-4 py-6">
                    <EventCard
                        title="Evento destacado"
                        eventName="Recital Ciro y los Persas"
                        date="Viernes 31 de Octubre de 2024"
                        time="21 hs"
                        location="Anfiteatro Municipal - Las Heras 234"
                        onButtonClick={() => window.open('https://maps.google.com')}
                    />
                </div>
            </div>
        </>
    );
};
