import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInsumos from '@/pages/inventario/PaginaInsumos';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorInsumos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/insumos/activos?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/inventario/insumos/crear');
  };

  const manejarActualizar = (insumo) => {
    if (insumo && insumo.id) {
      navigate(`/inventario/insumos/actualizar/${insumo.id}`);
    } else {
      toast.error('No se puede actualizar el insumo porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (insumo) => {
    if (insumo && insumo.nombre) {
      toast.success(`Insumo ${insumo.nombre} desactivado correctamente.`);
      if (data) {
        const insumosFiltrados = data.data.filter(i => i.id !== insumo.id);
        // Aquí podrías actualizar el estado local si decides manejar los datos filtrados localmente.
      }
    } else {
      toast.error('No se puede eliminar el insumo sin un ID o nombre válido.');
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'categoriaNombre', headerName: 'Categoría', flex: 2 },
    { field: 'activo', headerName: 'Estado', flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false, renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>Actualizar</button>
          <button onClick={() => manejarEliminar(params.row)}>Eliminar</button>
        </>
      ),
    },
  ];

  // Validamos que data.data sea un array válido o uno vacío.
  const datosValidos = data && Array.isArray(data.data) ? data.data : [];

  return (
    <PaginaInsumos
      columnas={columnas}
      datos={datosValidos}
      cargando={loading}
      error={error}
      manejarCrear={manejarCrear}
      totalPaginas={data ? data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize} // Pasar pageSize como prop
      setPageSize={setPageSize} // Permitir cambiar el tamaño de página
      manejarActualizar={manejarActualizar}
      manejarEliminar={manejarEliminar}
    />
  );
};

export default ContenedorInsumos;