// src/components/NotificacionCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/assets/styles/notificaciones/notificaciones.css';

const NotificacionCard = ({ notificacion }) => {
  const navigate = useNavigate();
  const { titulo, mensaje, fechaNotificacion, leido } = notificacion;

  // Redirige a la página de detalles de la notificación
  const manejarVerMas = () => {
    navigate(`/notificaciones/${notificacion.id}`);
  };

  return (
    <div className={`tarjeta-notificacion ${!leido ? 'no-leida' : ''}`}>
      <div className="contenido-notificacion">
      <small className="fecha-notificacion">{new Date(fechaNotificacion).toLocaleString()}</small>
        <div className="content">
        <h3 className="titulo-notificacion">{titulo}:</h3>
        <p className="mensaje-notificacion">{mensaje}.</p>
        </div>
      </div>
      <div className="acciones-notificacion">
        {!leido && (
          <button onClick={manejarVerMas} className="boton-ver-mas">
            Ver más
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificacionCard;