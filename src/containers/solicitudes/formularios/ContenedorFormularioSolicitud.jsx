import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaFormularioSolicitud from '@/pages/solicitudes/formularios/PaginaFormularioSolicitud';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

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

  // Valor alto para intentar traer la mayor cantidad de datos
  const maxSize = 1000;

  // Peticiones para cargar los datos necesarios con maxSize aplicado
  const { data: usuariosData, error: usuariosError } = useFetch(`${URL}api/v1/usuarios?page=0&size=${maxSize}`, {}, []);
  const { data: donantesData, error: donantesError } = useFetch(`${URL}api/v1/donantes?page=0&size=${maxSize}`, {}, []);
  const { data: insumosData, error: insumosError } = useFetch(`${URL}api/v1/insumos?page=0&size=${maxSize}`, {}, []);
  const { data: marcasData, error: marcasError } = useFetch(`${URL}api/v1/marcas?page=0&size=${maxSize}`, {}, []);
  const { data: distribuidoresData, error: distribuidoresError } = useFetch(`${URL}api/v1/distribuidores?page=0&size=${maxSize}`, {}, []);
  const { data: presentacionesData, error: presentacionesError } = useFetch(`${URL}api/v1/presentaciones?page=0&size=${maxSize}`, {}, []);

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSolicitud({
      ...solicitud,
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
      marcaId: '',
      distribuidorId: '',
      presentacionId: '',
      cantidadPresentaciones: 0,
      analistaSolicitante: '',
      observacion: ''
    });
  };

  // Función para manejar la creación de la solicitud
  const manejarCrear = async () => {
    const nuevaSolicitud = { ...solicitud, detalles };

    try {
      const response = await fetch(`${URL}api/v1/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaSolicitud),
      });
      if (response.ok) {
        toast.success('Solicitud creada con éxito');
        navigate('/solicitudes');
      } else {
        toast.error('Error al crear la solicitud');
      }
    } catch (error) {
      toast.error('Error al crear la solicitud');
    }
  };

  // Verifica si hay errores en las peticiones
  if (usuariosError || donantesError || insumosError || marcasError || distribuidoresError || presentacionesError) {
    return <p>Error al cargar los datos</p>;
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