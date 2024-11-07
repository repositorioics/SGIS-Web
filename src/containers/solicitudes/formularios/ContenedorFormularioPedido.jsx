import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PaginaFormularioPedido from '@/pages/solicitudes/formularios/PaginaFormularioPedido';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import { obtenerToken } from '@/utils/almacenamiento';
import 'react-toastify/dist/ReactToastify.css';

const ContenedorFormularioPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const username = useSelector((state) => state.autenticacion.usuario);

  const [solicitudData, setSolicitudData] = useState({});
  const [detalles, setDetalles] = useState([]); // Asegúrate de que `detalles` siempre sea un arreglo
  const [codigoPedido, setCodigoPedido] = useState(null);
  const [estadoId, setEstadoId] = useState(null);
  const [donanteId, setDonanteId] = useState(null); // Nuevo campo donanteId
  const [exclusiones, setExclusiones] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [justificacion, setJustificacion] = useState('');

  const { data: solicitud, loading, error } = useFetch(`${URL}api/v1/solicitudes/${id}`, {}, [id]);
  const { data: codigoPedidoData } = useFetch(`${URL}api/v1/pedidos/proximo-codigo-pedido`, {});
  const { data: usuarioData } = useFetch(username ? `${URL}api/v1/usuarios/username/${username}` : null, {}, [username]);

  useEffect(() => {
    if (isNaN(Number(id))) {
      toast.error('Error: ID de solicitud no válido.');
      navigate('/solicitudes/consolidar-pedido');
    }
  }, [id, navigate]);

  useEffect(() => {
    console.log(JSON.stringify(solicitud));

    if (solicitud?.data) {
      setSolicitudData(solicitud.data);
      setDetalles(
        solicitud.data.detalles?.map((detalle) => ({
          ...detalle,
          estudioId: detalle.estudioId || null, // Asegurar que estudioId esté presente
        })) || []
      );
      setEstadoId(solicitud.data.estadoId);
      setDonanteId(solicitud.data.donanteId); // Asignar donanteId si está presente
    }

    if (codigoPedidoData?.data) {
      setCodigoPedido(codigoPedidoData.data);
    }
  }, [solicitud, codigoPedidoData]);

  const manejarExclusiones = () => {
    const exclusionesNuevas = selectedRows.map((insumoId) => ({
      pedidoId: codigoPedido,
      insumoId,
      justificacionExclusion: justificacion,
    }));

    setExclusiones([...exclusiones, ...exclusionesNuevas]);
    setDetalles(detalles.filter((detalle) => !selectedRows.includes(detalle.insumo.id)));
    setSelectedRows([]);
    setJustificacion('');
    setModalOpen(false);
  };

  const abrirModal = () => {
    if (selectedRows.length === 0) {
      toast.error('Debe seleccionar al menos un insumo para excluir');
    } else {
      setModalOpen(true);
    }
  };

  const manejarGuardarPedido = async () => {
    const token = obtenerToken('accessToken');

    if (!codigoPedido) {
      toast.error('Error: Código de pedido no disponible.');
      return;
    }

    try {
      const pedidoData = {
        solicitudId: Number(id),
        estadoId,
        donanteId, // Incluir donanteId en los datos generales
        detalles: detalles.map((detalle) => ({
          insumoId: detalle.insumo.id,
          clasificacion: detalle.clasificacion || 'PROGRAMADO',
          marcaId: detalle.marca.id,
          distribuidorId: detalle.distribuidor.id,
          presentacionId: detalle.presentacion.id,
          cantidadPresentaciones: detalle.cantidadPresentaciones,
          sitioId: detalle.sitioId,
          estudioId: detalle.estudio?.id || null,
          analistaSolicitante: detalle.bioanalista?.nombre || 'N/A',
          observacion: detalle.observacion || '',
        })),
        exclusiones, // Incluye las exclusiones en la solicitud
      };

      /// Imprime el objeto `pedidoData` en la consola antes de enviarlo
      console.log('Pedido data a enviar:', JSON.stringify(pedidoData, null, 2));

      const response = await fetch(`${URL}api/v1/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        toast.success('Pedido guardado con éxito');
        navigate('/solicitudes/consolidar-pedido');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al guardar el pedido');
      }
    } catch (error) {
      toast.error(`Error al guardar el pedido: ${error.message}`);
    }
  };

  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index] = { ...nuevosDetalles[index], [campo]: valor };
    setDetalles(nuevosDetalles);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PaginaFormularioPedido
      solicitud={solicitudData}
      usuario={usuarioData?.data}
      detalles={detalles}
      codigoPedido={codigoPedido}
      estadoId={estadoId}
      onGuardarPedido={manejarGuardarPedido}
      onExclusiones={manejarExclusiones}
      onUpdateDetail={actualizarDetalle}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      modalOpen={modalOpen}
      abrirModal={abrirModal}
      setModalOpen={setModalOpen}
      justificacion={justificacion}
      setJustificacion={setJustificacion}
    />
  );
};

export default ContenedorFormularioPedido;