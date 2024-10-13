import { useEffect, useState } from "react";
import { getEvents } from "../utils/getEvents";
import { eventTypes } from "../types/events-list-types";

const useGetAllEventsFree = () => {
    const [events, setEvents] = useState<eventTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {

          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          
            try {
              setLoading(true);
              const req = await getEvents(`${API_URL}/events/all`);
              if (!req) setError(true);
              setEvents(req);
              
            } catch (error) {
              setError(true)
              console.error("Error obtener los eventos:", error);
            } finally {
              setLoading(false);
            }
        }

        loadEvents();
    }, []);

    return { events, loading, error };
};

export default useGetAllEventsFree;