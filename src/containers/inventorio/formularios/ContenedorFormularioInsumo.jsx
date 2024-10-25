import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Hook personalizado de fetch
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioInsumo from '@/pages/inventario/formularios/PaginaFormularioInsumo'; // Componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción

const ContenedorFormularioInsumo = () => {
  const { t } = useTranslation(); // Inicializa el hook de traducción

  // Inicializa el estado para gestionar los datos del insumo con valores por defecto
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
  
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL para verificar si es modo edición
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
    // Actualiza el estado con los datos del insumo si están disponibles (modo edición)
    if (insumoData) {
      setInsumo({
        nombre: insumoData.data.nombre || '',
        descripcion: insumoData.data.descripcion || '',
        categoriaId: insumoData.data.categoria?.id || '',
        unidadMedidaId: insumoData.data.unidadMedida?.id || '',
        marcasId: insumoData.data.marcas?.map((marca) => marca.id) || [], // Obtiene IDs de las marcas relacionadas
        distribuidoresId: insumoData.data.distribuidores?.map((distribuidor) => distribuidor.id) || [], // Obtiene IDs de distribuidores
        presentacionesId: insumoData.data.presentaciones?.map((presentacion) => presentacion.id) || [], // Obtiene IDs de presentaciones
        activo: insumoData.data.activo !== undefined ? insumoData.data.activo : true, // Asegura que el campo activo esté establecido
      });
    }
  }, [insumoData]);

  // Configuración del formulario con Formik: valores iniciales, esquema de validación y manejador de envío
  const formik = useFormik({
    initialValues: insumo,
    enableReinitialize: true, // Permite reinicializar los valores iniciales cuando se cargan nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string().required(t('contenedorFormularioInsumo.nombreObligatorio')),
      descripcion: Yup.string().required(t('contenedorFormularioInsumo.descripcionObligatoria')),
      categoriaId: Yup.string().required(t('contenedorFormularioInsumo.categoriaObligatoria')),
      unidadMedidaId: Yup.string().required(t('contenedorFormularioInsumo.unidadMedidaObligatoria')),
      marcasId: Yup.array().min(1, t('contenedorFormularioInsumo.marcasObligatorias')),
      distribuidoresId: Yup.array().min(1, t('contenedorFormularioInsumo.distribuidoresObligatorios')),
      presentacionesId: Yup.array().min(1, t('contenedorFormularioInsumo.presentacionesObligatorias')),
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
          toast.success(id ? t('contenedorFormularioInsumo.mensajeExitoActualizar') : t('contenedorFormularioInsumo.mensajeExitoCrear'));
          navigate('/inventario/insumos'); // Redirige a la página de insumos
        } else {
          toast.error(result.message || t('contenedorFormularioInsumo.mensajeErrorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioInsumo.mensajeErrorGuardar')); // Mensaje de error genérico
      }
    },
  });

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    formik.handleChange(e);
  };

  if (!categoriasData || !unidadesMedidaData || !marcasData || !distribuidoresData || !presentacionesData) {
    return <p>{t('contenedorFormularioInsumo.cargandoDatos')}</p>;
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
      isEditing={!!id} // Determina si está en modo crear o editar
      formik={formik} // Pasa el objeto formik para acceso extendido
    />
  );
};

export default ContenedorFormularioInsumo;