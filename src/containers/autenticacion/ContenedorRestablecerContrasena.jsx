import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaginaRestablecerContrasena from '@/pages/autenticacion/PaginaRestablecerContrasena';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { URL } from '@/constants/url';

const ContenedorRestablecerContrasena = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const manejarRestablecimiento = async (valores) => {
    const { password, confirmPassword } = valores;
    const token = new URLSearchParams(window.location.search).get('token');

    if (password !== confirmPassword) {
      toast.error(t('restablecer_contrasena.error_coincidencia'));
      return;
    }

    try {
      // Realizar la solicitud para restablecer la contraseña
      const response = await fetch(`${URL}api/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al restablecer la contraseña');
      }

      toast.success(t('restablecer_contrasena.exito'));
      navigate('/inicio-sesion');
    } catch (error) {
      toast.error(error.message || t('restablecer_contrasena.error'));
    }
  };

  return <PaginaRestablecerContrasena onSubmit={manejarRestablecimiento} />;
};

export default ContenedorRestablecerContrasena;