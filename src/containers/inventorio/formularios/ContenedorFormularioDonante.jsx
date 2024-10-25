import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioDonante from '@/pages/inventario/formularios/PaginaFormularioDonante'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Hook de traducción

const ContenedorFormularioDonante = () => {
  const { t } = useTranslation(); // Hook de traducción

  const [donante, setDonante] = useState({
    nombre: '',
    direccion: '',
    abreviatura: '',
    contactoId: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del donante si estamos en modo edición
  const { data: donanteData, error } = useFetch(
    id ? `${URL}api/v1/donantes/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (donanteData) {
      setDonante(donanteData.data); // Si estamos editando, cargamos los datos del donante
    }
  }, [donanteData]);

  const formik = useFormik({
    initialValues: donante,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioDonante.nombreObligatorio'))
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioDonante.nombreInvalido'))
        .max(100, t('contenedorFormularioDonante.nombreMax')),
      direccion: Yup.string()
        .required(t('contenedorFormularioDonante.direccionObligatoria'))
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioDonante.direccionInvalida'))
        .max(200, t('contenedorFormularioDonante.direccionMax')),
      abreviatura: Yup.string()
        .max(50, t('contenedorFormularioDonante.abreviaturaMax')),
      contactoId: Yup.number()
        .required(t('contenedorFormularioDonante.contactoIdObligatorio')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/donantes/${id}` : `${URL}api/v1/donantes`;
      const method = id ? 'PUT' : 'POST';

      try {
        const token = obtenerToken("accessToken");
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
          body: JSON.stringify(values)
        });
        const result = await response.json();
        
        if (response.ok) {
          toast.success(id ? t('contenedorFormularioDonante.mensajeExitoActualizar') : t('contenedorFormularioDonante.mensajeExitoCrear'));
          navigate('/inventario/donantes'); // Redireccionamos a la página de donantes
        } else {
          toast.error(result.message || t('contenedorFormularioDonante.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioDonante.mensajeErrorGuardar'));
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioDonante
      donante={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioDonante;