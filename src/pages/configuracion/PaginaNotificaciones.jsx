// src/pages/PaginaNotificaciones.jsx
import React from "react";
import NotificacionCard from "@/components/notificaciones/NotificacionCard";
import Cargador from "@/components/Cargador";
import MensajeError from "@/components/MensajeError";
import "@/assets/styles/notificaciones/notificaciones.css";

const PaginaNotificaciones = ({
  notificaciones,
  cargando,
  error,
  manejarLeerTodas,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-notificaciones">
      <div className="cabecera-notificaciones">
        <h2>Notificaciones</h2>
        <button onClick={manejarLeerTodas} className="boton-leer-todas">
          Marcar todas como leídas
        </button>
      </div>
      <div className="lista-notificaciones">
  {Array.isArray(notificaciones) && notificaciones.length > 0 ? (
    notificaciones.map((notificacion) => (
      <NotificacionCard key={notificacion.id} notificacion={notificacion} />
    ))
  ) : (
    <p>No hay notificaciones disponibles.</p>
  )}
</div>
    </div>
  );
};

export default PaginaNotificaciones;
