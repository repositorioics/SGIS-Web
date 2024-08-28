import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch';
import PaginaCorreo from '@/pages/autenticacion/PaginaCorreo';

const ContenedorCorreo = () => {
  const navigate = useNavigate();
  const manejarEnvioCorreo = async (valores) => {
    const { email } = valores;
    // Lógica de envío de correo usando el hook useFetch
    const { data, error } = await useFetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    if (error) {
      // Manejar error
      console.error('Error al enviar el correo:', error);
    } else {
      // Procesar data si es necesario
      navigate('/iniciosesion');
      console.log('Correo enviado con éxito:', data);
    }
  };

  return <PaginaCorreo onSubmit={manejarEnvioCorreo} />;
};

export default ContenedorCorreo;