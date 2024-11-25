import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle } from 'react-icons/fa';
import PaginaEntregasRequisas from '@/pages/requisas/PaginaEntregasRequisas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Contenedor para gestionar la lógica de la página de entregas de requisas.
 */
const ContenedorEntregasRequisas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [datosOrdenados, setDatosOrdenados] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de entregas de requisas desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/entregas-requisas/entregas?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  useEffect(() => {
    if (data) {
      const entregas = data.data.content.map((entrega) => ({
        ...entrega,
        id: entrega.requisaId, // Aseguramos que cada fila tenga un campo `id` único
      }));

      // Ordenar las entregas
      const entregasSolicitadas = entregas
        .filter((entrega) => entrega.estado === 'solicitado')
        .sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));

      const entregasFinalizadas = entregas
        .filter(
          (entrega) =>
            entrega.estado === 'entregado' || entrega.estado === 'parcialmente entregada'
        )
        .sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));

      setDatosOrdenados([...entregasSolicitadas, ...entregasFinalizadas]);
    }
  }, [data]);

  /**
   * Navegar para crear el pedido de una entrega.
   * @param {object} entrega - La entrega seleccionada.
   */
  const manejarRealizarPedido = (entrega) => {
    if (entrega && entrega.requisaId) {
      navigate(`/requisas/entregas/crear/${entrega.requisaId}`);
    } else {
      toast.error(t('contenedorEntregasRequisas.errorPedido'));
    }
  };

  return (
    <PaginaEntregasRequisas
      columnas={[
        { field: 'codigoUnico', headerName: t('paginaEntregasRequisas.columnaCodigoUnico'), flex: 1 },
        { field: 'sitio', headerName: t('paginaEntregasRequisas.columnaSitio'), flex: 2 },
        { field: 'estado', headerName: t('paginaEntregasRequisas.columnaEstado'), flex: 1 },
        {
          field: 'fechaCreacion',
          headerName: t('paginaEntregasRequisas.columnaFecha'),
          flex: 1,
          renderCell: (params) => (
            <span>{new Date(params.value).toLocaleDateString()}</span>
          ),
        },
        {
          field: 'acciones',
          headerName: t('paginaEntregasRequisas.columnaAcciones'),
          flex: 1,
          sortable: false,
        },
      ]}
      datos={datosOrdenados}
      cargando={loading}
      error={error}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarRealizarPedido={manejarRealizarPedido} // Pasamos la función para realizar el pedido
      mostrarSoloVerMas={true} // Activamos esta opción para mostrar solo este botón
    />
  );
};

export default ContenedorEntregasRequisas;