import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaRequisas from '@/pages/requisas/PaginaRequisas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controlar la lógica de la página de requisas, incluyendo la creación, actualización y eliminación.
 */
const ContenedorRequisas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de requisas desde la API con paginación y ordenamiento
  const { data, loading, error } = useFetch(
    `${URL}api/v1/requisas?page=${paginaActual}&size=${pageSize}&sort=estado,fechaCreacion,desc`,
    {},
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva requisa.
   */
  const manejarCrear = () => {
    navigate('/requisas/crear');
  };

  /**
   * Navegar a la página de actualización de una requisa si tiene un ID válido.
   * @param {object} requisa - La requisa seleccionada para actualizar.
   */
  // const manejarActualizar = (requisa) => {
  //   if (requisa && requisa.id) {
  //     navigate(`/requisas/actualizar/${requisa.id}`);
  //   } else {
  //     toast.error(t('contenedorRequisas.errorActualizar'));
  //   }
  // };

  const manejarVerMas = (requisa) => {
    if (requisa && requisa.id) {
      console.log("Id recibido", requisa.id)

      navigate(`/requisas/vermas/${requisa.id}`);
    } else {
      toast.error(t('contenedorRequisas.errorActualizar'));
    }
  };


  /**
   * Eliminar una requisa seleccionada y mostrar un mensaje de éxito.
   * @param {object} requisa - La requisa seleccionada para eliminar.
   */
  // const manejarEliminar = async (requisa) => {
  //   try {
  //     const response = await fetch(`${URL}api/v1/requisas/${requisa.id}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       toast.success(t('contenedorRequisas.requisaEliminada', { codigo: requisa.codigoUnico }));
  //       navigate(0); // Refrescar la página después de eliminar
  //     } else {
  //       toast.error(t('contenedorRequisas.errorEliminar'));
  //     }
  //   } catch (error) {
  //     toast.error(t('contenedorRequisas.errorEliminar'));
  //   }
  // };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'codigoUnico', headerName: t('paginaRequisas.columnaCodigoUnico'), flex: 1 },
    { field: 'observaciones', headerName: t('paginaRequisas.columnaObservaciones'), flex: 3 },
    { field: 'nombreEstado', headerName: t('paginaRequisas.columnaEstado'), flex: 1 },
    {
      field: 'fechaCreacion',
      headerName: t('paginaRequisas.columnaFechaCreacion'),
      flex: 1,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones',
      headerName: t('paginaRequisas.columnaAcciones'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarVerMas(params.row)}>
                  {t('paginaAutorizaciones.botonVerMas')}
                </button>
        </>
      ),
    }
  ];

  return (
    <PaginaRequisas
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
      manejarVerMas={manejarVerMas}
      //manejarActualizar={manejarActualizar}
      //manejarEliminar={manejarEliminar}
    />
  );
};

export default ContenedorRequisas;