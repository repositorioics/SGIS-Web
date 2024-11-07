import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaAutorizaciones from '@/pages/solicitudes/PaginaAutorizaciones';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { FaPlusCircle } from 'react-icons/fa'; // Icono para el botón de pedido

const ContenedorAutorizaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener 'modo' del parámetro de consulta en la URL
  const queryParams = new URLSearchParams(location.search);
  const modo = queryParams.get('modo') || 'autorizar';

  // Configuración dinámica según el modo
  const urlEndpoint = `${URL}api/v1/solicitudes?page=${paginaActual}&size=${pageSize}`;
  const titulo = modo === 'autorizar' ? t('paginaAutorizaciones.tituloAutorizacion') : t('paginaAutorizaciones.tituloPedido');
  const subtitulo = modo === 'autorizar' ? t('paginaAutorizaciones.subtituloAutorizacion') : t('paginaAutorizaciones.subtituloPedido');

  // Fetch para obtener los datos de solicitudes
  const { data, loading, error } = useFetch(urlEndpoint, {}, [paginaActual, pageSize]);

  // Procesamiento de datos para el filtrado y ordenamiento requerido
  const solicitudes = data?.data.content || [];
  const solicitudesFiltradas = solicitudes
    .filter(solicitud => (modo === 'pedido' ? solicitud.estadoNombre === 'autorizado' : true))
    .sort((a, b) => {
      if (a.estadoNombre === 'solicitado' && b.estadoNombre !== 'solicitado') return -1;
      if (a.estadoNombre !== 'solicitado' && b.estadoNombre === 'solicitado') return 1;
      return 0;
    });

  console.log("Datos filtrados y ordenados:", JSON.stringify(solicitudesFiltradas, null, 2));

  // Manejar la acción de "Ver más" en modo 'autorizar'
  const manejarVerMas = (solicitud) => {
    if (modo === 'autorizar') {
      navigate(`/solicitudes/gestion-autorizaciones/detalle/${solicitud.id}`);
    }
  };

  // Manejar la acción de "Realizar Pedido" en modo 'pedido'
  const manejarRealizarPedido = (solicitud) => {
    if (modo === 'pedido') {
      navigate(`/solicitudes/pedidos/crear/${solicitud.id}`, { state: { solicitud } });
    }
  };

  return (
    <PaginaAutorizaciones
      modo={modo}
      columnas={[
        { field: 'numeroSolicitud', headerName: t('paginaAutorizaciones.columnaNumeroSolicitud'), flex: 1 },
        { field: 'donanteNombre', headerName: t('paginaAutorizaciones.columnaDonante'), flex: 2 },
        { field: 'observaciones', headerName: t('paginaAutorizaciones.columnaObservaciones'), flex: 2 },
        { field: 'estadoNombre', headerName: t('paginaAutorizaciones.columnaEstado'), flex: 1 },
        { field: 'fechaCreacion', headerName: t('paginaAutorizaciones.columnaFechaCreacion'), flex: 2 },
        {
          field: 'acciones',
          headerName: t('paginaAutorizaciones.columnaAcciones'),
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <>
              {modo === 'autorizar' && (
                <button onClick={() => manejarVerMas(params.row)}>
                  {t('paginaAutorizaciones.botonVerMas')}
                </button>
              )}
              {modo === 'pedido' && (
                <button onClick={() => manejarRealizarPedido(params.row)}>
                  <FaPlusCircle style={{ marginRight: '5px' }} />
                  {t('paginaAutorizaciones.botonCrearPedido')}
                </button>
              )}
            </>
          ),
        },
      ]}
      datos={solicitudesFiltradas}
      cargando={loading}
      error={error}
      titulo={titulo}
      subtitulo={subtitulo}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarVerMas={modo === 'autorizar' ? manejarVerMas : undefined}
      manejarRealizarPedido={modo === 'pedido' ? manejarRealizarPedido : undefined}
    />
  );
};

export default ContenedorAutorizaciones;