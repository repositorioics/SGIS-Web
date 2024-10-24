import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioInsumo from '@/pages/inventario/formularios/PaginaFormularioInsumo'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';

const ContenedorFormularioInsumo = () => {
  const [insumo, setInsumo] = useState({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    unidadMedidaId: '',
    marcasId: [],
    distribuidoresId: [],
    presentacionesId: [],
    activo: true,
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del insumo si estamos en modo edición
  const { data: insumoData, error } = useFetch(
    id ? `${URL}api/v1/insumos/${id}/detalle?page=0&size=10` : null, 
    {}, 
    [id]
  );

  // Cargar los datos necesarios para los selectores
  const { data: categoriasData } = useFetch(`${URL}api/v1/categorias?page=0&size=1000`, {}, []);
  const { data: unidadesMedidaData } = useFetch(`${URL}api/v1/unidadesmedida?page=0&size=1000`, {}, []);
  const { data: marcasData } = useFetch(`${URL}api/v1/marcas?page=0&size=1000`, {}, []);
  const { data: distribuidoresData } = useFetch(`${URL}api/v1/distribuidores?page=0&size=1000`, {}, []);
  const { data: presentacionesData } = useFetch(`${URL}api/v1/presentaciones?page=0&size=1000`, {}, []);

  useEffect(() => {
    if (insumoData) {
      setInsumo({
        nombre: insumoData.data.nombre || '',
        descripcion: insumoData.data.descripcion || '',
        categoriaId: insumoData.data.categoria?.id || '',
        unidadMedidaId: insumoData.data.unidadMedida?.id || '',
        marcasId: insumoData.data.marcas?.map((marca) => marca.id) || [], // Obtener IDs de las marcas relacionadas
        distribuidoresId: insumoData.data.distribuidores?.map((distribuidor) => distribuidor.id) || [], // Obtener IDs de distribuidores
        presentacionesId: insumoData.data.presentaciones?.map((presentacion) => presentacion.id) || [], // Obtener IDs de presentaciones
        activo: insumoData.data.activo !== undefined ? insumoData.data.activo : true, // Asegura que el campo activo esté establecido
      });
    }
  }, [insumoData]);

  const formik = useFormik({
    initialValues: insumo,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      descripcion: Yup.string().required('La descripción es obligatoria'),
      categoriaId: Yup.string().required('La categoría es obligatoria'),
      unidadMedidaId: Yup.string().required('La unidad de medida es obligatoria'),
      marcasId: Yup.array().min(1, 'Debe seleccionar al menos una marca'),
      distribuidoresId: Yup.array().min(1, 'Debe seleccionar al menos un distribuidor'),
      presentacionesId: Yup.array().min(1, 'Debe seleccionar al menos una presentación'),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/insumos/${id}` : `${URL}api/v1/insumos`;
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
          toast.success(id ? 'Insumo actualizado con éxito' : 'Insumo creado con éxito');
          navigate('/inventario/insumos'); // Redireccionamos a la página de insumos
        } else {
          toast.error(result.message || 'Error al guardar el insumo');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar el insumo');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  if (!categoriasData || !unidadesMedidaData || !marcasData || !distribuidoresData || !presentacionesData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <PaginaFormularioInsumo
      insumo={formik.values}
      categorias={categoriasData?.data?.content || []}
      unidadesMedida={unidadesMedidaData?.data?.content || []}
      marcas={marcasData?.data?.content || []}
      distribuidores={distribuidoresData?.data?.content || []}
      presentaciones={presentacionesData?.data?.content || []}
      onInputChange={handleChange}
      onGuardarInsumo={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o actualizar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioInsumo;