import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioEntrega from '@/pages/requisas/formularios/PaginaFormularioEntrega';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContenedorFormularioEntrega = () => {
  const [entrega, setEntrega] = useState({
    detalleRequisaId: '',
    cantidadPresentacionEntregada: '',
    recibidoPor: '',
    observaciones: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: entregaData, error } = useFetch(
    id ? `${URL}api/v1/entregas/${id}` : null,
    {},
    [id]
  );

  useEffect(() => {
    if (entregaData) {
      setEntrega(entregaData.data);
    }
  }, [entregaData]);

  const formik = useFormik({
    initialValues: entrega,
    enableReinitialize: true,
    validationSchema: Yup.object({
      detalleRequisaId: Yup.number().required('El ID del detalle de la requisa es obligatorio'),
      cantidadPresentacionEntregada: Yup.number().required('La cantidad entregada es obligatoria'),
      recibidoPor: Yup.number().required('El ID de quien recibió es obligatorio'),
      observaciones: Yup.string(),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/entregas/${id}` : `${URL}api/v1/entregas`;
      const method = id ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        const result = await response.json();

        if (response.ok) {
          toast.success(id ? 'Entrega actualizada con éxito' : 'Entrega creada con éxito');
          navigate('/entregas');
        } else {
          toast.error(result.message || 'Error al guardar la entrega');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar la entrega');
      }
    },
  });

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