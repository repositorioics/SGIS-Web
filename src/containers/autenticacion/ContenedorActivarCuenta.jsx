import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginaActivarCuenta from '@/pages/autenticacion/PaginaActivarCuenta';
import { URL } from '@/constants/url';

const ContenedorActivarCuenta = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Bandera para evitar ejecuciones innecesarias si el componente se desmonta

    const activarCuenta = async () => {
      //Token que se recibe y se envia en la peticion de activación de cuenta.
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        toast.dismiss(); // Elimina mensajes previos
        toast.error('Token no encontrado en la URL');
        if (isMounted) setStatus('error');
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
          toast.dismiss();
          toast.error(errorData.message || 'Error al activar la cuenta');
          if (isMounted) setStatus('error');
          return;
        }

        const responseData = await response.json();
        if (isMounted) {
          setStatus('success');
          toast.dismiss();
          toast.success(responseData.message);

          //Token, que recibe desde la la api, para poder cambiar la contraseña.
          console.log("Que se recibe en el responseData: " + responseData)
          console.log("Que se recibe en el responseData.data: " + responseData.data)
          const token = responseData.data;
          if (!token) {
            toast.error('El token para cambiar contraseña no fue recibido.');
            return;
          }

          // Redirigir automáticamente después de 3 segundos, enviando el token.
          setTimeout(() => {
            navigate(`/cambiar-contra?token=${token}`);
          }, 3000);
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
          toast.dismiss();
          toast.error('Ocurrió un error al activar la cuenta');
        }
      }
    };

    activarCuenta();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleNavigateToLogin = () => {
    navigate('/inicio-sesion');
  };

  return <PaginaActivarCuenta status={status} onNavigateToLogin={handleNavigateToLogin} />;
};

export default ContenedorActivarCuenta;