import React from 'react';
import {useNavigate} from 'react-router-dom'
import useFetch from '@/hooks/useFetch';
import PaginaRestablecerContrasena from '@/pages/autenticacion/PaginaRestablecerContrasena';

const ContenedorRestablecerContrasena = () => {
  const navigate = useNavigate();

  const manejarRestablecimiento = async (valores) => {
    const { password, confirmPassword } = valores;
    const token = new URLSearchParams(location.search).get('token');
  
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
  
    const { data, error } = await useFetch('http://localhost:8080/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  
    if (data) {
      console.log('Contraseña restablecida con éxito:', data);
      navigate('/inicio-sesion');
    } else if (error) {
      console.error('Error al restablecer la contraseña:', error);
    }
  };  

  return <PaginaRestablecerContrasena onSubmit={manejarRestablecimiento} />;
};

export default ContenedorRestablecerContrasena;