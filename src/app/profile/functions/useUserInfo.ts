import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { UserInfo } from '@/types/events-types';

const useUserInfo = (userId: any) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const token = Cookies.get('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${userId.sub}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error en la peticion');
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        if (userId) {
            fetchUserInfo();
        }
    }, [userId, token, API_URL]);

    return userInfo;
};

export default useUserInfo;
