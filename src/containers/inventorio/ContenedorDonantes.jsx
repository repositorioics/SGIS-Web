import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaDonantes from '@/pages/inventario/PaginaDonantes';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Hook para traducciones

/**
 * Controla la lógica de la página de donantes, incluyendo la creación, actualización y eliminación de donantes.
 */
const ContenedorDonantes = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Hook personalizado para obtener datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/donantes?page=${paginaActual}&size=${pageSize}`,
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo donante.
   */
  const manejarCrear = () => {
    navigate('/inventario/donantes/crear');
  };

  /**
   * Navegar a la página de actualización de un donante si tiene un ID válido.
   * @param {object} donante - El donante seleccionado para actualizar.
   */
  const manejarActualizar = (donante) => {
    if (donante && donante.id) {
      navigate(`/inventario/donante/actualizar/${donante.id}`);
    } else {
      toast.error(t('contenedorDonantes.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de un donante seleccionado.
   * @param {object} donante - El donante seleccionado para eliminar.
   */
  const manejarEliminar = (donante) => {
    toast.success(t('contenedorDonantes.donanteEliminado', { nombre: donante.nombre }));
    if (data) {
      const donantesFiltrados = data.data.content.filter(d => d.id !== donante.id);
      // Aquí podrías actualizar el estado local si decides gestionar los donantes filtrados localmente.
    }
  };

  // Definir las columnas de la tabla de donantes
  const columnas = [
    { field: 'nombre', headerName: t('contenedorDonantes.nombre'), flex: 2 },
    { field: 'abreviatura', headerName: t('contenedorDonantes.abreviatura'), flex: 1 },
    { field: 'direccion', headerName: t('contenedorDonantes.direccion'), flex: 3 },
    { field: 'activo', headerName: t('contenedorDonantes.estado'), flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorDonantes.activo') : t('contenedorDonantes.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorDonantes.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaDonantes
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

export default ContenedorDonantes;