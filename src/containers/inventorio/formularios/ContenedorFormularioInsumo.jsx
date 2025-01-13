import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioInsumo from '@/pages/inventario/formularios/PaginaFormularioInsumo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioInsumo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Estado inicial solo con los campos que se deben enviar
  const [insumo, setInsumo] = useState({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    unidadMedidaId: '',
    valorUnidadMedida: '',
    activo: true,
    presentaciones: [],
    detallesMarcas: [],
    detallesDistribuidores: [],
  });

  const { data: insumoData } = useFetch(
    id ? `${URL}api/v1/insumos/${id}/detalle?page=0&size=10` : null,
    {},
    [id]
  );
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
        valorUnidadMedida: insumoData.data.valorUnidadMedida || '',
        activo: insumoData.data.activo !== undefined ? insumoData.data.activo : true,
        presentaciones: insumoData.data.presentaciones?.map((presentacion) => presentacion.id) || [],
        detallesMarcas: insumoData.data.marcas?.map((marca) => ({
          marcaId: marca.id,
          codigoMarca: marca.codigoMarca,
        })) || [],
        detallesDistribuidores: insumoData.data.distribuidores?.map((distribuidor) => ({
          distribuidorId: distribuidor.id,
          codigoDistribuidor: distribuidor.codigoDistribuidor,
        })) || []
      });
    }
  }, [insumoData]);

  const formik = useFormik({
    initialValues: insumo,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required(t('contenedorFormularioInsumo.nombreObligatorio')),
      descripcion: Yup.string().required(t('contenedorFormularioInsumo.descripcionObligatoria')),
      categoriaId: Yup.string().required(t('contenedorFormularioInsumo.categoriaObligatoria')),
      unidadMedidaId: Yup.string().required(t('contenedorFormularioInsumo.unidadMedidaObligatoria')),
      presentaciones: Yup.array().min(1, t('contenedorFormularioInsumo.presentacionesObligatorias')),
      valorUnidadMedida: Yup.number().required(t('contenedorFormularioInsumo.valorUnidadObligatorio')),
      detallesMarcas: Yup.array(),
      detallesDistribuidores: Yup.array(),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const payload = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        categoriaId: values.categoriaId,
        unidadMedidaId: values.unidadMedidaId,
        valorUnidadMedida: values.valorUnidadMedida,
        activo: values.activo,
        presentaciones: values.presentaciones,
        marcas: values.detallesMarcas.map(({ marcaId, codigoMarca }) => ({
          marcaId,
          codigoMarca
        })),
        distribuidores: values.detallesDistribuidores.map(({ distribuidorId, codigoDistribuidor }) => ({
          distribuidorId,
          codigoDistribuidor
        })),
      };

      console.log("Payload enviado:", payload);  // Verifica el payload en la consola

      const token = obtenerToken('accessToken');
      try {
        const response = await fetch(`${URL}api/v1/insumos`, {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success(t('contenedorFormularioInsumo.creacionExitosa'));
          navigate('/inventario/insumos');
        } else {
          const result = await response.json();
          toast.error(result.message || t('contenedorFormularioInsumo.errorCrear'));
        }
      } catch (error) {
        toast.error(t('contenedorFormularioInsumo.errorCrear'));
      }
    },
  });

  const handleGuardarInsumo = async () => {
    formik.setTouched({
      nombre: true,
      descripcion: true,
      categoriaId: true,
      unidadMedidaId: true,
      valorUnidadMedida: true,
      presentaciones: true,
    });

    const valid = await formik.validateForm();
    
    if (Object.keys(valid).length === 0) {
      if (formik.values.detallesMarcas.length === 0) {
        toast.error(t('contenedorFormularioInsumo.detallesMarcasObligatorios'));
      } else if (formik.values.detallesDistribuidores.length === 0) {
        toast.error(t('contenedorFormularioInsumo.detallesDistribuidoresObligatorios'));
      } else {
        formik.handleSubmit();
      }
    } else {
      toast.error(t('contenedorFormularioInsumo.errorCamposObligatorios'));
    }
  };

  const handleAddDetail = (field) => {
    if (field === "marcas" && formik.values.marcaId && formik.values.codigoMarca) {
      const nombreMarca = marcasData?.data?.content?.find((m) => m.id === formik.values.marcaId)?.nombre || "N/A";
  
      formik.setFieldValue("detallesMarcas", [
        ...formik.values.detallesMarcas,
        { 
          marcaId: formik.values.marcaId, 
          nombreMarca, // Incluye el nombre de la marca
          codigoMarca: formik.values.codigoMarca 
        }
      ]);
      formik.setFieldValue("marcaId", "");
      formik.setFieldValue("codigoMarca", "");
    } 
    
    else if (field === "distribuidores" && formik.values.distribuidorId && formik.values.codigoDistribuidor) {
      const nombreDistribuidor = distribuidoresData?.data?.content?.find((d) => d.id === formik.values.distribuidorId)?.nombre || "N/A";
  
      formik.setFieldValue("detallesDistribuidores", [
        ...formik.values.detallesDistribuidores,
        { 
          distribuidorId: formik.values.distribuidorId, 
          nombreDistribuidor, // Incluye el nombre del distribuidor
          codigoDistribuidor: formik.values.codigoDistribuidor 
        }
      ]);
      formik.setFieldValue("distribuidorId", "");
      formik.setFieldValue("codigoDistribuidor", "");
    }
  };  

  const handleRemoveDetail = (field, index) => {
    const updatedDetails = [...formik.values[field]];
    updatedDetails.splice(index, 1);
    formik.setFieldValue(field, updatedDetails);
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
      onInputChange={formik.handleChange}
      onGuardarInsumo={handleGuardarInsumo}
      isEditing={!!id}
      errors={formik.errors}
      touched={formik.touched}
      handleAddDetail={handleAddDetail}
      handleRemoveDetail={handleRemoveDetail}
    />
  );
};

export default ContenedorFormularioInsumo;