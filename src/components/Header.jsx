import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa'; // Importar iconos
import '@/assets/styles/header.css';

function Header() {
  return (
    <div className='header-container'>
      <Link className="header-link header-user">
        <FaUser className="icon" /> Usuario
      </Link>
      <Link className="header-link header-notification">
        <FaBell className="icon" /> Notificaciones
      </Link>
    </div>
  );
}

export default Header;