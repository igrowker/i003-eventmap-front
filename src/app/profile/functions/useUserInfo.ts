import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { UserInfo } from '@/types/events-types';

const useUserInfo = (userId: any) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const token = Cookies.get('auth_token');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://i003-eventmap-back.onrender.com/users/${userId.sub}`, {
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
    }, [userId, token]);

    return userInfo;
};

export default useUserInfo;
