import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInventario from '@/pages/inventario/PaginaInventario';
import useFetch from '@/hooks/useFetch'; // Hook personalizado para obtener datos
import { URL } from '@/constants/url'; // Constante para la URL de la API

const ContenedorInventario = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Tamaño de la página (registros por página)
  const navigate = useNavigate();

  // Hook personalizado para obtener los datos del inventario desde la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/inventario?page=${paginaActual}&size=${pageSize}`,
    {}, 
    [paginaActual, pageSize]
  );

  // Manejar la creación de un nuevo registro de inventario
  const manejarCrear = () => {
    navigate('/inventario/crear');
  };

  // Manejar la actualización de un registro de inventario
  const manejarActualizar = (inventario) => {
    if (inventario && inventario.id) {
      navigate(`/inventario/actualizar/${inventario.id}`);
    } else {
      toast.error('No se puede actualizar el inventario porque no tiene un ID válido.');
    }
  };

  // Manejar la eliminación de un registro de inventario
  const manejarEliminar = (inventario) => {
    toast.success(`Inventario ${inventario.nombre} eliminado correctamente.`);
    if (data) {
      const inventariosFiltrados = data.data.content.filter(i => i.id !== inventario.id);
      // Aquí podrías actualizar el estado local si decides gestionar los inventarios localmente
    }
  };

  const columnas = [
    { field: 'insumoNombre', headerName: 'Insumo', flex: 2 },
    { field: 'bodegaNombre', headerName: 'Bodega', flex: 2 },
    { field: 'presentacionNombre', headerName: 'Presentación', flex: 2 },
    { field: 'existencias', headerName: 'Existencias', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <PaginaInventario
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      manejarCrear={manejarCrear}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize} 
      setPageSize={setPageSize} 
      manejarActualizar={manejarActualizar}
      manejarEliminar={manejarEliminar}
    />
  );
};

export default ContenedorInventario;