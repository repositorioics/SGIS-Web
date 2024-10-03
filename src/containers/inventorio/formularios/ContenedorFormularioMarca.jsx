import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioMarca from '@/pages/inventario/formularios/PaginaFormularioMarca'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';

const ContenedorFormularioMarca = () => {
  const [marca, setMarca] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos de la marca si estamos en modo edición
  const { data: marcaData, error } = useFetch(
    id ? `${URL}api/v1/marcas/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (marcaData) {
      setMarca(marcaData.data); // Si estamos editando, cargamos los datos de la marca
    }
  }, [marcaData]);

  const formik = useFormik({
    initialValues: marca,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
      descripcion: Yup.string()
        .required('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .max(500, 'La descripción no puede exceder 500 caracteres'),
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
          toast.success(id ? 'Marca actualizada con éxito' : 'Marca creada con éxito');
          navigate('/inventario/marcas'); // Redireccionamos a la página de marcas
        } else {
          toast.error(result.message || 'Error al guardar la marca');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar la marca');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioMarca
      marca={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o editar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioMarca;