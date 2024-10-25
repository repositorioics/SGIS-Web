import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cambiarIdioma } from '@/context/slices/idiomaSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Solo un icono para representar el cambio de idioma

const CambiarIdioma = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.idioma.language);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'; // Alternar entre español e inglés
    dispatch(cambiarIdioma(newLanguage)); // Cambiar el idioma en el store de Redux
  };

  return (
    <li className="menu-item__cabecera" onClick={handleLanguageToggle} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faGlobe} className="menu-icono" /> {/* Ícono de globo para representar idiomas */}
      <div className="menu-texto">
        <span>{language === 'es' ? 'Switch to Spanish' : 'Cambiar a Ingles'}</span> {/* Texto según el idioma actual */}
      </div>
    </li>
  );
};

export default CambiarIdioma;