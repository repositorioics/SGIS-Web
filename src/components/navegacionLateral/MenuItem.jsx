import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const MenuItem = ({ texto, subMenu, menuActivo, manejarClickMenu, indiceMenu }) => {
  const { t } = useTranslation();

  return (
    <li className={`menu-item ${menuActivo === indiceMenu ? 'activo' : ''}`}>
      <div className="menu-item__cabecera" onClick={() => manejarClickMenu(indiceMenu)}>
        <div className="menu-texto">
          <span>{t(`menus.${texto.toLowerCase().replace(/\s+/g, '_')}`)}</span>
        </div>
        <FontAwesomeIcon icon={menuActivo === indiceMenu ? faAngleUp : faAngleDown} className="menu-icono" />
      </div>

      {subMenu && (
        <ul
          className={`sub-menu`}
          style={{
            maxHeight: menuActivo === indiceMenu ? '500px' : '0',
            opacity: menuActivo === indiceMenu ? 1 : 0,
            overflow: 'hidden',
          }}
        >
          {subMenu.map((item) => (
            <li key={item.id}>
              <Link to={item.ruta}>
                {console.log(`Clave generada desde MenuItems componente: menus.${item.nombre.toLowerCase().replace(/\s+/g, '_')}`)}
                {t(`menus.${item.nombre.toLowerCase().replace(/\s+/g, '_')}`)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;