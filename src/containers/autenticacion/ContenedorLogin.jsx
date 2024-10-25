import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PaginaLogin from '@/pages/autenticacion/PaginaLogin';
import { iniciarSesion } from '@/context/slices/autenticacionSlice';
import { URL } from '@/constants/url';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ContenedorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const manejarInicioSesion = async (valores) => {
    const { usuario, password } = valores;

    try {
      // Realizar la solicitud de inicio de sesión
      const response = await fetch(`${URL}api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usuario, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Despachar la acción de inicio de sesión
        dispatch(iniciarSesion({
          usuario: usuario,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        }));

        // Redirigir al usuario a la página principal
        navigate('/', { replace: true });
        toast.success(t('login.exito'));
      } else {
        toast.error(t('login.error'));
      }
    } catch (error) {
      toast.error(t('login.error'));
    }
  };

  return <PaginaLogin onSubmit={manejarInicioSesion} />;
};

export default ContenedorLogin;