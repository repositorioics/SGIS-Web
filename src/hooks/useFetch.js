import { useNavigate } from 'react-router-dom';

const useFetch = (url, initialOptions = {}, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

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
                    if (response.status === 401) {
                        // Redirige al usuario al login si no está autorizado
                        navigate('/inicio-sesion');
                    }
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