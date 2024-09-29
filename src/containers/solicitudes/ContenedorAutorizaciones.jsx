import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaAutorizaciones from '@/pages/solicitudes/PaginaAutorizaciones'; // Página que mostraremos
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Hook personalizado para hacer fetch

const ContenedorAutorizaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API de solicitudes pendientes
  const { data, loading, error } = useFetch(
    `${URL}api/v1/solicitudes/pendientes?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  // Manejar la autorización de una solicitud
  const manejarAutorizar = async (solicitud) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}/autorizar`, {
        method: 'PUT',
      });
      if (response.ok) {
        toast.success(`Solicitud ${solicitud.numeroSolicitud} autorizada correctamente`);
        navigate(0); // Refrescar la página para obtener los datos actualizados
      } else {
        toast.error('Error al autorizar la solicitud');
      }
    } catch (error) {
      toast.error('Error al autorizar la solicitud');
    }
  };

  // Manejar el rechazo de una solicitud con justificación
  const manejarRechazar = async (solicitud, justificacion) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}/rechazar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ justificacion }),
      });
      if (response.ok) {
        toast.success(`Solicitud ${solicitud.numeroSolicitud} rechazada correctamente`);
        navigate(0); // Refrescar la página para obtener los datos actualizados
      } else {
        toast.error('Error al rechazar la solicitud');
      }
    } catch (error) {
      toast.error('Error al rechazar la solicitud');
    }
  };

  const columnas = [
    { field: 'numeroSolicitud', headerName: 'Número Solicitud', flex: 2 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'observaciones', headerName: 'Observaciones', flex: 3 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <PaginaAutorizaciones
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarAutorizar={manejarAutorizar}
      manejarRechazar={manejarRechazar}
    />
  );
};

export default ContenedorAutorizaciones;