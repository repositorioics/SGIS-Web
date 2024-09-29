import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioSitio from '@/pages/inventario/formularios/PaginaFormularioSitio'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContenedorFormularioSitio = () => {
  const [sitio, setSitio] = useState({
    nombre: '',
    abreviatura: '',
    direccion: '',
    usuarioContactoId: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del sitio si estamos en modo edición
  const { data: sitioData, error } = useFetch(
    id ? `${URL}api/v1/sitios/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (sitioData) {
      setSitio(sitioData.data); // Si estamos editando, cargamos los datos del sitio
    }
  }, [sitioData]);

  const formik = useFormik({
    initialValues: sitio,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
      abreviatura: Yup.string()
        .required('El nombre es obligatorio')
        .max(50, 'La abreviatura no puede exceder 50 caracteres'),
      direccion: Yup.string()
      .required('El nombre es obligatorio')
        .max(200, 'La dirección no puede exceder 200 caracteres'),
      usuarioContactoId: Yup.number()
        .required('El ID del usuario contacto es obligatorio'),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/sitios/${id}` : `${URL}api/v1/sitios`;
      const method = id ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        const result = await response.json();
        
        if (response.ok) {
          toast.success(id ? 'Sitio actualizado con éxito' : 'Sitio creado con éxito');
          navigate('/sitios'); // Redireccionamos a la página de sitios
        } else {
          toast.error(result.message || 'Error al guardar el sitio');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar el sitio');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioSitio
      sitio={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioSitio;