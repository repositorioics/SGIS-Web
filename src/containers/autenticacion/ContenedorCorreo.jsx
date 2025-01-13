import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaginaCorreo from '@/pages/autenticacion/PaginaCorreo';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { URL } from '@/constants/url';

const ContenedorCorreo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const manejarEnvioCorreo = async (valores) => {
    const { email } = valores;

    try {
      // Hacer la solicitud directamente con fetch
      const response = await fetch(`${URL}api/v1/auth/password-reset-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el correo');
      }

      toast.success(t('correo.exito_envio'));

      // Redirigir después de enviar el correo
      navigate('/inicio-sesion');
    } catch (error) {
      toast.error(t('correo.error_envio'));
    }
  };

  return <PaginaCorreo onSubmit={manejarEnvioCorreo} />;
};

export default ContenedorCorreo;