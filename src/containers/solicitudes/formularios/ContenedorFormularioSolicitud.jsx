import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/constants/url';
import PaginaFormularioSolicitud from '@/pages/solicitudes/formularios/PaginaFormularioSolicitud';

const ContenedorFormularioSolicitud = () => {
  const { id } = useParams(); // Obtener el id de la solicitud si está en la URL
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState({
    numeroSolicitud: '',
    usuarioId: '',
    donanteId: '',
    estado: 'SOLICITADO',
    observaciones: '',
    detalles: [
      {
        insumoId: '',
        marcaId: '',
        distribuidorId: '',
        presentacionId: '',
        cantidadPresentaciones: 1,
        analistaSolicitante: '',
        observacion: '',
      },
    ],
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos si existe un ID para edición
  useEffect(() => {
    if (id) {
      setCargando(true);
      fetch(`${URL}api/v1/solicitudes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSolicitud(data.data);
          setCargando(false);
        })
        .catch((err) => {
          setError(err);
          setCargando(false);
        });
    }
  }, [id]);

  // Manejar cambios en los campos generales
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setSolicitud({ ...solicitud, [name]: value });
  };

  // Manejar cambios en los detalles
  const manejarCambioDetalle = (e, index) => {
    const { name, value } = e.target;
    const nuevosDetalles = [...solicitud.detalles];
    nuevosDetalles[index][name] = value;
    setSolicitud({ ...solicitud, detalles: nuevosDetalles });
  };

  // Agregar un nuevo detalle
  const manejarAgregarDetalle = () => {
    setSolicitud({
      ...solicitud,
      detalles: [
        ...solicitud.detalles,
        {
          insumoId: '',
          marcaId: '',
          distribuidorId: '',
          presentacionId: '',
          cantidadPresentaciones: 1,
          analistaSolicitante: '',
          observacion: '',
        },
      ],
    });
  };

  // Eliminar un detalle
  const manejarEliminarDetalle = (index) => {
    const nuevosDetalles = solicitud.detalles.filter((_, idx) => idx !== index);
    setSolicitud({ ...solicitud, detalles: nuevosDetalles });
  };

  // Manejar envío del formulario
  const manejarEnviar = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const metodo = id ? 'PUT' : 'POST'; // Definir si es creación o edición
      const url = id ? `${URL}api/v1/solicitudes/${id}` : `${URL}api/v1/solicitudes`;
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solicitud),
      });

      if (response.ok) {
        toast.success(`Solicitud ${id ? 'actualizada' : 'creada'} correctamente`);
        navigate('/solicitudes');
      } else {
        toast.error('Error al guardar la solicitud');
      }
    } catch (error) {
      toast.error('Error al guardar la solicitud');
    } finally {
      setCargando(false);
    }
  };

  return (
    <PaginaFormularioSolicitud
      solicitud={solicitud}
      cargando={cargando}
      error={error}
      manejarCambio={manejarCambio}
      manejarCambioDetalle={manejarCambioDetalle}
      manejarAgregarDetalle={manejarAgregarDetalle}
      manejarEliminarDetalle={manejarEliminarDetalle}
      manejarEnviar={manejarEnviar}
    />
  );
};

export default ContenedorFormularioSolicitud;