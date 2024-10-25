import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInsumos from '@/pages/inventario/PaginaInsumos';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controla la lógica de la página de insumos, incluyendo la creación, actualización y eliminación de insumos.
 */
const ContenedorInsumos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/insumos/activos?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo insumo.
   */
  const manejarCrear = () => {
    navigate('/inventario/insumos/crear');
  };

  /**
   * Navegar a la página de actualización de un insumo si tiene un ID válido.
   * @param {object} insumo - El insumo seleccionado para actualizar.
   */
  const manejarActualizar = (insumo) => {
    if (insumo && insumo.id) {
      navigate(`/inventario/insumos/actualizar/${insumo.id}`);
    } else {
      toast.error(t('contenedorInsumos.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de un insumo seleccionado.
   * @param {object} insumo - El insumo seleccionado para eliminar.
   */
  const manejarEliminar = (insumo) => {
    if (insumo && insumo.nombre) {
      toast.success(t('contenedorInsumos.insumoEliminado', { nombre: insumo.nombre }));
      if (data) {
        const insumosFiltrados = data.data.filter(i => i.id !== insumo.id);
        // Aquí podrías actualizar el estado local si decides manejar los datos filtrados localmente.
      }
    } else {
      toast.error(t('contenedorInsumos.errorEliminar'));
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('contenedorInsumos.nombre'), flex: 2 },
    { field: 'categoriaNombre', headerName: t('contenedorInsumos.categoria'), flex: 2 },
    { 
      field: 'activo', 
      headerName: t('contenedorInsumos.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorInsumos.activo') : t('contenedorInsumos.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorInsumos.acciones'), flex: 1, sortable: false, renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>{t('contenedorInsumos.actualizar')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('contenedorInsumos.eliminar')}</button>
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