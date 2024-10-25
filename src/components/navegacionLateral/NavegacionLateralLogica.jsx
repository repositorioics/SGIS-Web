import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '@/context/slices/autenticacionSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from '@/hooks/useFetch';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/constants/url';
import { useTranslation } from 'react-i18next';

export const useNavegacionLateralLogica = () => {
  const [menuActivo, setMenuActivo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Translation hook

  // Fetch menus using custom hook `useFetch`
  const { data: menuItems, loading, error } = useFetch(`${URL}api/v1/menus/obtener`, {}, []);

  //console.info(menuItems);

  // Toggle menu active state
  const manejarClickMenu = (indiceMenu) => {
    setMenuActivo(menuActivo === indiceMenu ? null : indiceMenu);
  };

  // Handle logout action
  const manejarCerrarSesion = () => {
    dispatch(cerrarSesion());
    toast.success(t('navegacion.cerrar_sesion')); // Use translation for "Session closed"
    navigate('/inicio-sesion', { replace: true });
  };

  return {
    menuActivo,
    manejarClickMenu,
    manejarCerrarSesion,
    menuItems, // Return fetched menus
    loading,
    error,
  };
};