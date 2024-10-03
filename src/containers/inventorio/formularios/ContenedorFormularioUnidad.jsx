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

const ContenedorFormularioUnidad = () => {
  const [unidad, setUnidad] = useState({
    nombre: '',
    abreviatura: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la unidad si estamos en modo edición
  const { data: unidadData, error } = useFetch(
    id ? `${URL}api/v1/unidadesmedida/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (unidadData) {
      setUnidad(unidadData.data); // Si estamos editando, cargamos los datos de la unidad
    }
  }, [unidadData]);

  const formik = useFormik({
    initialValues: unidad,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
      abreviatura: Yup.string()
        .required('La abreviatura es obligatoria')
        .max(50, 'La abreviatura no puede exceder 50 caracteres'),
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
          toast.success(id ? 'Unidad actualizada con éxito' : 'Unidad creada con éxito');
          navigate('/inventario/unidades'); // Redireccionamos a la página de unidades
        } else {
          toast.error(result.message || 'Error al guardar la unidad');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar la unidad');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioUnidad
      unidad={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioUnidad;