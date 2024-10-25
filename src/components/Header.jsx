import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'; // Asegurarse de usar el selector para el idioma
import '@/assets/styles/header.css';

function Header() {
  const { t } = useTranslation();
  const language = useSelector((state) => state.idioma.language); // Escuchar el idioma actual

  // Obtener el nombre del usuario desde el estado de autenticación
  const usuario = useSelector((state) => state.autenticacion.usuario); 

  console.log('Idioma en Header:', language); // Verificar el idioma

  return (
    <div className='header-container'>
      <Link className="header-link header-user">
        <FaUser className="icon" />
        {/* Mostrar el nombre del usuario si está autenticado */}
        <span>{usuario}</span> 
      </Link>

      <Link className="header-link header-notification">
        <FaBell className="icon" />
        <span>{t('encabezado.notificaciones')}</span> {/* Traducción del texto "Notificaciones" */}
      </Link>
    </div>
  );
}

export default Header;