import React from "react";
import NavegacionLateral from "@/components/NavegacionLateral/navegacionLateral";
import "@/assets/styles/diseñoPrincipal.css";
import Header from '@/components/Header'
const DisPrincipal = ({ children }) => {
  return (
    <div className="diseño-principal">
      <NavegacionLateral />
      <div className="contenedor">
      <Header />
      <div className="contenido-principal">{children}</div>
      </div>
    </div>
  );
};

export default DisPrincipal;