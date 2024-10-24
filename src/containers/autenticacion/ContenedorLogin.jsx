import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PaginaLogin from '@/pages/autenticacion/PaginaLogin';
import { iniciarSesion } from '@/context/slices/autenticacionSlice';
import { URL } from '@/constants/url'; // Constante de la URL
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContenedorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const manejarInicioSesion = async (valores) => {
    const { usuario, password } = valores;  // Cambié "username" por "usuario" para que coincida con el formulario.

    console.log(`Valores: username=${usuario}, password=${password}`);

    try {
      // Realizamos la petición directamente usando fetch
      const response = await fetch(`${URL}api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usuario, password }),  // El backend espera "username"
      });

      const data = await response.json();

      if (response.ok) {
        // Enviar la acción de inicio de sesión a Redux
        dispatch(iniciarSesion({
          usuario: usuario,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        }));

        // Redirigir al usuario a la página principal o al dashboard
        navigate('/', { replace: true });
        toast.success('Exito al Iniciar Sesión');
      } else {
        console.error('Error al Inicio de Sesión:', data.message);
        toast.success('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      console.error('Error al Inicio de Sesión:', data.message);
    }
  };

  return <PaginaLogin onSubmit={manejarInicioSesion} />;
};

export default ContenedorLogin;