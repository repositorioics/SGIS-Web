import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioSolicitud from '@/pages/solicitudes/formularios/PaginaFormularioSolicitud';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controlar la lógica del formulario de solicitud, incluyendo la creación y la gestión de detalles.
 */
const ContenedorFormularioSolicitud = () => {
  const [solicitud, setSolicitud] = useState({
    numeroSolicitud: '',
    usuarioId: '',
    donanteId: '',
    estado: '',
    observaciones: '',
    detalles: []
  });

  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    marcaId: '',
    distribuidorId: '',
    presentacionId: '',
    cantidadPresentaciones: 0,
    analistaSolicitante: '',
    observacion: ''
  });

  const [detalles, setDetalles] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook de traducción

  const maxSize = 1000;

  // Fetching data for the form
  const { data: usuariosData, error: usuariosError } = useFetch(`${URL}api/v1/usuarios?page=0&size=${maxSize}`, {}, []);
  const { data: donantesData, error: donantesError } = useFetch(`${URL}api/v1/donantes?page=0&size=${maxSize}`, {}, []);
  const { data: insumosData, error: insumosError } = useFetch(`${URL}api/v1/insumos?page=0&size=${maxSize}`, {}, []);
  const { data: marcasData, error: marcasError } = useFetch(`${URL}api/v1/marcas?page=0&size=${maxSize}`, {}, []);
  const { data: distribuidoresData, error: distribuidoresError } = useFetch(`${URL}api/v1/distribuidores?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSolicitud({
      ...solicitud,
      [name]: value
    });
  };

  // Handle detail changes
  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: value
    });
  };

  // Add detail to the list
  const agregarDetalle = () => {
    setDetalles([...detalles, detalleActual]);
    setDetalleActual({
      insumoId: '',
      marcaId: '',
      distribuidorId: '',
      presentacionId: '',
      cantidadPresentaciones: 0,
      analistaSolicitante: '',
      observacion: ''
    });
  };

  // Handle form submission
  const manejarCrear = async () => {
    const nuevaSolicitud = { ...solicitud, detalles };

    try {
      const response = await fetch(`${URL}api/v1/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaSolicitud),
      });
      if (response.ok) {
        toast.success(t('formularioSolicitud.creacionExitosa'));
        navigate('/solicitudes');
      } else {
        toast.error(t('formularioSolicitud.errorCrear'));
      }
    } catch (error) {
      toast.error(t('formularioSolicitud.errorCrear'));
    }
  };

  // Handle loading and errors
  if (usuariosError || donantesError || insumosError || marcasError || distribuidoresError || presentacionesError) {
    return <p>{t('formularioSolicitud.errorCargarDatos')}</p>;
  }

  return (
    <PaginaFormularioSolicitud
      solicitud={solicitud}
      detalleActual={detalleActual}
      detalles={detalles}
      usuarios={usuariosData?.data?.content || []}
      donantes={donantesData?.data?.content || []}
      insumos={insumosData?.data?.content || []}
      marcas={marcasData?.data?.content || []}
      distribuidores={distribuidoresData?.data?.content || []}
      presentaciones={presentacionesData?.data?.content || []}
      onInputChange={handleInputChange}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onGuardarSolicitud={manejarCrear}
    />
  );
};

export default ContenedorFormularioSolicitud;