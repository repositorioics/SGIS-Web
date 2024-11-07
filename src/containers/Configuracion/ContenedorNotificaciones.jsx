import React, { useState, useEffect } from 'react';
import PaginaNotificaciones from '@/pages/configuracion/PaginaNotificaciones';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useDispatch } from 'react-redux';
import { resetNotifications } from '@/context/slices/notificationSlice';

const ContenedorNotificaciones = () => {
  const dispatch = useDispatch();
  const { data: response, loading, error } = useFetch(`${URL}api/v1/notificacionesusuario`);
  const [noLeidas, setNoLeidas] = useState([]);

  const notificaciones = response?.data || []; // Accede al array de notificaciones

  useEffect(() => {
    if (Array.isArray(notificaciones)) {
      const noLeidas = notificaciones.filter(n => !n.leido);
      setNoLeidas(noLeidas);
    }
  }, [notificaciones]);

  const manejarLeerTodas = () => {
    dispatch(resetNotifications()); // Resetea el contador en el estado global
    setNoLeidas([]); // Marca todas como leídas localmente
  };

  return (
    <PaginaNotificaciones
      notificaciones={notificaciones}
      cargando={loading}
      error={error}
      manejarLeerTodas={manejarLeerTodas}
    />
  );
};

export default ContenedorNotificaciones;