import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaAutorizacionSolicitud from '@/pages/solicitudes/formularios/PaginaAutorizacionSolicitud';
import { URL } from '@/constants/url';
import { useTranslation } from 'react-i18next';
import useFetch from '@/hooks/useFetch';
import ESTADOS from '@/constants/estados';
import { obtenerToken } from '@/utils/almacenamiento'; // Asegúrate de que esta función esté disponible

const ContenedorDetalleSolicitud = () => {
  const { id } = useParams(); // Obtener el ID de la solicitud desde la URL
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fetch para obtener la solicitud por ID
  const { data: solicitud, loading, error } = useFetch(`${URL}api/v1/solicitudes/${id}`, {}, [id]);

  // Función para autorizar la solicitud
// Función para autorizar la solicitud
const manejarAutorizar = async () => {
    try {
      const token = obtenerToken('accessToken'); // Obtener el token
      console.log('Token:', token); // Verificar el token
  
      const response = await fetch(`${URL}api/v1/solicitudes/${id}/estado?estadoId=${ESTADOS.AUTORIZADO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          Authorization: `Bearer ${token}`,
        }
      });
  
      if (response.ok) {
        toast.success(t('contenedorDetalleSolicitud.autorizacionExitosa'));
        navigate("/solicitudes/gestion-autorizaciones");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t('contenedorDetalleSolicitud.errorAutorizar'));
      }
    } catch (err) {
      console.error('Error en la solicitud de autorización:', err); // Log detallado
      toast.error(err.message);
    }
};

  // Función para rechazar la solicitud
  const manejarRechazar = async (justificacion) => {
    try {
      const token = obtenerToken('accessToken'); // Obtener el token
      console.log("Numero de estado: " + ESTADOS.NO_AUTORIZADO)
      const response = await fetch(`${URL}api/v1/solicitudes/${id}/estado?estadoId=${ESTADOS.NO_AUTORIZADO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
        },
        // body: JSON.stringify({ justificacion }),
      });
      if (response.ok) {
        toast.success(t('contenedorDetalleSolicitud.rechazoExitoso'));
        navigate("/solicitudes/gestion-autorizaciones"); // Regresar a la página anterior
      } else {
        const data = await response.json();
        throw new Error(data.message || t('contenedorDetalleSolicitud.errorRechazar'));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div>{t('contenedorDetalleSolicitud.cargando')}</div>;
  if (error) return <div>{t('contenedorDetalleSolicitud.error')}: {error.message}</div>;

  return (
    <PaginaAutorizacionSolicitud
      solicitud={solicitud.data}
      detalles={solicitud.data?.detalles}
      usuarioNombre={solicitud.data?.usuarioNombre}
      donanteNombre={solicitud.data?.donanteNombre}
      estadoNombre={solicitud.data?.estadoNombre}
      fechaCreacion={solicitud.data?.fechaCreacion}
      observaciones={solicitud.data?.observaciones}
      onAutorizar={manejarAutorizar}
      onRechazar={manejarRechazar}
      mostrarBotones={true} // Mostrar botones de autorizar y rechazar
    />
  );
};

export default ContenedorDetalleSolicitud;