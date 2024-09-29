import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaDistribuidores from '@/pages/inventario/PaginaDistribuidores';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorDistribuidores = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState(null); // Distribuidor para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/distribuidores?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/distribuidor/crear');
  };

  const manejarActualizar = (distribuidor) => {
    if (distribuidor && distribuidor.id) {
      navigate(`/distribuidor/actualizar/${distribuidor.id}`);
    } else {
      toast.error('No se puede actualizar el distribuidor porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (distribuidor) => {
    toast.success(`Distribuidor ${distribuidor.nombre} desactivado correctamente`);
    if (data) {
      const distribuidoresFiltrados = data.data.content.filter(d => d.id !== distribuidor.id);
      // Aquí podrías actualizar el estado local si decides gestionar los distribuidores filtrados localmente.
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDistribuidorSeleccionado(null);
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
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
      <PaginaDistribuidores
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

export default ContenedorDistribuidores;