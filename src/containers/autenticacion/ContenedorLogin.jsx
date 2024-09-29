// src/containers/auth/ContenedorLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import PaginaLogin from '@/pages/autenticacion/PaginaLogin';
import { iniciarSesion } from '@/context/slices/autenticacionSlice';
import { guardarToken } from '@/utils/almacenamiento';
import jwtDecode from 'jwt-decode';

const ContenedorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Para enviar acciones al store

  const manejarInicioSesion = async (valores) => {
    const { username, password } = valores;
    const { data, error } = await useFetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (data) {
      guardarToken('accessToken', data.data.accessToken);
      guardarToken('refreshToken', data.data.refreshToken);

      const usuario = jwtDecode(data.data.accessToken); // Decodificar el token

      // Enviar acción de inicio de sesión con roles y permisos
      dispatch(iniciarSesion({
        email: username,
        roles: usuario.roles,
        permisos: usuario.permissions
      }));

      navigate('/');
    } else if (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return <PaginaLogin onSubmit={manejarInicioSesion} />;
};

export default ContenedorLogin;