import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaEstudios from '@/pages/inventario/PaginaEstudios';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Hook personalizado para fetch
import { useTranslation } from 'react-i18next'; // Hook para traducciones

/**
 * Controla la lógica de la página de estudios, incluyendo la creación, actualización y eliminación de estudios.
 */
const ContenedorEstudios = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Usar el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/estudios?page=${paginaActual}&size=${pageSize}`,
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo estudio.
   */
  const manejarCrear = () => {
    navigate('/inventario/estudio/crear');
  };

  /**
   * Navegar a la página de actualización de un estudio si tiene un ID válido.
   * @param {object} estudio - El estudio seleccionado para actualizar.
   */
  const manejarActualizar = (estudio) => {
    if (estudio && estudio.id) {
      navigate(`/inventario/estudio/actualizar/${estudio.id}`);
    } else {
      toast.error(t('contenedorEstudios.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de un estudio seleccionado.
   * @param {object} estudio - El estudio seleccionado para eliminar.
   */
  const manejarEliminar = (estudio) => {
    toast.success(t('contenedorEstudios.estudioEliminado', { nombre: estudio.nombre }));
    if (data) {
      const estudiosFiltrados = data.data.content.filter(e => e.id !== estudio.id);
      // Aquí podrías actualizar el estado local si decides gestionar los estudios filtrados localmente.
    }
  };

  // Definir las columnas de la tabla de estudios
  const columnas = [
    { field: 'nombre', headerName: t('contenedorEstudios.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorEstudios.descripcion'), flex: 3 },
    { field: 'activo', headerName: t('contenedorEstudios.estado'), flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorEstudios.activo') : t('contenedorEstudios.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorEstudios.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaEstudios
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

export default ContenedorEstudios;