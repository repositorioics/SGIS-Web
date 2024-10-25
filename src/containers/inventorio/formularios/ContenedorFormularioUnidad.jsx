import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Hook personalizado de fetch
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioUnidad from '@/pages/inventario/formularios/PaginaFormularioUnidad'; // Componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioUnidad = () => {
  const { t } = useTranslation();

  // Inicializa el estado para gestionar los datos de la unidad con valores por defecto
  const [unidad, setUnidad] = useState({
    nombre: '',
    abreviatura: '',
  });
  
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL para verificar si es modo edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la unidad si estamos en modo edición
  const { data: unidadData, error } = useFetch(
    id ? `${URL}api/v1/unidadesmedida/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    // Actualiza el estado con los datos de la unidad si están disponibles (modo edición)
    if (unidadData) {
      setUnidad(unidadData.data);
    }
  }, [unidadData]);

  // Configuración del formulario con Formik: valores iniciales, esquema de validación y manejador de envío
  const formik = useFormik({
    initialValues: unidad,
    enableReinitialize: true, // Permite reinicializar los valores iniciales cuando se cargan nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioUnidad.nombreObligatorio')) // Mensaje de validación para campo obligatorio
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioUnidad.nombreInvalido')) // Mensaje de validación para formato incorrecto
        .max(100, t('contenedorFormularioUnidad.nombreMax')), // Mensaje de validación para límite de caracteres
      abreviatura: Yup.string()
        .required(t('contenedorFormularioUnidad.abreviaturaObligatorio')) // Mensaje de validación para campo obligatorio
        .max(50, t('contenedorFormularioUnidad.abreviaturaMax')), // Mensaje de validación para límite de caracteres
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/unidadesmedida/${id}` : `${URL}api/v1/unidadesmedida`;
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
          // Muestra un mensaje de éxito según sea creación o actualización
          toast.success(id ? t('contenedorFormularioUnidad.mensajeExitoActualizar') : t('contenedorFormularioUnidad.mensajeExitoCrear'));
          navigate('/inventario/unidades'); // Redirige a la página de unidades
        } else {
          // Muestra un mensaje de error si falla el guardado
          toast.error(result.message || t('contenedorFormularioUnidad.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioUnidad.mensajeErrorGuardar')); // Mensaje de error genérico
      }
    },
  });

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioUnidad
      unidad={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Determina si está en modo crear o editar
      formik={formik} // Pasa el objeto formik para acceso extendido
    />
  );
};

export default ContenedorFormularioUnidad;