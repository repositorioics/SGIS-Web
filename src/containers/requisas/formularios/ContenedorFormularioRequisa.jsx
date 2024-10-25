import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioRequisa from '@/pages/requisas/formularios/PaginaFormularioRequisa';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica del formulario de requisa, incluyendo la creación y manejo de detalles.
 */
const ContenedorFormularioRequisa = () => {
  const [requisa, setRequisa] = useState({
    sitioId: '',
    creadoPor: '',
    observaciones: '',
    detallesRequisa: []
  });

  const [detalleActual, setDetalleActual] = useState({
    insumoId: '',
    presentacionId: '',
    cantidadPresentacionesSolicitada: 0,
    observacion: ''
  });

  const [detalles, setDetalles] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar traducción

  // Definir el tamaño máximo para las peticiones de datos
  const maxSize = 1000;

  // Cargar los datos necesarios para sitios, insumos y presentaciones
  const { data: sitiosData, error: sitiosError } = useFetch(`${URL}api/v1/sitios?page=0&size=${maxSize}`, {}, []);
  const { data: insumosData, error: insumosError } = useFetch(`${URL}api/v1/insumos?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Manejar cambios en los inputs del formulario de requisa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequisa({
      ...requisa,
      [name]: value
    });
  };

  // Manejar cambios en los detalles de la requisa
  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: value
    });
  };

  // Agregar un detalle a la lista de detalles
  const agregarDetalle = () => {
    setDetalles([...detalles, detalleActual]);
    setDetalleActual({
      insumoId: '',
      presentacionId: '',
      cantidadPresentacionesSolicitada: 0,
      observacion: ''
    });
  };

  // Manejar la creación de una nueva requisa
  const manejarCrear = async () => {
    const nuevaRequisa = { ...requisa, detallesRequisa: detalles };

    try {
      const token = obtenerToken("accessToken");
      const response = await fetch(`${URL}api/v1/requisas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(nuevaRequisa),
      });
      if (response.ok) {
        toast.success(t('formularioRequisa.exitoCrear'));
        navigate('/requisas');
      } else {
        toast.error(t('formularioRequisa.errorCrear'));
      }
    } catch (error) {
      toast.error(t('formularioRequisa.errorGeneral'));
    }
  };

  // Verificar errores en la carga de datos
  if (sitiosError || insumosError || presentacionesError) {
    return <p>{t('formularioRequisa.errorCargarDatos')}</p>;
  }

  return (
    <PaginaFormularioRequisa
      requisa={requisa}
      detalleActual={detalleActual}
      detalles={detalles}
      sitios={sitiosData?.data?.content || []}
      insumos={insumosData?.data?.content || []}
      presentaciones={presentacionesData?.data?.content || []}
      onInputChange={handleInputChange}
      onDetalleChange={handleDetalleChange}
      onAgregarDetalle={agregarDetalle}
      onGuardarRequisa={manejarCrear}
    />
  );
};

export default ContenedorFormularioRequisa;