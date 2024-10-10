import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const useDecodedToken = () => {
    const [userId, setUserId] = useState(null);
    const token = Cookies.get('auth_token'); 
    useEffect(() => {
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                setUserId(decodedToken);
            } catch (error) {
                console.error("Error al obtener token", error);
                setUserId(null);
            }
        } else {
            setUserId(null);
        }
    }, [token]);

    return { userId };
};

export default useDecodedToken;
