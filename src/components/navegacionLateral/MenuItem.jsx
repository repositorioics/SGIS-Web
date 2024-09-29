import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const MenuItem = ({ icono, texto, subMenu, menuActivo, manejarClickMenu, indiceMenu }) => (
  <li className={`menu-item ${menuActivo === indiceMenu ? 'activo' : ''}`}>
    <div className="menu-item__cabecera" onClick={() => manejarClickMenu(indiceMenu)}>
      <FontAwesomeIcon icon={icono} className="menu-icono" />
      <div className="menu-texto"><span>{texto}</span></div>
      <FontAwesomeIcon icon={menuActivo === indiceMenu ? faAngleUp : faAngleDown} className="menu-icono" />
    </div>
    {subMenu && (
      <ul className={`sub-menu ${menuActivo === indiceMenu ? 'activo' : ''}`}>
        {subMenu.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default MenuItem;