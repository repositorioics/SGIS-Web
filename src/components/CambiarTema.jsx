// src/components/CambiarTema.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alternarTema } from '@/context/slices/temaSlice';
import { obtenerTema } from '@/config/temas';
import { FaSun, FaMoon } from 'react-icons/fa';

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
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: tema.textoPrimario,
        fontSize: '1.5rem',
      }}
      aria-label="Cambiar tema"
    >
      {temaActual === 'claro' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default CambiarTema;