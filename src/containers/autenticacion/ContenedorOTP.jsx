import React from 'react';
import useFetch from '@/hooks/useFetch';
import PaginaOTP from '@/pages/autenticacion/PaginaOTP';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ContenedorOTP = () => {
  const { t } = useTranslation();

  const manejarEnvioOTP = async (valores) => {
    const { otp } = valores;

    // Enviar el código OTP para verificación
    const { data, error } = await useFetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ otp }),
    });

    if (data) {
      toast.success(t('otp.exito'));
    } else if (error) {
      toast.error(t('otp.error'));
    }
  };

  return <PaginaOTP onSubmit={manejarEnvioOTP} />;
};

export default ContenedorOTP;