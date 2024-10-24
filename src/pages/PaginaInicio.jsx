// src/components/resumen/PaginaInicio.jsx
import React from 'react';
import Tarjeta from '@/components/resumen/Tarjeta.jsx';
import Graficas from '@/components/resumen/Graficas.jsx';
import PanelDerecho from '@/components/resumen/PanelDerecho.jsx';
import '@/assets/styles/resumen/inicio.css';

const PaginaInicio = ({ datosTarjetas = [], datosRequisas = [], datosPaletas = [] }) => {
  return (
    <div className="seccion-inicio">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Panel de Control</h2>
        <p className="subtitulo-inicio">Información General</p>
      </div>
      <div className="contenedor-contenido">
        <div className="contenido-principal">
          <div className="titulo-seccion">Resumen de Productos</div>
          <div className="contenedor-tarjeta">
            {datosTarjetas.map((tarjeta, index) => (
              <Tarjeta
                key={index}
                icono={tarjeta.icon}
                titulo={tarjeta.titulo}
                subtitulo={tarjeta.subtitulo}
                texto={tarjeta.texto}
                color={tarjeta.color}
              />
            ))}
          </div>
          <div className="titulo-seccion">Estadísticas de Pedidos y Solicitudes</div>
          <Graficas />
          
        </div>
        <PanelDerecho requisiciones={datosRequisas} paletas={datosPaletas} />
      </div>
    </div>
  );
};

export default PaginaInicio;