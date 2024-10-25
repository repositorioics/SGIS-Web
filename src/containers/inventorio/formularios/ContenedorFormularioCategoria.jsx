import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioCategoria from '@/pages/inventario/formularios/PaginaFormularioCategoria'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Hook de traducción

const ContenedorFormularioCategoria = () => {
  const { t } = useTranslation(); // Hook de traducción
  const [categoria, setCategoria] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la categoría si estamos en modo edición
  const { data: categoriaData, error } = useFetch(
    id ? `${URL}api/v1/categorias/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (categoriaData) {
      setCategoria(categoriaData.data); // Si estamos editando, cargamos los datos de la categoría
    }
  }, [categoriaData]);

  const formik = useFormik({
    initialValues: categoria,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('formularioCategoriaContenedor.nombreObligatorio')) // Usamos la traducción
        .matches(/^[A-Za-z\s]+$/, t('formularioCategoriaContenedor.nombreInvalido')) // Traducción para la validación de formato
        .max(100, t('formularioCategoriaContenedor.nombreMax')),
      descripcion: Yup.string()
        .required(t('formularioCategoriaContenedor.descripcionObligatorio'))
        .matches(/^[A-Za-z\s]+$/, t('formularioCategoriaContenedor.descripcionInvalido'))
        .max(500, t('formularioCategoriaContenedor.descripcionMax')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/categorias/${id}` : `${URL}api/v1/categorias`;
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
          toast.success(id ? t('formularioCategoriaContenedor.mensajeExitoActualizar') : t('formularioCategoriaContenedor.mensajeExitoCrear'));
          navigate('/inventario/categorias'); // Redireccionamos a la página de categorías
        } else {
          toast.error(result.message || t('formularioCategoriaContenedor.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('formularioCategoriaContenedor.mensajeErrorGuardar'));
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioCategoria
      categoria={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o editar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioCategoria;