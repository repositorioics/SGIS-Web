import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioPermiso from '@/pages/configuracion/formularios/PaginaFormularioPermiso';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioPermiso = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [permiso, setPermiso] = useState({
    nombre: '',
    descripcion: '',
  });

  // Obtener datos del permiso si estamos en modo edición
  const { data: permisoData, error: errorPermiso } = useFetch(id ? `${URL}api/v1/permisos/${id}` : null, {}, [id]);

  // Actualizar datos del permiso cuando esté disponible para la edición
  useEffect(() => {
    if (permisoData) {
      setPermiso({
        nombre: permisoData.data.nombre || '',
        descripcion: permisoData.data.descripcion || '',
      });
    }
  }, [permisoData]);

  // Configuración de Formik para gestionar el formulario de permisos
  const formik = useFormik({
    initialValues: permiso,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required(t('contenedorFormularioPermiso.nombreObligatorio')).max(50),
      descripcion: Yup.string().required(t('contenedorFormularioPermiso.descripcionObligatoria')).max(100),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/permisos/${id}` : `${URL}api/v1/permisos`;
      const method = id ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${obtenerToken('accessToken')}`,
          },
          body: JSON.stringify(values),
        });
        const result = await response.json();

        if (response.ok) {
          toast.success(id ? t('contenedorFormularioPermiso.exitoActualizar') : t('contenedorFormularioPermiso.exitoCrear'));
          navigate('/configuraciones/permisos');
        } else {
          toast.error(result.message || t('contenedorFormularioPermiso.errorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioPermiso.errorGuardar'));
      }
    },
  });

  return (
    <PaginaFormularioPermiso
      permiso={formik.values}
      onChange={formik.handleChange}
      onSave={formik.handleSubmit}
      error={errorPermiso}
      isEditing={!!id}
      formik={formik}
    />
  );
};

export default ContenedorFormularioPermiso;