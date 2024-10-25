import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioEstudio from '@/pages/inventario/formularios/PaginaFormularioEstudio'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Hook de traducción

const ContenedorFormularioEstudio = () => {
  const { t } = useTranslation(); // Hook de traducción
  const [estudio, setEstudio] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del estudio si estamos en modo edición
  const { data: estudioData, error } = useFetch(
    id ? `${URL}api/v1/estudios/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (estudioData) {
      setEstudio(estudioData.data); // Si estamos editando, cargamos los datos del estudio
    }
  }, [estudioData]);

  const formik = useFormik({
    initialValues: estudio,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioEstudio.nombreObligatorio'))
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioEstudio.nombreInvalido'))
        .max(100, t('contenedorFormularioEstudio.nombreMax')),
      descripcion: Yup.string()
        .required(t('contenedorFormularioEstudio.descripcionObligatoria'))
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioEstudio.descripcionInvalida'))
        .max(200, t('contenedorFormularioEstudio.descripcionMax')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/estudios/${id}` : `${URL}api/v1/estudios`;
      const method = id ? 'PUT' : 'POST';

      try {
        const token = obtenerToken("accessToken");
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(values),
        });
        const result = await response.json();
        
        if (response.ok) {
          toast.success(id ? t('contenedorFormularioEstudio.mensajeExitoActualizar') : t('contenedorFormularioEstudio.mensajeExitoCrear'));
          navigate('/inventario/estudios'); // Redireccionamos a la página de estudios
        } else {
          toast.error(result.message || t('contenedorFormularioEstudio.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioEstudio.mensajeErrorGuardar'));
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioEstudio
      estudio={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioEstudio;