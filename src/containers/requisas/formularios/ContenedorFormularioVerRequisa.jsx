import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaFormularioVerRequisa from '@/pages/requisas/formularios/PaginaFormularioVerRequisa';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica del formulario de requisa para ver detalles de la requisa sin posibilidad de edición.
 */
const ContenedorFormularioVerRequisa = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtén el ID desde los parámetros de la URL

  // Estado para la requisa y detalles
  const [requisa, setRequisa] = useState({
    codigoUnico: '',
    nombreSitio: '',
    nombreEstado: '',
    observaciones: '',
    detalles: [],
  });

  // Obtener datos de la API para el ID específico
  const { data: requisaData, loading, error } = useFetch(`${URL}api/v1/requisas/${id}`, {}, [id]);

  useEffect(() => {
    if (requisaData?.data) {
      const { codigoUnico, nombreSitio, nombreEstado, observaciones, detalles } = requisaData.data;

      setRequisa({
        codigoUnico,
        nombreSitio,
        nombreEstado,
        observaciones,
        detalles, // Los nombres ya están incluidos en los detalles
      });
    }
  }, [requisaData]);

  const handleRegresar = () => {
    navigate('/requisas/requisas'); // Redirige a la lista de requisiciones
  };

  // Renderizado condicional para estados de carga y error
  if (loading) return <p>{t('formularioRequisa.cargando')}</p>;
  if (error) return <p>{t('formularioRequisa.errorCargarDatos')}</p>;

  return (
    <PaginaFormularioVerRequisa
      requisa={requisa}
      detalles={requisa.detalles}
      onRegresar={handleRegresar} // Maneja el botón de regresar
    />
  );
};

export default ContenedorFormularioVerRequisa;