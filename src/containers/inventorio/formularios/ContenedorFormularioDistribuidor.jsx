import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioDistribuidor from '@/pages/inventario/formularios/PaginaFormularioDistribuidor'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Hook de traducción

const ContenedorFormularioDistribuidor = () => {
  const { t } = useTranslation(); // Hook de traducción

  const [distribuidor, setDistribuidor] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del distribuidor si estamos en modo edición
  const { data: distribuidorData, error } = useFetch(
    id ? `${URL}api/v1/distribuidores/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (distribuidorData) {
      setDistribuidor(distribuidorData.data); // Si estamos editando, cargamos los datos del distribuidor
    }
  }, [distribuidorData]);

  const formik = useFormik({
    initialValues: distribuidor,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required(t('contenedorFormularioDistribuidor.nombreObligatorio')) // Traducción con "contenedor"
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioDistribuidor.nombreInvalido')) // Traducción con "contenedor"
        .max(100, t('contenedorFormularioDistribuidor.nombreMax')),
      descripcion: Yup.string()
        .required(t('contenedorFormularioDistribuidor.descripcionObligatorio')) // Traducción con "contenedor"
        .matches(/^[A-Za-z\s]+$/, t('contenedorFormularioDistribuidor.descripcionInvalido')) // Traducción con "contenedor"
        .max(500, t('contenedorFormularioDistribuidor.descripcionMax')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/distribuidores/${id}` : `${URL}api/v1/distribuidores`;
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
          toast.success(id ? t('contenedorFormularioDistribuidor.mensajeExitoActualizar') : t('contenedorFormularioDistribuidor.mensajeExitoCrear'));
          navigate('/inventario/distribuidores'); // Redireccionamos a la página de distribuidores
        } else {
          toast.error(result.message || t('contenedorFormularioDistribuidor.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioDistribuidor.mensajeErrorGuardar'));
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioDistribuidor
      distribuidor={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o editar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioDistribuidor;