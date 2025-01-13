import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaSolicitudes from '@/pages/solicitudes/PaginaSolicitudes';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; 
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; 
import { FaEye } from 'react-icons/fa';

/**
 * Controlar la lógica de la página de solicitudes, como la creación, actualización y desactivación.
 */
const ContenedorSolicitudes = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); 
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener datos de solicitudes desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/solicitudes?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva solicitud.
   */
  const manejarCrear = () => {
    navigate('/solicitudes/solicitud/crear');
  };

  // /**
  //  * Navegar a la página de actualización de una solicitud si tiene un ID válido.
  //  * @param {object} solicitud - La solicitud seleccionada para actualizar.
  //  */
  // const manejarActualizar = (solicitud) => {
  //   if (solicitud && solicitud.id) {
  //     navigate(`/solicitudes/solicitud/actualizar/${solicitud.id}`);
  //   } else {
  //     toast.error(t('contenedorSolicitudes.errorActualizar')); // Mensaje traducido
  //   }
  // };

  const manejarVerMas = (pedido) => {

      navigate(`/solicitudes/solicitud/vermas/${pedido.id}`);
  };

  /**
   * Desactivar una solicitud seleccionada y mostrar un mensaje de éxito.
   * @param {object} solicitud - La solicitud seleccionada para eliminar.
   */
  const manejarEliminar = async (solicitud) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success(t('contenedorSolicitudes.solicitudDesactivada', { numero: solicitud.numeroSolicitud }));
        navigate(0); // Refrescar la página después de eliminar
      } else {
        toast.error(t('contenedorSolicitudes.errorDesactivar'));
      }
    } catch (error) {
      toast.error(t('contenedorSolicitudes.errorDesactivar'));
    }
  };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'numeroSolicitud', headerName: t('paginaSolicitudes.columnaNumeroSolicitud'), flex: 2 },
    { field: 'observaciones', headerName: t('paginaSolicitudes.columnaObservaciones'), flex: 3 },
    { field: 'estado', headerName: t('paginaSolicitudes.columnaEstado'), flex: 1 },
    {
      field: 'fechaCreacion',
      headerName: t('paginaSolicitudes.columnaFechaCreacion'),
      flex: 2,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones', 
      headerName: t('paginaSolicitudes.columnaAcciones'), 
      flex: 1, 
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarVerMas(params.row)}> <FaEye style={{ marginRight: '5px' }} /> {t('paginaSolicitudes.botonVerMas')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('paginaSolicitudes.botonEliminar')}</button>
        </>
      ),
    }
  ];

  return (
    <>
      <PaginaSolicitudes
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
        // manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
        manejarVerMas={manejarVerMas}
      />
    </>
  );
};

export default ContenedorSolicitudes;