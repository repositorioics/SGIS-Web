import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioRequisa from '@/pages/requisas/formularios/PaginaFormularioRequisa';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { obtenerToken } from '@/utils/almacenamiento';

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

  // Valor alto para intentar traer la mayor cantidad de datos
  const maxSize = 1000;

  // Peticiones para cargar los datos necesarios
  const { data: sitiosData, error: sitiosError } = useFetch(`${URL}api/v1/sitios?page=0&size=${maxSize}`, {}, []);
  const { data: insumosData, error: insumosError } = useFetch(`${URL}api/v1/insumos?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequisa({
      ...requisa,
      [name]: value
    });
  };

  // Función para manejar los cambios en los detalles
  const handleDetalleChange = (e) => {
    const { name, value } = e.target;
    setDetalleActual({
      ...detalleActual,
      [name]: value
    });
  };

  // Función para agregar un detalle a la lista
  const agregarDetalle = () => {
    setDetalles([...detalles, detalleActual]);
    setDetalleActual({
      insumoId: '',
      presentacionId: '',
      cantidadPresentacionesSolicitada: 0,
      observacion: ''
    });
  };

  // Función para manejar la creación de la requisa
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
        toast.success('Requisa creada con éxito');
        navigate('/requisas');
      } else {
        toast.error('Error al crear la requisa');
      }
    } catch (error) {
      toast.error('Error al crear la requisa');
    }
  };

  // Verifica si hay errores en las peticiones
  if (sitiosError || insumosError || presentacionesError) {
    return <p>Error al cargar los datos</p>;
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