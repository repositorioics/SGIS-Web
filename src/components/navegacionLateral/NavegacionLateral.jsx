import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import '@/assets/styles/navegacionLateral.css';
import logo from '@/assets/images/logo.png';
import CambiarTema from '@/components/CambiarTema';
import { useNavegacionLateralLogica } from './NavegacionLateralLogica';
import { menuItems } from '@/constants/menuOptions';

const NavegacionLateral = () => {
  const { menuActivo, manejarClickMenu, manejarCerrarSesion } = useNavegacionLateralLogica(); // Asegúrate de estar usando este hook correctamente

  return (
    <nav className={`navegacion-lateral`}>
      <div className="navegacion-lateral__cabecera">
        <img src={logo} alt="logo" className="logo-cabecera" width={40} height={40} />
        <h2>ICS Inventario</h2>
      </div>
      <ul className="navegacion-lateral__menu">
        {menuItems.map((item, index) =>
          item.subMenu ? (
            <MenuItem
              key={index}
              icono={item.icono}
              texto={item.texto}
              subMenu={item.subMenu}
              menuActivo={menuActivo}
              manejarClickMenu={manejarClickMenu}
              indiceMenu={item.indice}
            />
          ) : (
            <li className="menu-item" key={index}>
              <Link to={item.path} className="sin-estilo-enlace">
                <div className="menu-item__cabecera">
                  <FontAwesomeIcon icon={item.icono} className="menu-icono" />
                  <div className="menu-texto"><span>{item.texto}</span></div>
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="navegacion-lateral__pie">
        <CambiarTema />
        <ul className="navegacion-lateral__menu" onClick={manejarCerrarSesion}>
          <li className="menu-item__cabecera">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icono cerrar-sesion" />
            <div className="menu-texto cerrar-sesion"><span>Cerrar Sesión</span></div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavegacionLateral;