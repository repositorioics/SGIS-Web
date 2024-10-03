import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '@/hooks/useFetch'; // Importa tu hook de fetch personalizado
import { URL } from '@/constants/url'; // Constante de la URL
import PaginaFormularioUsuario from '@/pages/configuracion/formularios/PaginaFormularioUsuario'; // Importamos el componente del formulario
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { obtenerToken } from '@/utils/almacenamiento';

const ContenedorFormularioUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    correo: '',
    clave: '',
    confirmarClave: '', // Campo para confirmar la contraseña
    rolIds: []
  });
  
  const { id } = useParams(); // Obtenemos el ID de los parámetros de la URL para saber si es edición
  const navigate = useNavigate();
  
  // Hook personalizado para obtener los datos del usuario si estamos en modo edición
  const { data: usuarioData, error } = useFetch(
    id ? `${URL}api/v1/usuarios/${id}` : null, 
    {}, 
    [id]
  );

  useEffect(() => {
    if (usuarioData) {
      setUsuario(usuarioData.data); // Si estamos editando, cargamos los datos del usuario
    }
  }, [usuarioData]);

  const formik = useFormik({
    initialValues: usuario,
    enableReinitialize: true, // Permite reinicializar valores iniciales al recibir nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras y espacios')
        .required('El nombre es obligatorio'),
      apellido: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'El apellido solo puede contener letras y espacios')
        .required('El apellido es obligatorio'),
      usuario: Yup.string()
        .matches(/^[A-Za-z0-9_.-]+$/, 'El usuario solo puede contener letras, números y algunos caracteres especiales')
        .min(3, 'El usuario debe tener al menos 3 caracteres')
        .max(20, 'El usuario no puede tener más de 20 caracteres')
        .required('El usuario es obligatorio'),
      correo: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),
      clave: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
        .when('isEditing', {
          is: false,
          then: Yup.string().required('La contraseña es obligatoria'),
        }),
      confirmarClave: Yup.string()
        .oneOf([Yup.ref('clave'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de la contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      const url = id ? `${URL}api/v1/usuarios/${id}` : `${URL}api/v1/usuarios`;
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
          toast.success(id ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
          navigate('/usuarios'); // Redireccionamos a la página de usuarios
        } else {
          toast.error(result.message || 'Error al guardar el usuario');
        }
      } catch (err) {
        toast.error('Ocurrió un error al guardar el usuario');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <PaginaFormularioUsuario
      usuario={formik.values}
      error={error}
      onChange={handleChange}
      onSave={formik.handleSubmit}
      isEditing={!!id} // Usamos esto para diferenciar entre crear o editar
      formik={formik} // Pasar el objeto formik completo para acceso a propiedades
    />
  );
};

export default ContenedorFormularioUsuario;