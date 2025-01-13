import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import '@/assets/styles/notificaciones/notificaciones.css';

const NotificacionCard = ({ notificacion }) => {
  const navigate = useNavigate();
  const { titulo, mensaje, fechaNotificacion, leido, id } = notificacion;

  const handleViewMore = () => {
    navigate(`/notificaciones/${id}`);
  };

  return (
    <div className={`notification-card ${!leido ? 'unread' : ''}`}>
      <div className="notification-content">
        <div className="notification-date">
          <Calendar className="date-icon" />
          <span className="date-text">
            {new Date(fechaNotificacion).toLocaleString()}
          </span>
        </div>
        
        <h3 className="notification-title">{titulo}</h3>
        <p className="notification-message">{mensaje}</p>
        
        {!leido && (
          <button
            onClick={handleViewMore}
            className="view-more-button"
          >
            Ver más
            <ArrowRight className="arrow-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificacionCard;