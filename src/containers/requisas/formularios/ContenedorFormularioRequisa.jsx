import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioRequisa from '@/pages/requisas/formularios/PaginaFormularioRequisa';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

/**
 * Controla la lógica del formulario de requisa, incluyendo la creación y manejo de detalles.
 */
const ContenedorFormularioRequisa = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = useSelector((state) => state.autenticacion.usuario);

  const [requisa, setRequisa] = useState({
    sitioId: '',
    creadoPor: username,
    observaciones: '',
    detalles: []
  });

  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    presentacionId: '',
    marcaId: '',
    cantidadPresentacionesSolicitada: 1,
    observacion: ''
  });

  const [detalles, setDetalles] = useState([]);
  const [codigoUnico, setCodigoUnico] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredPresentaciones, setFilteredPresentaciones] = useState([]);
  const [filteredMarcas, setFilteredMarcas] = useState([]);

  const pageSize = 1000;

  const { data: codigoRequisaData } = useFetch(`${URL}api/v1/requisas/proximo-numero-requisa`, {}, []);
  const { data: sitiosData } = useFetch(`${URL}api/v1/sitios?page=0&size=${pageSize}`, {}, []);
  const { data: insumosData } = useFetch(`${URL}api/v1/insumos?page=0&size=${pageSize}`, {}, []);
  
  useEffect(() => {
    if (codigoRequisaData?.data) setCodigoUnico(codigoRequisaData.data);
  }, [codigoRequisaData]);

  useEffect(() => {
    const insumoSeleccionado = insumosData?.data?.content?.find(insumo => insumo.id === detalleActual.insumoId);
    if (insumoSeleccionado) {
      setFilteredPresentaciones(insumoSeleccionado.presentaciones || []);
      setFilteredMarcas(insumoSeleccionado.marcas || []);
    } else {
      setFilteredPresentaciones([]);
      setFilteredMarcas([]);
    }
  }, [detalleActual.insumoId, insumosData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequisa((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarDetalle = () => {
    if (!detalleActual.insumoId || !detalleActual.presentacionId || !detalleActual.marcaId) {
      toast.error(t('formularioRequisa.errorCamposDetalle'));
      return;
    }

    setDetalles((prevDetalles) => [
      ...prevDetalles,
      {
        ...detalleActual,
        id: prevDetalles.length + 1,
        insumoNombre: insumosData?.data?.content.find(i => i.id === detalleActual.insumoId)?.nombre,
        presentacionNombre: filteredPresentaciones.find(p => p.id === detalleActual.presentacionId)?.nombre,
        marcaNombre: filteredMarcas.find(m => m.id === detalleActual.marcaId)?.nombre
      }
    ]);
    setDetalleActual({
      insumoId: '',
      presentacionId: '',
      marcaId: '',
      cantidadPresentacionesSolicitada: 1,
      observacion: ''
    });
  };

  const eliminarSeleccionados = () => {
    setDetalles(detalles.filter((detalle) => !selectedRows.includes(detalle.id)));
    setSelectedRows([]);
  };

  const manejarCrear = async () => {
    if (!requisa.sitioId || detalles.length === 0) {
      toast.error(t('formularioRequisa.errorCamposObligatorios'));
      return;
    }

    const nuevaRequisa = { ...requisa, codigoUnico, detalles: detalles.map(d => ({
      insumoId: d.insumoId,
      presentacionId: d.presentacionId,
      marcaId: d.marcaId,
      cantidadPresentacionesSolicitada: d.cantidadPresentacionesSolicitada,
      observacion: d.observacion
    }))};

     // Imprime el objeto que se va a enviar a la API
  console.log("Datos enviados a la API:", nuevaRequisa);

    const token = obtenerToken("accessToken");

    try {
      const response = await fetch(`${URL}api/v1/requisas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(nuevaRequisa),
      });

      if (response.ok) {
        toast.success(t('formularioRequisa.exitoCrear'));
        navigate('/requisas/requisas');
      } else {
        toast.error(t('formularioRequisa.errorCrear'));
      }
    } catch (error) {
      toast.error(t('formularioRequisa.errorGeneral'));
    }
  };

  if (!sitiosData || !insumosData) {
    return <p>{t('formularioRequisa.errorCargarDatos')}</p>;
  }

  const handleRemoveDetail = (index) => {
    setDetalles((prevDetalles) => prevDetalles.filter((_, i) => i !== index));
  };

  return (
    <PaginaFormularioRequisa
      requisa={requisa}
      detalleActual={detalleActual}
      detalles={detalles}
      sitios={sitiosData?.data?.content || []}
      insumos={insumosData?.data?.content || []}
      presentaciones={filteredPresentaciones}
      marcas={filteredMarcas}
      onInputChange={handleInputChange}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onEliminarSeleccionados={eliminarSeleccionados}
      onGuardarRequisa={manejarCrear}
      codigoUnico={codigoUnico}
      usuarioNombre={username}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      handleRemoveDetail={handleRemoveDetail} 
    />
  );
};

export default ContenedorFormularioRequisa;