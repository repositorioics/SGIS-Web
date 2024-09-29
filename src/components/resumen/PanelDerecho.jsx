import React from 'react';
import '@/assets/styles/resumen/panelDerecho.css';
import { Link } from 'react-router-dom';

const PanelDerecho = ({ requisiciones, paletas }) => {
  return (
    <div className="panel-derecho">
      <h2 className="panel-derecho__titulo">Actividades Recientes</h2>
      <h3 className="panel-derecho__subtitulo">Paletas Recientes</h3>
      <ul className="lista-paletas">
        {paletas.map((pallet) => (
          <li key={pallet.id} className="lista-paletas__item">
            <span className="lista-paletas__producto">{pallet.producto}</span>
            <span className="lista-paletas__fecha">{pallet.fecha}</span>
            <Link className='ver-mas'>Ver mas</Link>
          </li>
        ))}
      </ul>
      <h3 className="panel-derecho__subtitulo">Requisiciones Recientes</h3>
      <ul className="lista-requisiciones">
        {requisiciones.map((req) => (
          <li key={req.id} className="lista-requisiciones__item">
            <span className="lista-requisiciones__producto">{req.producto}</span>
            <span className="lista-requisiciones__fecha">{req.fecha}</span>
            <Link className='ver-mas'>Ver mas</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelDerecho;