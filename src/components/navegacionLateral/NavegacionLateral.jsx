import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import '@/assets/styles/navegacionLateral.css';
import logo from '@/assets/images/logo.png';
import CambiarTema from '@/components/CambiarTema';
import { useNavegacionLateralLogica } from './NavegacionLateralLogica';

const NavegacionLateral = () => {
  const { menuActivo, manejarClickMenu, manejarCerrarSesion, menuItems, loading, error } = useNavegacionLateralLogica(); // Hook actualizado

  if (loading) {
    return <p>Cargando menús...</p>;
  }

  if (error) {
    return <p>Error al cargar menús: {error.message}</p>;
  }

  return (
    <nav className="navegacion-lateral">
      <div className="navegacion-lateral__cabecera">
        <img src={logo} alt="logo" className="logo-cabecera" width={40} height={40} />
        <h2>ICS Inventario</h2>
      </div>

      <ul className="navegacion-lateral__menu">
        {menuItems && menuItems.sort((a, b) => a.indice - b.indice).map((item, index) =>
          item.submenus ? (
            <MenuItem
              key={item.id}
              icono={item.icono}
              texto={item.nombre}
              subMenu={item.submenus}
              menuActivo={menuActivo}
              manejarClickMenu={manejarClickMenu}
              indiceMenu={item.indice}
            />
          ) : (
            <li className="menu-item" key={item.id}>
              <Link to={item.ruta} className="sin-estilo-enlace">
                <div className="menu-item__cabecera">
                  <FontAwesomeIcon icon={item.icono} className="menu-icono" />
                  <div className="menu-texto"><span>{item.nombre}</span></div>
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