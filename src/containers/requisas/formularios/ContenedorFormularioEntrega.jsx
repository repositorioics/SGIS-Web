import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioEntrega from '@/pages/requisas/formularios/PaginaFormularioEntrega';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica del formulario de entrega, manejando la creación y edición.
 */
const ContenedorFormularioEntrega = () => {
  const [entrega, setEntrega] = useState({
    detalleRequisaId: '',
    cantidadPresentacionEntregada: '',
    recibidoPor: '',
    observaciones: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Utiliza traducción

  // Usa el hook personalizado para obtener los datos de la entrega
  const { data: entregaData, error } = useFetch(
    id ? `${URL}api/v1/entregas/${id}` : null,
    {},
    [id]
  );

  // Actualiza el estado de entrega cuando los datos se obtienen
  useEffect(() => {
    if (entregaData) {
      setEntrega(entregaData.data);
    }
  }, [entregaData]);

  // Configura el formulario utilizando Formik con validación de Yup
  const formik = useFormik({
    initialValues: entrega,
    enableReinitialize: true,
    validationSchema: Yup.object({
      detalleRequisaId: Yup.number().required(t('formularioEntrega.errorDetalleRequisa')),
      cantidadPresentacionEntregada: Yup.number().required(t('formularioEntrega.errorCantidadEntregada')),
      recibidoPor: Yup.number().required(t('formularioEntrega.errorRecibidoPor')),
      observaciones: Yup.string(),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/entregas/${id}` : `${URL}api/v1/entregas`;
      const method = id ? 'PUT' : 'POST';

      try {
        const token = obtenerToken("accessToken");
        const response = await fetch(url, {
          method,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(values)
        });
        const result = await response.json();

        if (response.ok) {
          toast.success(id ? t('formularioEntrega.exitoActualizar') : t('formularioEntrega.exitoCrear'));
          navigate('/entregas');
        } else {
          toast.error(result.message || t('formularioEntrega.errorGuardar'));
        }
      } catch (err) {
        toast.error(t('formularioEntrega.errorGeneral'));
      }
    },
  });

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioEntrega
      entrega={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id}
      formik={formik}
    />
  );
};

export default ContenedorFormularioEntrega;