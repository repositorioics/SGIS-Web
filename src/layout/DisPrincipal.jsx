import React from 'react';
import SideNavigationLogic from '@/components/SideNavigation/SideNavigationLogic';
import '@/assets/styles/diseñoPrincipal.css';

const DisPrincipal = ({ children }) => {
  return (
    <div className="diseño-principal">
      <SideNavigationLogic />
      <div className="contenido-principal">
        {children}
      </div>
    </div>
  );
};

export default DisPrincipal;