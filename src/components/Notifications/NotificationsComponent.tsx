"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import EventCard from './NotificationCard';

export const NotificationsComponent = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/all`);
                const result = await request.json();
                setEvents(result.filter((event: any) => event.amount >= 0.8));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="py-5 px-4">
            <Link href={"/"}>
                <BiArrowBack className="mb-4" size={24} color="black" />
            </Link>

            <h1 className="font-bold text-2xl text-black">Notificaciones</h1>

            <div className="flex flex-col items-center gap-4 py-6">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <EventCard
                            key={index}
                            title="Evento destacado"
                            eventName={event.name}
                            date={event.date}
                            time={event.time}
                            addres={event.addres}
                            onButtonClick={() => window.location.href = `/events/${event.id}`}
                        />
                    ))
                ) : (
                    <p>No hay eventos destacados en este momento.</p>
                )}
            </div>
        </div>
    );
};