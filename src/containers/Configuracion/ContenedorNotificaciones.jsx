import React, { useState, useEffect } from 'react';
import PaginaNotificaciones from '@/pages/configuracion/PaginaNotificaciones';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useDispatch } from 'react-redux';
import { resetNotifications } from '@/context/slices/notificationSlice';

const agruparPorPeriodo = (notificaciones) => {
  const hoy = new Date();
  const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  return {
    hoy: notificaciones.filter(n => new Date(n.fechaNotificacion).toDateString() === new Date().toDateString()),
    estaSemana: notificaciones.filter(
      n => new Date(n.fechaNotificacion) >= inicioSemana && new Date(n.fechaNotificacion) < new Date()
    ),
    esteMes: notificaciones.filter(
      n => new Date(n.fechaNotificacion) >= inicioMes && new Date(n.fechaNotificacion) < inicioSemana
    ),
    anteriores: notificaciones.filter(
      n => new Date(n.fechaNotificacion) < inicioMes
    ),
  };
};

const ContenedorNotificaciones = () => {
  const dispatch = useDispatch();
  const { data: response, loading, error } = useFetch(`${URL}api/v1/notificacionesusuario`);
  const [agrupadas, setAgrupadas] = useState({});
  const [noLeidas, setNoLeidas] = useState([]);

  let notificaciones = response?.data || [];

  // Ordenar las notificaciones por fechaNotificacion de manera descendente
  notificaciones = notificaciones.sort((a, b) => new Date(b.fechaNotificacion) - new Date(a.fechaNotificacion));

  useEffect(() => {
    if (Array.isArray(notificaciones)) {
      const noLeidas = notificaciones.filter(n => !n.leido);
      setNoLeidas(noLeidas);

      const agrupadas = agruparPorPeriodo(notificaciones);
      setAgrupadas(agrupadas);
    }
  }, [notificaciones]);

  const manejarLeerTodas = () => {
    dispatch(resetNotifications());
    setNoLeidas([]);
  };

  return (
    <PaginaNotificaciones
      notificacionesAgrupadas={agrupadas}
      cargando={loading}
      error={error}
      manejarLeerTodas={manejarLeerTodas}
    />
  );
};

export default ContenedorNotificaciones;
