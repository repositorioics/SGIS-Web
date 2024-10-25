import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInventario from '@/pages/inventario/PaginaInventario';
import useFetch from '@/hooks/useFetch'; // Hook personalizado para obtener datos
import { URL } from '@/constants/url'; // Constante para la URL de la API
import { useTranslation } from 'react-i18next'; // Hook para traducciones

/**
 * Controla la lógica de la página de inventario, incluyendo la creación, actualización y eliminación de inventarios.
 */
const ContenedorInventario = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Tamaño de la página (registros por página)
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Hook personalizado para obtener los datos del inventario desde la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/inventario?page=${paginaActual}&size=${pageSize}`,
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo registro de inventario.
   */
  const manejarCrear = () => {
    navigate('/inventario/inventario/crear');
  };

  /**
   * Navegar a la página de actualización de un registro de inventario si tiene un ID válido.
   * @param {object} inventario - El inventario seleccionado para actualizar.
   */
  const manejarActualizar = (inventario) => {
    if (inventario && inventario.id) {
      navigate(`/inventario/inventario/actualizar/${inventario.id}`);
    } else {
      toast.error(t('contenedorInventario.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación de un registro de inventario seleccionado.
   * @param {object} inventario - El inventario seleccionado para eliminar.
   */
  const manejarEliminar = (inventario) => {
    toast.success(t('contenedorInventario.inventarioEliminado', { nombre: inventario.nombre }));
    if (data) {
      const inventariosFiltrados = data.data.content.filter(i => i.id !== inventario.id);
      // Aquí podrías actualizar el estado local si decides gestionar los inventarios localmente
    }
  };

  // Definir las columnas de la tabla de inventario
  const columnas = [
    { field: 'insumoNombre', headerName: t('contenedorInventario.insumo'), flex: 2 },
    { field: 'bodegaNombre', headerName: t('contenedorInventario.bodega'), flex: 2 },
    { field: 'presentacionNombre', headerName: t('contenedorInventario.presentacion'), flex: 2 },
    { field: 'existencias', headerName: t('contenedorInventario.existencias'), flex: 1 },
    { field: 'acciones', headerName: t('contenedorInventario.acciones'), flex: 1, sortable: false },
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