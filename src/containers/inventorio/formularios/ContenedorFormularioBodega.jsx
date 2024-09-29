import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioBodega from '@/pages/inventario/formularios/PaginaFormularioBodega'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContenedorFormularioBodega = () => {
  const [bodega, setBodega] = useState({
    nombre: '',
    descripcion: '',
    direccion: '',
    sitioId: null,
    donanteId: null,
  });

  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();

  // Hook personalizado para obtener los datos de la bodega si estamos en modo edición
  const { data: bodegaData, error } = useFetch(
    id ? `${URL}api/v1/bodegas/${id}` : null,
    {},
    [id]
  );

  useEffect(() => {
    if (bodegaData) {
      setBodega(bodegaData.data); // Si estamos editando, cargamos los datos de la bodega
    }
  }, [bodegaData]);

  const formik = useFormik({
    initialValues: bodega,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
      descripcion: Yup.string()
      .required('El nombre es obligatorio')
      .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(200, 'La descripción no puede exceder 200 caracteres'),
      direccion: Yup.string()
        .required('La dirección es obligatoria')
        .max(200, 'La dirección no puede exceder 200 caracteres'),
      sitioId: Yup.number().nullable(),
      donanteId: Yup.number().nullable(),
    }),
    onSubmit: async (values) => {
      // Validar que solo uno de los IDs esté presente
      if (!values.sitioId && !values.donanteId) {
        toast.error('Debe seleccionar un sitio o un donante.');
        return;
      }
      if (values.sitioId && values.donanteId) {
        toast.error('No se puede seleccionar un sitio y un donante al mismo tiempo.');
        return;
      }

      const url = id ? `${URL}api/v1/bodegas/${id}` : `${URL}api/v1/bodegas`;
      const method = id ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        const result = await response.json();
        
        if (response.ok) {
          toast.success(id ? 'Bodega actualizada con éxito' : 'Bodega creada con éxito');
          navigate('/bodegas'); // Redireccionamos a la página de bodegas
        } else {
          toast.error(result.message || 'Error al guardar la bodega');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar la bodega');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioBodega
      bodega={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o editar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioBodega;
