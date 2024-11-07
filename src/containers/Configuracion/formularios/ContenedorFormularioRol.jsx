import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioRol from '@/pages/configuracion/formularios/PaginaFormularioRol';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioRol = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [rol, setRol] = useState({
    nombre: '',
    descripcion: '',
    permisoIds: [],
  });

  // Carga los datos del rol para la edición y los permisos disponibles para el select
  const { data: rolData } = useFetch(id ? `${URL}api/v1/roles/${id}` : null, {}, [id]);
  const { data: permisosData } = useFetch(`${URL}api/v1/permisos?page=0&size=1000`, {}, []);

  // Cargar datos del rol si estamos en modo edición
  useEffect(() => {
    if (rolData) {
      setRol({
        nombre: rolData.data.nombre || '',
        descripcion: rolData.data.descripcion || '',
        permisoIds: rolData.data.permisos?.map((permiso) => permiso.id) || [],
      });
    }
  }, [rolData]);

  const formik = useFormik({
    initialValues: rol,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required(t('contenedorFormularioRol.nombreObligatorio')).max(50),
      descripcion: Yup.string().required(t('contenedorFormularioRol.descripcionObligatoria')).max(100),
      permisoIds: Yup.array().min(1, t('contenedorFormularioRol.permisosObligatorios')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/roles/${id}` : `${URL}api/v1/roles`;
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
          toast.success(id ? t('contenedorFormularioRol.exitoActualizar') : t('contenedorFormularioRol.exitoCrear'));
          navigate('/configuraciones/roles');
        } else {
          toast.error(result.message || t('contenedorFormularioRol.errorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioRol.errorGuardar'));
      }
    },
  });

  return (
    <PaginaFormularioRol
      rol={formik.values}
      onChange={formik.handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id}
      formik={formik}
      permisos={permisosData?.data?.content || []}
    />
  );
};

export default ContenedorFormularioRol;