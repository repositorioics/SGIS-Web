import React from 'react';
import { useTranslation } from 'react-i18next';

const PaginaUnauthorized = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('acceso_denegado.titulo')}</h1>
      <p>{t('acceso_denegado.mensaje')}</p>
    </div>
  );
};

export default PaginaUnauthorized;