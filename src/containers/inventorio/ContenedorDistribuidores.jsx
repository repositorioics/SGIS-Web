import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaDistribuidores from '@/pages/inventario/PaginaDistribuidores';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado
import { useTranslation } from 'react-i18next'; // Hook para traducciones

/**
 * Controla la lógica de la página de distribuidores, incluyendo la creación, actualización y eliminación.
 */
const ContenedorDistribuidores = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState(null); // Distribuidor para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Usar el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/distribuidores?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo distribuidor.
   */
  const manejarCrear = () => {
    navigate('/inventario/distribuidor/crear');
  };

  /**
   * Navegar a la página de actualización de un distribuidor si tiene un ID válido.
   * @param {object} distribuidor - El distribuidor seleccionado para actualizar.
   */
  const manejarActualizar = (distribuidor) => {
    if (distribuidor && distribuidor.id) {
      navigate(`/inventario/distribuidor/actualizar/${distribuidor.id}`);
    } else {
      toast.error(t('contenedorDistribuidores.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de un distribuidor seleccionado.
   * @param {object} distribuidor - El distribuidor seleccionado para eliminar.
   */
  const manejarEliminar = (distribuidor) => {
    toast.success(t('contenedorDistribuidores.distribuidorEliminado', { nombre: distribuidor.nombre }));
    if (data) {
      const distribuidoresFiltrados = data.data.content.filter(d => d.id !== distribuidor.id);
      // Aquí podrías actualizar el estado local si decides gestionar los distribuidores filtrados localmente.
    }
  };

  // Cerrar el modal y limpiar la selección del distribuidor
  const cerrarModal = () => {
    setModalAbierto(false);
    setDistribuidorSeleccionado(null);
  };

  // Definir columnas de la tabla de distribuidores
  const columnas = [
    { field: 'nombre', headerName: t('contenedorDistribuidores.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorDistribuidores.descripcion'), flex: 3 },
    { 
      field: 'activo', 
      headerName: t('contenedorDistribuidores.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorDistribuidores.activo') : t('contenedorDistribuidores.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorDistribuidores.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaDistribuidores
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

export default ContenedorDistribuidores;