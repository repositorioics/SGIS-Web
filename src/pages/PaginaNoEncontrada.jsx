import React from 'react';
import { useNavigate } from 'react-router-dom';
import "@/assets/styles/PaginaNoEncontrada.css"

const PaginaNoEncontrada = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/inicio-sesion', { replace: true }); // Reemplaza la ruta actual
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Página no encontrada</h2>
        <p>Lo sentimos, pero la página que estás buscando no existe.</p>
        <button onClick={handleGoHome} className="home-link">Volver al Inicio</button>
      </div>
    </div>
  );
}

export default PaginaNoEncontrada;