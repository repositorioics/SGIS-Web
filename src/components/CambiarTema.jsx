import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alternarTema } from '@/context/slices/temaSlice';
import { obtenerTema } from '@/config/temas';
import { FaSun, FaMoon } from 'react-icons/fa';
import '@/assets/styles/components/cambiarTema.css'

const CambiarTema = () => {
  const dispatch = useDispatch();
  const temaActual = useSelector((state) => state.tema.tema);

  const tema = obtenerTema(temaActual);

  const manejarCambioTema = () => {
    dispatch(alternarTema());
  };

  return (
    <button
      onClick={manejarCambioTema}
      className="boton-cambiar-tema"
      aria-label="Cambiar tema"
    >
      {temaActual === 'claro' ? <FaMoon /> : <FaSun />}
      <span className="menu-texto">Cambiar Tema</span>
    </button>
  );
};

export default CambiarTema;