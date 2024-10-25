import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaCategorias from '@/pages/inventario/PaginaCategorias';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado
import { useTranslation } from 'react-i18next'; // Hook de traducción

/**
 * Controla la lógica de la página de categorías, incluyendo la creación, actualización y eliminación de categorías.
 */
const ContenedorCategorias = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/categorias?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva categoría.
   */
  const manejarCrear = () => {
    navigate('/inventario/categoria/crear');
  };

  /**
   * Navegar a la página de actualización de una categoría si tiene un ID válido.
   * @param {object} categoria - La categoría seleccionada para actualizar.
   */
  const manejarActualizar = (categoria) => {
    if (categoria && categoria.id) {
      navigate(`/inventario/categoria/actualizar/${categoria.id}`);
    } else {
      toast.error(t('contenedorCategorias.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de una categoría seleccionada.
   * @param {object} categoria - La categoría seleccionada para eliminar.
   */
  const manejarEliminar = (categoria) => {
    toast.success(t('contenedorCategorias.categoriaEliminada', { nombre: categoria.nombre }));
    if (data) {
      const categoriasFiltradas = data.data.content.filter(c => c.id !== categoria.id);
      // Aquí podrías actualizar el estado local si decides gestionar las categorías filtradas localmente.
    }
  };

  // Definir columnas de la tabla de categorías
  const columnas = [
    { field: 'nombre', headerName: t('contenedorCategorias.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorCategorias.descripcion'), flex: 3 },
    { 
      field: 'activo', 
      headerName: t('contenedorCategorias.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorCategorias.activo') : t('contenedorCategorias.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorCategorias.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaCategorias
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

export default ContenedorCategorias;