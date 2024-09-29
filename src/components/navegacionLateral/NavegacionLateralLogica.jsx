import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '@/context/slices/autenticacionSlice';
import { eliminarToken } from '@/utils/almacenamiento';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNavegacionLateralLogica = () => {
  const [menuActivo, setMenuActivo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manejarClickMenu = (indiceMenu) => {
    setMenuActivo(menuActivo === indiceMenu ? null : indiceMenu);
  };

  const manejarCerrarSesion = () => {
    dispatch(cerrarSesion());
    eliminarToken('accessToken');
    eliminarToken('refreshToken');
    toast.success(`Sesión Cerrada`);
  };

  return {
    menuActivo,
    manejarClickMenu,
    manejarCerrarSesion,
  };
};