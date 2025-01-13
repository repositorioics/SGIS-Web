import React from "react";
import NotificacionCard from "@/components/notificaciones/NotificacionCard";
import { Loader2, Bell, Check } from "lucide-react";
import '@/assets/styles/notificaciones/paginaNotificaciones.css';

const PaginaNotificaciones = ({
  notificacionesAgrupadas,
  cargando,
  error,
  manejarLeerTodas,
}) => {
  if (cargando) {
    return (
      <div className="loading-container">
        <Loader2 className="loading-icon" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <p className="error-title">Error al cargar las notificaciones</p>
          <p className="error-text">{error.message}</p>
        </div>
      </div>
    );
  }

  const renderSeccion = (titulo, notificaciones) => {
    if (!notificaciones?.length) return null;

    return (
      <div className="notification-section">
        <h3 className="section-title">{titulo}</h3>
        <div className="notifications-grid">
          {notificaciones.map((notificacion) => (
            <NotificacionCard key={notificacion.id} notificacion={notificacion} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <div className="header-title">
            {/* <Bell className="header-icon" /> */}
            <h2 className="page-title">Notificaciones</h2>
          </div>
          <button 
            onClick={manejarLeerTodas} 
            className="mark-all-button"
          >
            <Check className="button-icon" />
            Marcar todas como leídas
          </button>
        </div>

        <div className="notifications-content">
          {renderSeccion("Hoy", notificacionesAgrupadas.hoy)}
          {renderSeccion("Esta Semana", notificacionesAgrupadas.estaSemana)}
          {renderSeccion("Este Mes", notificacionesAgrupadas.esteMes)}
          {renderSeccion("Anteriores", notificacionesAgrupadas.anteriores)}
          
          {Object.values(notificacionesAgrupadas).every(arr => !arr?.length) && (
            <div className="empty-state">
              No hay notificaciones disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaNotificaciones;