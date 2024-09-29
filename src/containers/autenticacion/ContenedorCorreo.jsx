import React from 'react';
import {useNavigate} from 'react-router-dom'
import useFetch from '@/hooks/useFetch';
import PaginaCorreo from '@/pages/autenticacion/PaginaCorreo';

const ContenedorCorreo = () => {
  const navigate = useNavigate();
  const manejarEnvioCorreo = async (valores) => {
  const { email } = valores;
  // Actualiza la URL para enviar el correo
  const { data, error } = await useFetch('http://localhost:8080/api/v1/auth/password-reset-request', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  if (error) {
    console.error('Error al enviar el correo:', error);
  } else {
    // Redirige después de enviar el correo
    navigate('/iniciosesion');
    console.log('Correo enviado con éxito:', data);
  }
};


  return <PaginaCorreo onSubmit={manejarEnvioCorreo} />;
};

export default ContenedorCorreo;