import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Hook para traducciones
import "@/assets/styles/PaginaNoEncontrada.css";

/**
 * Renderiza la página de error 404 cuando la ruta no existe.
 */
const PaginaNoEncontrada = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Utiliza traducción

  /**
   * Redirige al usuario a la página de inicio de sesión.
   */
  const handleGoHome = () => {
    navigate('/inicio-sesion', { replace: true }); // Reemplaza la ruta actual para evitar regresar a la página 404
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>{t('paginaNoEncontrada.titulo')}</h2>
        <p>{t('paginaNoEncontrada.descripcion')}</p>
        <button onClick={handleGoHome} className="home-link">
          {t('paginaNoEncontrada.botonInicio')}
        </button>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;