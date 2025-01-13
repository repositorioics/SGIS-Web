import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaActivarCuenta from '@/pages/autenticacion/PaginaActivarCuenta';
import { URL } from '@/constants/url';

const ContenedorActivarCuenta = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const activarCuenta = async () => {
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        toast.error('Token no encontrado en la URL');
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`${URL}api/v1/auth/activar-cuenta`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al activar la cuenta');
          setStatus('error');
          return;
        }

        setStatus('success');
        toast.success('Cuenta activada exitosamente');

        // Redirigir automáticamente después de 3 segundos
        setTimeout(() => {
          navigate('/inicio-sesion');
        }, 3000);
      } catch (error) {
        setStatus('error');
        toast.error('Ocurrió un error al activar la cuenta');
      }
    };

    activarCuenta();
  }, [navigate]);

  const handleNavigateToLogin = () => {
    navigate('/inicio-sesion');
  };

  return <PaginaActivarCuenta status={status} onNavigateToLogin={handleNavigateToLogin} />;
};

export default ContenedorActivarCuenta;