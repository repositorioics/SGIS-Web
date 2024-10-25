import React from "react";
import "@/assets/styles/autenticacion/formulario.css";

const DisAutenticacion = ({
  titulo,
  descripcion,
  imagenUrl,
  imagenAlt,
  children,
}) => {
  return (
    <div className="dis-autenticacion">
      <div className="dis-autenticacion__tarjeta">
        <div className="dis-autenticacion__panel dis-autenticacion__panel--izquierdo">
          <div className="dis-autenticacion__contenido">
            <h2 className="dis-autenticacion__titulo">{titulo}</h2>
            <p className="dis-autenticacion__descripcion">{descripcion}</p>

            <div className="dis-autenticacion__imagen-container">
              <img
                src={imagenUrl}
                alt={imagenAlt}
                className="dis-autenticacion__imagen"
              />
            </div>
          </div>
        </div>
        <div className="dis-autenticacion__panel dis-autenticacion__panel--derecho">
          <div className="dis-autenticacion__contenido">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DisAutenticacion;