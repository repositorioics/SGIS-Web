import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '@/context/slices/autenticacionSlice';
import { eliminarToken } from '@/utils/almacenamiento';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from '@/hooks/useFetch'; // Hook personalizado
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/constants/url'; // La URL de la API

export const useNavegacionLateralLogica = () => {
  const [menuActivo, setMenuActivo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Usamos el hook personalizado `useFetch` para obtener los menús desde la API
  const { data: menuItems, loading, error } = useFetch(`${URL}api/v1/menus/obtener`, {}, []);

  const manejarClickMenu = (indiceMenu) => {
    setMenuActivo(menuActivo === indiceMenu ? null : indiceMenu);
  };

  const manejarCerrarSesion = () => {
    dispatch(cerrarSesion());
    eliminarToken('accessToken');
    eliminarToken('refreshToken');
    toast.success('Sesión Cerrada');
    navigate('/login');
  };

  return {
    menuActivo,
    manejarClickMenu,
    manejarCerrarSesion,
    menuItems, // Devolvemos los menús obtenidos
    loading,
    error,
  };
};