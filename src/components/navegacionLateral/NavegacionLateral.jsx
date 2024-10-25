import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import '@/assets/styles/navegacionLateral.css';
import logo from '@/assets/images/logo.png';
import { useNavegacionLateralLogica } from './NavegacionLateralLogica';
import { useTranslation } from 'react-i18next';
import CambiarIdioma from '@/components/CambiarIdioma';

const NavegacionLateral = React.memo(() => {
  const { menuActivo, manejarClickMenu, manejarCerrarSesion, menuItems, loading, error } = useNavegacionLateralLogica();
  const { t } = useTranslation(); // Hook para manejar la traducción

  // Mostrar un mensaje de carga mientras los menús se están obteniendo
  if (loading) {
    return <p>{t('navegacion.cargando')}</p>;
  }

  // Mostrar un mensaje de error si no se pueden cargar los menús
  if (error) {
    return <p>{t('navegacion.error', { error: error.message })}</p>;
  }

  // Mostrar un mensaje si no hay menús disponibles
  if (!menuItems || menuItems.length === 0) {
    return <p>{t('navegacion.sin_menus')}</p>;
  }

  return (
    <nav className="navegacion-lateral">
      <div className="navegacion-lateral__cabecera">
        <img src={logo} alt="logo" className="logo-cabecera" />
        <h2>{t('titulo.ics_inventario')}</h2>
      </div>

      {/* Lista de menús principales, ordenada por el índice */}
      <ul className="navegacion-lateral__menu">
        {menuItems.sort((a, b) => a.indice - b.indice).map((item, index) =>
          // Si el ítem tiene submenús, renderizar `MenuItem` con submenú
          item.submenus ? (
            <MenuItem
              key={item.id}
              texto={item.nombre}  // Nombre del ítem del menú
              subMenu={item.submenus}  // Submenú asociado al ítem (si existe)
              menuActivo={menuActivo}  // Estado del menú activo
              manejarClickMenu={manejarClickMenu}  // Función para manejar clicks en el menú
              indiceMenu={item.indice}  // Índice del menú
            />
          ) : (
            // Si no tiene submenús, renderizar el ítem de menú estándar
            <li className="menu-item" key={item.id}>
              <Link to={item.ruta} className="sin-estilo-enlace">
                <div className="menu-item__cabecera">
                  {console.log(`Clave generada desde NavegacionLateral Componente: menus.${item.nombre.toLowerCase().replace(/\s+/g, '_')}`)}
                  <span>{t(`menus.${item.nombre.toLowerCase().replace(/\s+/g, '_')}`)}</span>
                </div>
              </Link>
            </li>
          )
        )}
      </ul>

      <div className="navegacion-lateral__pie">
      {/* Añadir el componente de cambiar idioma */}
      <ul className="navegacion-lateral__menu">
            <CambiarIdioma />
      </ul>

        {/* Botón de Cerrar sesión */}
        <ul className="navegacion-lateral__menu" onClick={manejarCerrarSesion}>
          <li className="menu-item__cabecera">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icono cerrar-sesion" />
            <div className="menu-texto cerrar-sesion">
              <span>{t('navegacion.cerrar_sesion')}</span>
            </div>
          </li>
        </ul>
    </div>
    </nav>
  );
});

export default NavegacionLateral;