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
    const [error, setError] = useState(null);

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
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
