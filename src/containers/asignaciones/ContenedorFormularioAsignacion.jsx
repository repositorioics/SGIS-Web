import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioAsignacion from '@/pages/asignaciones/PaginaFormularioAsignacion';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { obtenerToken } from '@/utils/almacenamiento';
import ModalConfirmacion from '@/components/comun/ModalConfirmacion';

const ContenedorFormularioAsignacion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener id de la ruta
  const [detalles, setDetalles] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    cantidad: 1,
    observacionesDetalle: '',
    observaciones: '',
    bioanalistaId: '',
  });
  const [bioanalistas, setBioanalistas] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [bioanalistaSeleccionado, setBioanalistaSeleccionado] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false); // Nuevo estado para controlar la vista de solo lectura
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Obtener datos iniciales
  const { data: bioanalistasData } = useFetch(`${URL}api/v1/bioanalistas?page=0&size=100`, {}, []);
  const { data: insumosData } = useFetch(`${URL}api/v1/insumos/activos?page=0&size=1000`, {}, []);
  const { data: asignacionData } = useFetch(id ? `${URL}api/v1/asignaciones/${id}` : null, {}, [id]);

  // Cargar bioanalistas
  useEffect(() => {
    if (bioanalistasData?.data) {
      setBioanalistas(bioanalistasData.data.content || []);
    }
  }, [bioanalistasData]);

  // Cargar insumos
  useEffect(() => {
    if (insumosData?.data) {
      setInsumos(insumosData.data.content || []);
    }
  }, [insumosData]);

  // Cargar asignación existente si hay id en la ruta
  useEffect(() => {
    if (asignacionData?.data && id) {
      setDetalles(asignacionData.data.detalles || []);
      setDetalleActual((prev) => ({
        ...prev,
        bioanalistaId: asignacionData.data.bioanalistaId || '',
        observaciones: asignacionData.data.observaciones || '',
      }));
      setBioanalistaSeleccionado(!!asignacionData.data.bioanalistaId);
      setIsReadOnly(true); // Activar modo solo lectura
    }
  }, [asignacionData, id]);

  // Manejar cambios en el detalle actual
  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: name === 'cantidad' ? Number(value) : value,
    });
  };

  // Agregar un nuevo detalle
  const agregarDetalle = () => {
    if (!detalleActual.insumoId || detalleActual.cantidad <= 0) {
      toast.error(t('formularioAsignacion.errorCamposDetalle'));
      return;
    }

    const insumo = insumos.find((item) => item.id === detalleActual.insumoId);

    setDetalles([
      ...detalles,
      {
        ...detalleActual,
        id: detalles.length + 1,
        insumoNombre: insumo ? insumo.nombre : t('formularioAsignacion.insumoDesconocido'),
      },
    ]);

    setDetalleActual({
      ...detalleActual,
      insumoId: '',
      cantidad: 1,
      observacionesDetalle: '',
    });
  };

  // Eliminar un detalle
  const eliminarDetalle = (index) => {
    setDetalles((prevDetalles) => prevDetalles.filter((_, i) => i !== index));
  };

  const handleRemoveDetail = () => {
    setDetalles((prevDetalles) =>
      prevDetalles.filter((detalle) => !selectedRows.includes(detalle.id))
    );
    setSelectedRows([]);
  };

  // Mostrar modal de confirmación
  const handleGuardarAsignacion = () => {
    if (detalles.length === 0) {
      toast.error(t('formularioAsignacion.errorSinDetalles'));
      return;
    }
    setMostrarConfirmacion(true); // Mostrar el modal
  };

  // Confirmar y guardar la asignación
  const confirmarGuardar = async () => {
    setMostrarConfirmacion(false); // Cerrar el modal
    try {
      const token = obtenerToken('accessToken');
      const asignacion = {
        bioanalistaId: detalleActual.bioanalistaId || null,
        observaciones: detalleActual.observaciones || '',
        detalles: detalles.map(({ insumoId, cantidad, observacionesDetalle }) => ({
          insumoId,
          cantidad,
          observaciones: observacionesDetalle,
        })),
      };

      const response = await fetch(`${URL}api/v1/asignaciones`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(asignacion),
      });

      if (response.ok) {
        toast.success(t('formularioAsignacion.guardadoExitoso'));
        navigate('/asignaciones');
      } else {
        const result = await response.json();
        toast.error(result.message || t('formularioAsignacion.errorGuardar'));
      }
    } catch (error) {
      toast.error(t('formularioAsignacion.errorGuardar'));
    }
  };

  return (
    <>
      <PaginaFormularioAsignacion
        bioanalistas={bioanalistas}
        insumos={insumos}
        detalles={detalles}
        detalleActual={detalleActual}
        onDetalleChange={handleDetalleChange}
        onAgregarDetalle={isReadOnly ? null : agregarDetalle} // Desactivar agregar detalle en modo lectura
        onEliminarDetalle={isReadOnly ? null : eliminarDetalle} // Desactivar eliminación en modo lectura
        onGuardarAsignacion={isReadOnly ? null : handleGuardarAsignacion} // Desactivar guardar en modo lectura
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleRemoveDetail={isReadOnly ? null : handleRemoveDetail} // Desactivar eliminar múltiples en modo lectura
        bioanalistaSeleccionado={bioanalistaSeleccionado}
        setBioanalistaSeleccionado={isReadOnly ? null : setBioanalistaSeleccionado} // Bloquear selección en modo lectura
        isReadOnly={isReadOnly} // Pasar estado de solo lectura
      />
      <ModalConfirmacion
        abierto={mostrarConfirmacion}
        onCerrar={() => setMostrarConfirmacion(false)} // Cerrar sin guardar
        onConfirmar={confirmarGuardar} // Confirmar guardado
      />
    </>
  );
};

export default ContenedorFormularioAsignacion;