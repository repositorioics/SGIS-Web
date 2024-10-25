import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import PaginaRestablecerContrasena from '@/pages/autenticacion/PaginaRestablecerContrasena';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ContenedorRestablecerContrasena = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const manejarRestablecimiento = async (valores) => {
    const { password, confirmPassword } = valores;
    const token = new URLSearchParams(location.search).get('token');
  
    if (password !== confirmPassword) {
      toast.error(t('restablecer_contrasena.error_coincidencia'));
      return;
    }

    // Enviar solicitud para restablecer contraseña
    const { data, error } = await useFetch('http://localhost:8080/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });

    if (data) {
      toast.success(t('restablecer_contrasena.exito'));
      navigate('/inicio-sesion');
    } else if (error) {
      toast.error(t('restablecer_contrasena.error'));
    }
  };

  return <PaginaRestablecerContrasena onSubmit={manejarRestablecimiento} />;
};

export default ContenedorRestablecerContrasena;