
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

const ContenedorFormularioPresentacion = () => {
  const [presentacion, setPresentacion] = useState({
    nombre: '',
    descripcion: '',
    unidadesPresentacion: 0,
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la presentación si estamos en modo edición
  const { data: presentacionData, error } = useFetch(
    id ? `${URL}api/v1/presentaciones/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (presentacionData) {
      setPresentacion(presentacionData.data); // Si estamos editando, cargamos los datos de la presentación
    }
  }, [presentacionData]);

  const formik = useFormik({
    initialValues: presentacion,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es obligatorio')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
      descripcion: Yup.string()
        .required('La descripción es obligatoria')
        .max(200, 'La descripción no puede exceder 200 caracteres'),
      unidadesPresentacion: Yup.number()
        .required('Las unidades por presentación son obligatorias')
        .min(1, 'Debe tener al menos 1 unidad'),
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
          toast.success(id ? 'Presentación actualizada con éxito' : 'Presentación creada con éxito');
          navigate('/inventario/presentaciones'); // Redireccionamos a la página de presentaciones
        } else {
          toast.error(result.message || 'Error al guardar la presentación');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar la presentación');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioPresentacion
      presentacion={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioPresentacion;