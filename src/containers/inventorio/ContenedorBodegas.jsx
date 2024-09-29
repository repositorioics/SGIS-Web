import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaBodegas from '@/pages/inventario/PaginaBodegas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorBodegas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(null); // Bodega para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/bodegas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/bodegas/crear');
  };

  const manejarActualizar = (bodega) => {
    if (bodega && bodega.id) {
      navigate(`/bodegas/actualizar/${bodega.id}`);
    } else {
      toast.error('No se puede actualizar la bodega porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (bodega) => {
    toast.success(`Bodega ${bodega.nombre} desactivada correctamente`);
    if (data) {
      const bodegasFiltradas = data.data.content.filter(b => b.id !== bodega.id);
      // Aquí podrías actualizar el estado local si decides gestionar las bodegas filtradas localmente.
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setBodegaSeleccionada(null);
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
    { field: 'direccion', headerName: 'Dirección', flex: 2 },
    { field: 'Insitución', headerName: 'Insitución', flex: 3, renderCell: (params) => (
        <span>
          {params.row.sitioId ? `${params.row.sitioNombre}` : `${params.row.donanteNombre}`}
        </span>
      ),
    },
    { field: 'activo', headerName: 'Estado', flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaBodegas
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

export default ContenedorBodegas;