import React, { useState, useEffect } from 'react';
import PaginaInicio from '@/pages/PaginaInicio';
import { FaBoxOpen , FaSortAmountDownAlt , FaExclamationTriangle, FaClipboardList   } from 'react-icons/fa'; // 

const ContenedorInicio = () => {
  const [datosTarjetas, setDatosTarjetas] = useState([]);
  const [datosRequisas, setDatosRequisas] = useState([]);
  const [datosPaletas, setDatosPaletas] = useState([]);

  useEffect(() => {
    // Aquí puedes agregar lógica para obtener los datos desde una API o un servicio
    const obtenerDatos = async () => {
      // Simulando una petición
      const tarjetas = [
        { icon: <FaBoxOpen  />, titulo: 'Productos en Stock', subtitulo: 'Total en almacén', texto: '1000', color: 'verde' },
        { icon: <FaSortAmountDownAlt  />, titulo: 'Productos Bajos Stock', subtitulo: 'Necesitan reabastecimiento', texto: '50', color: 'amarillo' },
        { icon: <FaExclamationTriangle  />, titulo: 'Productos a Vencer', subtitulo: 'Caducidad próxima', texto: '5', color: 'rojo' },
        { icon: <FaClipboardList   />, titulo: 'Requisas Pendientes', subtitulo: 'En proceso', texto: '4', color: 'azul' },
      ];

      const requisiciones = [
        { id: 1, completada: true, producto: 'Requisa 50001', fecha: '2024-07-15' },
        { id: 2, completada: false, producto: 'Requisa 50002', fecha: '2024-07-14' },
        { id: 3, completada: true, producto: 'Requisa 50003', fecha: '2024-07-13' },
      ];

      const paletas = [
        { id: 1, producto: 'Paleta 50001', fecha: '2024-07-16', cantidad: 10, completada: true },
        { id: 2, producto: 'Paleta 50002', fecha: '2024-07-15', cantidad: 20, completada: false },
        { id: 3, producto: 'Paleta 50003', fecha: '2024-07-14', cantidad: 15, completada: true },
      ];

      setDatosTarjetas(tarjetas);
      setDatosRequisas(requisiciones);
      setDatosPaletas(paletas);
    };

    obtenerDatos();
  }, []);

  return (
    <PaginaInicio 
      datosTarjetas={datosTarjetas} 
      datosRequisas={datosRequisas} 
      datosPaletas={datosPaletas} 
    />
  );
};

export default ContenedorInicio;