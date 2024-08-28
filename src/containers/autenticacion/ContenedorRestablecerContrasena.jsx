import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch';
import PaginaRestablecerContrasena from '@/pages/autenticacion/PaginaRestablecerContrasena';

const ContenedorRestablecerContrasena = () => {
  const manejarNavegacion = ()=>{
    navigate('/inicio-sesion');
  }
  const manejarRestablecimiento = async (valores) => {
    const { password, confirmPassword } = valores;
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const { data, error } = await useFetch('/api/reset-password', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (data) {
      console.log('Contraseña restablecida con éxito:', data);
      navigate('/iniciosesion');
    } else if (error) {
      console.error('Error al restablecer la contraseña:', error);
    }
  };

  return <PaginaRestablecerContrasena onSubmit={manejarRestablecimiento} />;
};

export default ContenedorRestablecerContrasena;