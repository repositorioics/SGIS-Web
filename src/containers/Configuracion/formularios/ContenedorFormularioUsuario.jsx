import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch';
import { URL } from '@/constants/url';
import PaginaFormularioUsuario from '@/pages/configuracion/formularios/PaginaFormularioUsuario';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';
import { useTranslation } from 'react-i18next';

const ContenedorFormularioUsuario = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    correo: '',
    clave: 'PassWord!1',
    confirmarClave: 'PassWord!1',
    rolIds: [],
  });

  // Obtener datos del usuario si estamos en modo edición
  const { data: usuarioData } = useFetch(id ? `${URL}api/v1/usuarios/${id}` : null, {}, [id]);
  const { data: rolesData } = useFetch(`${URL}api/v1/roles?page=0&size=1000`, {}, []);

  useEffect(() => {
    if (usuarioData) {
      setUsuario({
        nombre: usuarioData.data.nombre || '',
        apellido: usuarioData.data.apellido || '',
        usuario: usuarioData.data.usuario || '',
        correo: usuarioData.data.correo || '',
        rolIds: usuarioData.data.roles?.map((rol) => rol.id) || [],
      });
    }
  }, [usuarioData]);

  const formik = useFormik({
    initialValues: usuario,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required(t('contenedorFormularioUsuario.nombreObligatorio')).max(50),
      apellido: Yup.string().required(t('contenedorFormularioUsuario.apellidoObligatorio')).max(50),
      usuario: Yup.string().required(t('contenedorFormularioUsuario.usuarioObligatorio')).max(20),
      correo: Yup.string()
        .email(t('contenedorFormularioUsuario.correoInvalido'))
        .required(t('contenedorFormularioUsuario.correoObligatorio')),
      clave: Yup.string()
        .required(t('contenedorFormularioUsuario.claveObligatoria'))
        .min(6, t('contenedorFormularioUsuario.claveMin'))
        .matches(/[A-Z]/, t('contenedorFormularioUsuario.claveMayuscula'))
        .matches(/[a-z]/, t('contenedorFormularioUsuario.claveMinuscula'))
        .matches(/[0-9]/, t('contenedorFormularioUsuario.claveNumero'))
        .matches(/[!@#$%^&*(),.?":{}|<>]/, t('contenedorFormularioUsuario.claveEspecial'))
        .when('isEditing', { is: false, then: Yup.string().required(t('contenedorFormularioUsuario.claveObligatoria')) }),
      confirmarClave: Yup.string()
        .oneOf([Yup.ref('clave'), null], t('contenedorFormularioUsuario.confirmacionClave'))
        .required(t('contenedorFormularioUsuario.confirmacionClaveObligatoria')),
      rolIds: Yup.array().min(1, t('contenedorFormularioUsuario.rolesObligatorios')),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/usuarios/${id}` : `${URL}api/v1/usuarios`;
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
          toast.success(id ? t('contenedorFormularioUsuario.exitoActualizar') : t('contenedorFormularioUsuario.exitoCrear'));
          navigate('/configuraciones/usuarios');
        } else {
          toast.error(result.message || t('contenedorFormularioUsuario.errorGuardar'));
        }
      } catch (err) {
        toast.error(t('contenedorFormularioUsuario.errorGuardar'));
      }
    },
  });

  return (
    <PaginaFormularioUsuario
      usuario={formik.values}
      onChange={formik.handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id}
      formik={formik}
      roles={rolesData?.data?.content || []}
    />
  );
};

export default ContenedorFormularioUsuario;