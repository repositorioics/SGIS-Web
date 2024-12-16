import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioAsignacion from '@/pages/asignaciones/PaginaFormularioAsignacion';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { obtenerToken } from '@/utils/almacenamiento';

const ContenedorFormularioAsignacion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [detalles, setDetalles] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    cantidad: 1,
    observaciones: '',
  });
  const [bioanalistas, setBioanalistas] = useState([]);
  const [insumos, setInsumos] = useState([]);

  const { data: bioanalistasData } = useFetch(`${URL}api/v1/bioanalistas?page=0&size=100`, {}, []);
  const { data: insumosData } = useFetch(`${URL}api/v1/insumos/activos?page=0&size=1000`, {}, []);
  const { data: asignacionData } = useFetch(id ? `${URL}api/v1/asignaciones/${id}` : null, {}, [id]);

  useEffect(() => {
    if (bioanalistasData?.data) setBioanalistas(bioanalistasData.data.content || []);
  }, [bioanalistasData]);

  useEffect(() => {
    if (insumosData?.data) setInsumos(insumosData.data.content || []);
  }, [insumosData]);

  useEffect(() => {
    if (asignacionData?.data && id) {
      setDetalles(asignacionData.data.detalles || []);
    }
  }, [asignacionData, id]);

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: name === 'cantidad' ? Number(value) : value,
    });
  };

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
      insumoId: '',
      cantidad: 1,
      observaciones: '',
    });
  };

  const eliminarDetalle = (index) => {
    setDetalles((prevDetalles) => prevDetalles.filter((_, i) => i !== index));
  };

  const handleRemoveDetail = () => {
    setDetalles((prevDetalles) =>
      prevDetalles.filter((detalle) => !selectedRows.includes(detalle.id))
    );
    setSelectedRows([]);
  };

  const handleGuardarAsignacion = async () => {
    if (detalles.length === 0) {
      toast.error(t('formularioAsignacion.errorSinDetalles'));
      return;
    }

    try {
      const token = obtenerToken('accessToken');
      const asignacion = {
        bioanalistaId: detalleActual.bioanalistaId || null, // Manejar bioanalistaId del formulario si corresponde
        observaciones: detalleActual.observaciones || '',
        detalles: detalles.map(({ insumoId, cantidad, observaciones }) => ({
          insumoId,
          cantidad,
          observaciones,
        })),
      };

      console.log("Datos de la asignacion antes de ser enviados" + JSON.stringify(asignacion));

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

  const columns = [
    { field: 'insumoNombre', headerName: t('formularioAsignacion.columnaInsumo') },
    { field: 'cantidad', headerName: t('formularioAsignacion.columnaCantidad') },
    { field: 'observaciones', headerName: t('formularioAsignacion.columnaObservaciones') },
  ];

  return (
    <PaginaFormularioAsignacion
      bioanalistas={bioanalistas}
      insumos={insumos}
      detalles={detalles}
      detalleActual={detalleActual}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onEliminarDetalle={eliminarDetalle}
      onGuardarAsignacion={handleGuardarAsignacion}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      columns={columns}
      handleRemoveDetail={handleRemoveDetail}
    />
  );
};

export default ContenedorFormularioAsignacion;