import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaRoles from '@/pages/configuracion/PaginaRoles';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar traducción

/**
 * Controlar la lógica de la página de roles, incluyendo creación, actualización y desactivación de roles.
 */
const ContenedorRoles = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener los datos de los roles con paginación desde la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/roles?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo rol.
   */
  const manejarCrear = () => {
    navigate('/configuraciones/roles/crear');
  };

  /**
   * Navegar a la página de actualización de un rol si tiene un ID válido.
   * @param {object} rol - El rol seleccionado para actualizar.
   */
  const manejarActualizar = (rol) => {
    if (rol && rol.id) {
      navigate(`/configuraciones/actualizar/${rol.id}`);
    } else {
      // Mostrar mensaje de error si no tiene un ID válido
      toast.error(t('contenedorRoles.errorActualizar'));
    }
  };

  /**
   * Desactivar un rol seleccionado y mostrar un mensaje de éxito.
   * @param {object} rol - El rol seleccionado para desactivar.
   */
  const manejarEliminar = (rol) => {
    toast.success(t('contenedorRoles.rolDesactivado', { nombre: rol.nombre }));
    if (data) {
      const rolesFiltrados = data.data.content.filter(r => r.id !== rol.id);
    }
  };

  // Definir las columnas de la tabla con los textos traducidos
  const columnas = [
    { field: 'nombre', headerName: t('paginaRoles.columnaNombre'), flex: 2 },
    { field: 'descripcion', headerName: t('paginaRoles.columnaDescripcion'), flex: 3 },
    { field: 'activo', headerName: t('paginaRoles.columnaEstado'), flex: 1 },
    { field: 'acciones', headerName: t('paginaRoles.columnaAcciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaRoles
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

export default ContenedorRoles;