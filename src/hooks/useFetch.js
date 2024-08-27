import { useState, useEffect } from 'react';
import { obtenerToken } from '@/utils/almacenamiento';

const useFetch = (url, initialOptions = {}, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            // Si la URL es null, no hacemos nada
            setLoading(false);
            return;
        }

        // Obtener el token de acceso desde el almacenamiento local
        const token = obtenerToken('accessToken');

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    ...initialOptions,
                    headers: {
                        ...initialOptions.headers,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
};

export default useFetch;