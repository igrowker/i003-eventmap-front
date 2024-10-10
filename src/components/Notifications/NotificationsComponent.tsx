import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import EventCard from './NotificationCard';

export const NotificationsComponent = () => {
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const request = await fetch(`http://localhost:3000/events/all`);
                const result = await request.json();
                setEvents(result.filter((event: any) => event.amount >= 0.8));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const [events, setEvents] = useState([]);

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
                    <button onClick={() => console.log(events)}>Obtener eventos</button>
                </div>
            </div>
        </>
    );
};
