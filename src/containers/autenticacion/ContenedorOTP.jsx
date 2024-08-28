// src/containers/auth/ContenedorOTP.js
import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import PaginaOTP from '@/pages/autenticacion/PaginaOTP';

const ContenedorOTP = () => {
  const manejarEnvioOTP = async (valores) => {
    const { otp } = valores;
    const { data, error } = await useFetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ otp }),
    });

    if (data) {
      console.log('OTP verificado con éxito:', data);
      // Aquí manejar la siguiente acción después de la verificación del OTP
    } else if (error) {
      console.error('Error en la verificación del OTP:', error);
    }
  };

  return <PaginaOTP onSubmit={manejarEnvioOTP} />;
};

export default ContenedorOTP;