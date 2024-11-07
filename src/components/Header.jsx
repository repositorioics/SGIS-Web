import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import notificationSocket from '@/config/NotificationSocket';
import { resetNotifications } from '@/context/slices/notificationSlice';
import '@/assets/styles/header.css';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook para navegación
  const dispatch = useDispatch();
  
  const language = useSelector((state) => state.idioma.language);
  const usuario = useSelector((state) => state.autenticacion.usuario);
  const notificationCount = useSelector((state) => state.notifications.count);

  // Conectar el WebSocket y limpiar al desmontar
  useEffect(() => {
    const disconnectSocket = notificationSocket(); // Conecta el WebSocket
    return () => disconnectSocket(); // Desconecta al desmontar
  }, []);

  // Maneja la navegación a la página de notificaciones y resetea el contador
  const manejarClickNotificaciones = () => {
    navigate('/notificaciones'); // Redirige a la página de notificaciones
    dispatch(resetNotifications()); // Reinicia el contador de notificaciones
  };

  return (
    <div className="header-container">
      <Link className="header-link header-user">
        <FaUser className="icon" />
        <span>{usuario}</span>
      </Link>

      <div className="header-link header-notification" onClick={manejarClickNotificaciones}>
        <FaBell className="icon" />
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount}</span>
        )}
      </div>
    </div>
  );
}

export default Header;