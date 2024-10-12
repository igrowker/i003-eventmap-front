"use client"

import { useState, useEffect } from 'react';

interface Event {
    id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    location: {
        lat: number;
        lon: number;
    };
    photos?: string[];
    description: string;
    amount: number;
    createdAt: string;
    userId: string;
    capacity: string;
    addres: string;
}

const useFetchData = (url: string) => {
    const [data, setData] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading };
};

export default useFetchData;
