// src/containers/auth/ContenedorLogin.js
import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useFetch } from '@/hooks/useFetch';
import PaginaLogin from '@/pages/auth/PaginaLogin';
import { iniciarSesion } from '@/context/slices/autenticacionSlice';

const ContenedorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const manejarInicioSesion = async (valores) => {
    const { email, password } = valores;
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data) {
      dispatch(iniciarSesion({ email, token: data.token }));
      navigate('/');
      // Aquí manejar el almacenamiento de tokens en localStorage si es necesario
    } else if (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return <PaginaLogin onSubmit={manejarInicioSesion} />;
};

export default ContenedorLogin;