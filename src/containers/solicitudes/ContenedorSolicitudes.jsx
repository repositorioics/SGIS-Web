import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaSolicitudes from '@/pages/solicitudes/PaginaSolicitudes';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorSolicitudes = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/solicitudes?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/solicitudes/crear');
  };

  const manejarActualizar = (solicitud) => {
    if (solicitud && solicitud.id) {
      navigate(`/solicitudes/editar/${solicitud.id}`);
    } else {
      toast.error('No se puede editar la solicitud porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = async (solicitud) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success(`Solicitud ${solicitud.numeroSolicitud} desactivada correctamente`);
        // Refrescar la página después de eliminar
        navigate(0);
      } else {
        toast.error('Error al desactivar la solicitud');
      }
    } catch (error) {
      toast.error('Error al desactivar la solicitud');
    }
  };

  const columnas = [
    { field: 'numeroSolicitud', headerName: 'Número Solicitud', flex: 2 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'observaciones', headerName: 'Observaciones', flex: 3 },
    {
      field: 'fechaCreacion',
      headerName: 'Fecha de Creación',
      flex: 2,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>Editar</button>
          <button onClick={() => manejarEliminar(params.row)}>Eliminar</button>
        </>
      ),
    }
  ];

  return (
    <>
      <PaginaSolicitudes
        columnas={columnas}
        datos={data ? data.data.content : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.data.totalPages : 1}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        pageSize={pageSize} // Pasar pageSize como prop
        setPageSize={setPageSize} // Permitir cambiar el tamaño de página
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorSolicitudes;
