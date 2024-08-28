import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faSignOutAlt, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import logo from '@/assets/images/logo.png';
import '@/assets/styles/navegacionLateral.css';

const SideNavigationLayout = ({ tema, activeMenu, handleMenuClick, handleToggleTheme, handleLogout, renderSubMenu, menuItems }) => {
  return (
    <nav className={`side-navigation`}>
      <div className="side-navigation-header">
        <img src={logo} alt='logo' className='header-logo' width={40} height={40} />
        <h2>ICS Inventory</h2>
      </div>
      <ul className="side-navigation-menu">
        <li className="menu-item">
          <Link to="/" className="no-link-style">
            <div className="menu-item-header">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <div className='menu-text'><span>Overview</span></div>
            </div>
          </Link>
        </li>
        {menuItems.map((item) => (
          <li key={item.index} className={`menu-item ${activeMenu === item.index ? 'active' : ''}`}>
            <div className="menu-item-header" onClick={() => handleMenuClick(item.index)}>
              <FontAwesomeIcon icon={item.icon} className="menu-icon" />
              <div className='menu-text'><span>{item.text}</span></div>
              <FontAwesomeIcon icon={activeMenu === item.index ? faAngleUp : faAngleDown} className="menu-icon" />
            </div>
            {renderSubMenu(item.index, item.subMenu)}
          </li>
        ))}
        <li className="menu-item" onClick={handleToggleTheme}>
          <FontAwesomeIcon icon={tema === 'claro' ? faMoon : faSun} className="menu-icon" />
          <div className='menu-text'><span>{tema === 'claro' ? 'Modo oscuro' : 'Modo claro'}</span></div>
        </li>
        <li className="menu-item" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
          <div className='menu-text'><span>Cerrar sesión</span></div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigationLayout;