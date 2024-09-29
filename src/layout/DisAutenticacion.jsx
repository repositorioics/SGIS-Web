import React from "react";
import { useSelector } from "react-redux";
import { obtenerTema } from "@/config/temas";
import "@/assets/styles/autenticacion/formulario.css";

const DisAutenticacion = ({
  titulo,
  descripcion,
  imagenUrl,
  imagenAlt,
  children,
}) => {
  const temaActual = useSelector((state) => state.tema.tema);
  const tema = obtenerTema(temaActual);

  return (
    <div className="dis-autenticacion" style={{ backgroundColor: tema.fondo }}>
      <div
        className="dis-autenticacion__tarjeta"
        style={{ backgroundColor: tema.fondoSegundario }}
      >
        <div
          className="dis-autenticacion__panel dis-autenticacion__panel--izquierdo"
          style={{
            backgroundColor: tema.fondoAlterno,
            color: tema.textoSegundario,
          }}
        >
          <div className="dis-autenticacion__contenido">
            <h2
              className="dis-autenticacion__titulo"
              style={{
                color: tema.textoSecundario,
              }}
            >
              {titulo}
            </h2>
            <p
              className="dis-autenticacion__descripcion"
              style={{
                color: tema.textoSecundario,
              }}
            >
              {descripcion}
            </p>

            <div className="dis-autenticacion__imagen-container">
              <img
                src={imagenUrl}
                alt={imagenAlt}
                className="dis-autenticacion__imagen"
              />
            </div>
          </div>
        </div>
        <div
          className="dis-autenticacion__panel dis-autenticacion__panel--derecho"
          style={{
            color: tema.textoPrimario,
          }}
        >
          <div className="dis-autenticacion__contenido">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DisAutenticacion;
