import { createSlice } from '@reduxjs/toolkit';
import { guardarToken, eliminarToken, obtenerToken } from '@/utils/almacenamiento';

const initialState = {
  usuario: null,
  accessToken: obtenerToken('accessToken') || null,
  refreshToken: obtenerToken('refreshToken') || null,
  isAuthenticated: false,
};

const autenticacionSlice = createSlice({
  name: 'autenticacion',
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      const { usuario, accessToken, refreshToken } = action.payload;
      state.usuario = usuario;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;

      // Guardar tokens en localStorage
      guardarToken('accessToken', accessToken);
      guardarToken('refreshToken', refreshToken);
    },
    cerrarSesion: (state) => {
      state.usuario = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Eliminar tokens de localStorage
      eliminarToken('accessToken');
      eliminarToken('refreshToken');
    },
  },
});

// Exportar las acciones y el reducer
export const { iniciarSesion, cerrarSesion } = autenticacionSlice.actions;
export default autenticacionSlice.reducer;