import React from "react";
import NavegacionLateral from "@/components/NavegacionLateral/navegacionLateral";
import "@/assets/styles/diseñoPrincipal.css";

const DisPrincipal = ({ children }) => {
  return (
    <div className="diseño-principal">
      <NavegacionLateral />
      <div className="contenido-principal">{children}</div>
    </div>
  );
};

export default DisPrincipal;