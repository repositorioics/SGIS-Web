import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioMarca from '@/pages/inventario/formularios/PaginaFormularioMarca'; // Componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioMarca = () => {
  const { t } = useTranslation();

  // Inicializa el estado para gestionar los datos de la marca con valores por defecto
  const [marca, setMarca] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL para verificar si es modo edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la marca si estamos en modo edición
  const { data: marcaData, error } = useFetch(
    id ? `${URL}api/v1/marcas/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    // Actualiza el estado con los datos de la marca si están disponibles (modo edición)
    if (marcaData) {
      setMarca(marcaData.data);
    }
  }, [marcaData]);

  // Configuración del formulario con Formik: valores iniciales, esquema de validación y manejador de envío
  const formik = useFormik({
    initialValues: marca,
    enableReinitialize: true, // Permite reinicializar los valores iniciales cuando se cargan nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioMarca.nombreObligatorio')) // Etiqueta traducida para campo obligatorio de nombre
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioMarca.nombreInvalido')) // Etiqueta traducida para formato inválido de nombre
        .max(100, t('contenedorFormularioMarca.nombreMax')), // Etiqueta traducida para límite de caracteres
      descripcion: Yup.string()
        .required(t('contenedorFormularioMarca.descripcionObligatorio')) // Etiqueta traducida para campo obligatorio de descripción
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioMarca.descripcionInvalido')) // Etiqueta traducida para formato inválido de descripción
        .max(500, t('contenedorFormularioMarca.descripcionMax')), // Etiqueta traducida para límite de caracteres
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/marcas/${id}` : `${URL}api/v1/marcas`;
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
          toast.success(id ? t('contenedorFormularioMarca.mensajeExitoActualizar') : t('contenedorFormularioMarca.mensajeExitoCrear'));
          navigate('/inventario/marcas'); // Redirige a la página de marcas
        } else {
          // Muestra un mensaje de error si falla el guardado
          toast.error(result.message || t('contenedorFormularioMarca.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioMarca.mensajeErrorGuardar')); // Mensaje de error genérico
      }
    },
  });

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioMarca
      marca={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Determina si está en modo crear o editar
      formik={formik} // Pasa el objeto formik para acceso extendido
    />
  );
};

export default ContenedorFormularioMarca;