import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Asegúrate de que 'Link' esté importado desde 'react-router-dom'
import SideNavigationLayout from './SideNavigation';
import { alternarTema } from '@/context/slices/temaSlice';
import { cerrarSesion } from '@/context/slices/autenticacionSlice';
import { menuOpciones } from '@/constants/menuOptions';
import { eliminarToken } from '@/utils/almacenamiento';

const SideNavigationLogic = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const tema = useSelector((state) => state.tema.tema);  // Corrige para usar 'tema' en lugar de 'theme'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (menuIndex) => {
    setActiveMenu(activeMenu === menuIndex ? null : menuIndex);
  };

  const handleToggleTheme = () => {
    dispatch(alternarTema());
  };

  const handleLogout = () => {
    dispatch(cerrarSesion());
    eliminarToken('accessToken');
    navigate('/inicio-sesion');
  };

  const renderSubMenu = useCallback((menuIndex, items) => (
    <ul className={`sub-menu ${activeMenu === menuIndex ? 'active' : ''}`}>
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.link}>{item.text}</Link>
        </li>
      ))}
    </ul>
  ), [activeMenu]);

  return (
    <SideNavigationLayout
      theme={tema}
      activeMenu={activeMenu}
      handleMenuClick={handleMenuClick}
      handleToggleTheme={handleToggleTheme}
      handleLogout={handleLogout}
      renderSubMenu={renderSubMenu}
      menuItems={menuOpciones}  // Pasa 'menuOpciones' como 'menuItems'
    />
  );
};

export default SideNavigationLogic;