import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import PaginaCorreo from '@/pages/autenticacion/PaginaCorreo';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ContenedorCorreo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const manejarEnvioCorreo = async (valores) => {
    const { email } = valores;

    // Enviar correo para solicitud de restablecimiento de contraseña
    const { data, error } = await useFetch('http://localhost:8080/api/v1/auth/password-reset-request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (error) {
      toast.error(t('correo.error_envio'));
    } else {
      toast.success(t('correo.exito_envio'));
      // Redirigir después de enviar el correo
      navigate('/iniciosesion');
    }
  };

  return <PaginaCorreo onSubmit={manejarEnvioCorreo} />;
};

export default ContenedorCorreo;