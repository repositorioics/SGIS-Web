import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaMarcas from '@/pages/inventario/PaginaMarcas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controla la lógica de la página de marcas, incluyendo la creación, actualización y eliminación de marcas.
 */
const ContenedorMarcas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook para traducción

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/marcas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva marca.
   */
  const manejarCrear = () => {
    navigate('/inventario/marca/crear');
  };

  /**
   * Navegar a la página de actualización de una marca si tiene un ID válido.
   * @param {object} marca - La marca seleccionada para actualizar.
   */
  const manejarActualizar = (marca) => {
    if (marca && marca.id) {
      navigate(`/inventario/marca/actualizar/${marca.id}`);
    } else {
      toast.error(t('contenedorMarcas.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de una marca seleccionada.
   * @param {object} marca - La marca seleccionada para eliminar.
   */
  const manejarEliminar = (marca) => {
    toast.success(t('contenedorMarcas.marcaEliminada', { nombre: marca.nombre }));
    if (data) {
      const marcasFiltradas = data.data.content.filter(m => m.id !== marca.id);
      // Aquí podrías actualizar el estado local si decides gestionar las marcas filtradas localmente.
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('contenedorMarcas.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorMarcas.descripcion'), flex: 3 },
    { 
      field: 'activo', 
      headerName: t('contenedorMarcas.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorMarcas.activo') : t('contenedorMarcas.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorMarcas.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaMarcas
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
  );
};

export default ContenedorMarcas;