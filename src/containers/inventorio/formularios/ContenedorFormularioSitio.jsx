import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioSitio from '@/pages/inventario/formularios/PaginaFormularioSitio'; // Importa el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioSitio = () => {
  const { t } = useTranslation();

  // Inicializa el estado para gestionar los datos del sitio con valores por defecto
  const [sitio, setSitio] = useState({
    nombre: '',
    abreviatura: '',
    direccion: '',
    usuarioContactoId: '',
  });
  
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL para verificar si es modo edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del sitio si estamos en modo edición
  const { data: sitioData, error } = useFetch(
    id ? `${URL}api/v1/sitios/${id}` : null, 
    {}, 
    [id]
  );

  // Hook personalizado para obtener los usuarios con paginación
  const maxSize = 1000; // Obtiene la mayor cantidad de usuarios posible
  const { data: usuariosData, error: usuariosError } = useFetch(
    `${URL}api/v1/usuarios?page=0&size=${maxSize}`, 
    {}, 
    []
  );

  useEffect(() => {
    // Actualiza el estado con los datos del sitio si están disponibles (modo edición)
    if (sitioData) {
      setSitio(sitioData.data);
    }
  }, [sitioData]);

  // Configuración del formulario con Formik: valores iniciales, esquema de validación y manejador de envío
  const formik = useFormik({
    initialValues: sitio,
    enableReinitialize: true, // Permite reinicializar los valores iniciales cuando se cargan nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioSitio.nombreObligatorio')) // Mensaje de validación para campo obligatorio
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioSitio.nombreInvalido')) // Mensaje de validación para formato incorrecto
        .max(100, t('contenedorFormularioSitio.nombreMax')), // Mensaje de validación para límite de caracteres
      abreviatura: Yup.string()
        .required(t('contenedorFormularioSitio.abreviaturaObligatorio')) // Mensaje de validación para campo obligatorio
        .max(50, t('contenedorFormularioSitio.abreviaturaMax')), // Mensaje de validación para límite de caracteres
      direccion: Yup.string()
        .required(t('contenedorFormularioSitio.direccionObligatorio')) // Mensaje de validación para campo obligatorio
        .max(200, t('contenedorFormularioSitio.direccionMax')), // Mensaje de validación para límite de caracteres
      usuarioContactoId: Yup.number()
        .required(t('contenedorFormularioSitio.usuarioContactoIdObligatorio')), // Mensaje de validación para campo obligatorio
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/sitios/${id}` : `${URL}api/v1/sitios`;
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
          toast.success(id ? t('contenedorFormularioSitio.mensajeExitoActualizar') : t('contenedorFormularioSitio.mensajeExitoCrear'));
          navigate('/inventario/sitios'); // Redirige a la página de sitios
        } else {
          // Muestra un mensaje de error si falla el guardado
          toast.error(result.message || t('contenedorFormularioSitio.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioSitio.mensajeErrorGuardar')); // Mensaje de error genérico
      }
    },
  });

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioSitio
      sitio={formik.values}
      error={error}
      usuarios={usuariosData ? usuariosData.data.content : []} // Pasa los usuarios al componente del formulario
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Determina si está en modo crear o editar
      formik={formik} // Pasa el objeto formik para acceso extendido
    />
  );
};

export default ContenedorFormularioSitio;