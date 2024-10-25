import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Hook personalizado de fetch
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioPresentacion from '@/pages/inventario/formularios/PaginaFormularioPresentacion'; // Componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Hook de traducción

const ContenedorFormularioPresentacion = () => {
  const { t } = useTranslation(); // Inicializa el hook de traducción

  // Inicializa el estado para gestionar los datos de la presentación con valores por defecto
  const [presentacion, setPresentacion] = useState({
    nombre: '',
    descripcion: '',
    unidadesPresentacion: 0,
  });
  
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL para verificar si es modo edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la presentación si estamos en modo edición
  const { data: presentacionData, error } = useFetch(
    id ? `${URL}api/v1/presentaciones/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    // Actualiza el estado con los datos de la presentación si están disponibles (modo edición)
    if (presentacionData) {
      setPresentacion(presentacionData.data);
    }
  }, [presentacionData]);

  // Configuración del formulario con Formik: valores iniciales, esquema de validación y manejador de envío
  const formik = useFormik({
    initialValues: presentacion,
    enableReinitialize: true, // Permite reinicializar los valores iniciales cuando se cargan nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioPresentacion.nombreObligatorio')) // Etiqueta traducida para campo obligatorio de nombre
        .max(100, t('contenedorFormularioPresentacion.nombreMax')), // Etiqueta traducida para límite de caracteres
      descripcion: Yup.string()
        .required(t('contenedorFormularioPresentacion.descripcionObligatorio')) // Etiqueta traducida para campo obligatorio de descripción
        .max(200, t('contenedorFormularioPresentacion.descripcionMax')), // Etiqueta traducida para límite de caracteres
      unidadesPresentacion: Yup.number()
        .required(t('contenedorFormularioPresentacion.unidadesPresentacionObligatorio')) // Etiqueta traducida para campo obligatorio de unidades
        .min(1, t('contenedorFormularioPresentacion.unidadesPresentacionMin')), // Etiqueta traducida para unidades mínimas
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/presentaciones/${id}` : `${URL}api/v1/presentaciones`;
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
          // Muestra mensaje de éxito según sea creación o actualización
          toast.success(id ? t('contenedorFormularioPresentacion.mensajeExitoActualizar') : t('contenedorFormularioPresentacion.mensajeExitoCrear'));
          navigate('/inventario/presentaciones'); // Redirige a la página de presentaciones
        } else {
          // Muestra un mensaje de error si falla el guardado
          toast.error(result.message || t('contenedorFormularioPresentacion.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioPresentacion.mensajeErrorGuardar')); // Mensaje de error genérico
      }
    },
  });

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioPresentacion
      presentacion={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Determina si está en modo crear o editar
      formik={formik} // Pasa el objeto formik para acceso extendido
    />
  );
};

export default ContenedorFormularioPresentacion;